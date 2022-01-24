import "source-map-support/register";

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as middy from "middy";
import { cors, httpErrorHandler } from "middy/middlewares";

import { UpdateEntryRequest } from "../../requests/UpdateEntryRequest";
import { updateEntry } from "../../businessLogic/entries";
import { getUserId } from "../../utils/utils";

import { createLogger } from "../../utils/logger";

const logger = createLogger("getEntries");

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info("UpdateEntry: Processing event:", { event });

    const entryId = event.pathParameters.entryId;
    const updatedEntry: UpdateEntryRequest = JSON.parse(event.body);
    const userId = getUserId(event);

    try {
      const updatedItem = await updateEntry(updatedEntry, entryId, userId);
      logger.info("Update todo lambda success", { updatedEntry });

      return {
        statusCode: 200,
        body: JSON.stringify({
          items: updatedItem,
        }),
      };
    } catch (e) {
      logger.error("Update entry lambda failure", { error: e });

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
