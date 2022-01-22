import "source-map-support/register";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as middy from "middy";
import { cors } from "middy/middlewares";
import { getUserId } from "../../utils/utils";
import { getAllEntriesByUserId } from "../../businessLogic/entries";

import { createLogger } from "../../utils/logger";

const logger = createLogger("getTodos");

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info("Get Entries: Processing event:", { event });

    const userId = getUserId(event);

    if (!userId) {
      return {
        statusCode: 403,
        body: JSON.stringify("Not Authorized"),
      };
    }
    let items;

    try {
      items = await getAllEntriesByUserId(userId);
      logger.info("Get Entries: Fetching todos successfully returned:", {
        items,
      });

      return {
        statusCode: 200,
        body: JSON.stringify({
          items: items,
        }),
      };
    } catch (error) {
      logger.error("Get Entries: Failure:", { error });
    }
  }
);

handler.use(
  cors({
    credentials: true,
  })
);
