import "source-map-support/register";

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as middy from "middy";
import { cors, httpErrorHandler } from "middy/middlewares";

import { getUserId } from "../../utils/utils";
import { deleteEntry } from "../../businessLogic/entries";

import { createLogger } from "../../utils/logger";

const logger = createLogger("deleteEntry");

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info("Delete Entry Lambda: Processing event:", { event });

    const entryId = event.pathParameters.entryId;
    const userId = getUserId(event);

    try {
      await deleteEntry(entryId, userId);
      logger.info("Delete entry lambda success");

      return {
        statusCode: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: "",
      };
    } catch (e) {
      logger.error("Delete entry lambda failure", { error: e });

      return {
        statusCode: 500,
        body: `error ${e}`,
      };
    }
  }
);

handler.use(httpErrorHandler()).use(
  cors({
    credentials: true,
  })
);
