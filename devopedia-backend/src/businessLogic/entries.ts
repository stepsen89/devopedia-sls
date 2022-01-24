import * as uuid from "uuid";

import { EntryAccess } from "../dataLayer/entriesAccess";

import { EntryItem } from "../models/EntryItem";
import { EntryUpdate } from "../models/EntryUpdate";

import { CreateEntryRequest } from "../requests/CreateEntryRequest";
import { UpdateEntryRequest } from "../requests/UpdateEntryRequest";

import { createLogger } from "../utils/logger";

const logger = createLogger("entriesBusinessLogic");

const entryAccess = new EntryAccess();

export async function getAllEntriesByUserId(
  userId: string
): Promise<EntryItem[]> {
  logger.info("Business Logic: Get All Entries By User Id");
  return entryAccess.getAllEntriesByUserId(userId);
}

export async function createEntry(
  createEntryRequest: CreateEntryRequest,
  userId: string
): Promise<EntryItem> {
  logger.info("Business Logic: Create new Entry");

  const id = uuid.v4();

  return await entryAccess.createEntry({
    entryId: id,
    userId,
    done: createEntryRequest.done,
    title: createEntryRequest.title,
    repeatingTimes: createEntryRequest.repeatingTimes,
    repeated: 0,
    description: createEntryRequest.description,
    link: createEntryRequest.link,
    createdAt: new Date().toISOString(),
  });
}

export async function updateEntry(
  updateEntryRequest: UpdateEntryRequest,
  entryId: string,
  userId: string
): Promise<EntryUpdate> {
  logger.info("Business Logic: Update Entry");

  return await entryAccess.updateEntry(
    {
      entryId: entryId,
      title: updateEntryRequest.title,
      repeated: updateEntryRequest.repeated,
      done: updateEntryRequest.done,
      description: updateEntryRequest.description,
      repeatingTimes: updateEntryRequest.repeatingTimes,
      updatedAt: new Date().toISOString(),
      link: updateEntryRequest.link,
    },
    userId
  );
}

export async function deleteEntry(entryId: string, userId: string) {
  logger.info("Business Logic: Delete Entry");
  return await entryAccess.deleteEntry(entryId, userId);
}
