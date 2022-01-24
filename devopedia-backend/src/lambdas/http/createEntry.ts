import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
import * as middy from "middy";
import { cors } from "middy/middlewares";
import { CreateEntryRequest } from "../../requests/CreateEntryRequest";
import { createEntry } from "../../businessLogic/entries";
import { getUserId } from "../../utils/utils";

import { createLogger } from "../../utils/logger";
const logger = createLogger("getEntries");

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info("CreateEntry: Processing event:", { event });

    const newEntry: CreateEntryRequest = JSON.parse(event.body);
    const userId = getUserId(event);

    const newItem = await createEntry(newEntry, userId);

    return {
      statusCode: 201,
      body: JSON.stringify({
        item: newItem,
      }),
    };
  }
);

handler.use(
  cors({
    credentials: true,
  })
);
