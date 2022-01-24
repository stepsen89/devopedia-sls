import { CustomAuthorizerEvent } from "aws-lambda";
import "source-map-support/register";
import Axios from "axios";
import { decode, verify } from "jsonwebtoken";

import { createLogger } from "../../utils/logger";

const logger = createLogger("auth");

const jwksUrl = "https://dev-b8waqqsd.us.auth0.com/.well-known/jwks.json";

export const handler = async (event: CustomAuthorizerEvent) => {
  logger.info("Authorizing a user", event.authorizationToken);
  try {
    const jwtToken = await verifyToken(event.authorizationToken);
    logger.info("User was authorized");

    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Action: "execute-api:Invoke",
            Effect: "Allow",
            Resource: "*",
          },
        ],
      },
    };
  } catch (e) {
    logger.error("User not authorized", { error: e.message });

    return {
      principalId: "user",
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Action: "execute-api:Invoke",
            Effect: "Deny",
            Resource: "*",
          },
        ],
      },
    };
  }
};

async function verifyToken(authHeader) {
  const token = getToken(authHeader);
  const jwt = decode(token, { complete: true });

  let key = await getSigningKey(jwksUrl, jwt.header.kid);

  return verify(token, key.publicKey, { algorithms: ["RS256"] });
}

function getToken(authHeader: string): string {
  if (!authHeader) throw new Error("No authentication header");

  if (!authHeader.toLowerCase().startsWith("bearer "))
    throw new Error("Invalid authentication header");

  const split = authHeader.split(" ");
  const token = split[1];

  return token;
}

const getSigningKey = async (jwkurl, kid) => {
  let res = await Axios.get(jwkurl, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  });
  let keys = res.data.keys;

  const signingKeys = keys
    .filter(
      (key) =>
        key.use === "sig" && // JWK property `use` determines the JWK is for signing
        key.kty === "RSA" && // We are only supporting RSA
        key.kid && // The `kid` must be present to be useful for later
        key.x5c &&
        key.x5c.length // Has useful public keys (we aren't using n or e)
    )
    .map((key) => {
      return { kid: key.kid, nbf: key.nbf, publicKey: certToPEM(key.x5c[0]) };
    });
  const signingKey = signingKeys.find((key) => key.kid === kid);
  if (!signingKey) {
    logger.error("No signing keys found");
    throw new Error("Invalid signing keys");
  }
  logger.info("Signing keys created successfully ", signingKey);
  return signingKey;
};

function certToPEM(cert) {
  cert = cert.match(/.{1,64}/g).join("\n");
  cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;
  return cert;
}
