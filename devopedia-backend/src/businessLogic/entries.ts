import * as uuid from "uuid";

import { EntryAccess } from "../dataLayer/entriesAccess";

import { EntryItem } from "../models/EntryItem";
// import { EntryUpdate } from "../models/TodoUpdate";

import { CreateEntryRequest } from "../requests/CreateEntryRequest";
// import { UpdateTodoRequest } from "../requests/UpdateTodoRequest";

import { createLogger } from "../utils/logger";

const logger = createLogger("todosBusinessLogic");

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
    title: createEntryRequest.title,
    repeatingTimes: createEntryRequest.repeatingTimes,
    description: createEntryRequest.description,
    createdAt: new Date().toISOString(),
  });
}

// export async function updateTodo(
//   updateTodoRequest: UpdateTodoRequest,
//   todoId: string,
//   userId: string
// ): Promise<TodoUpdate> {
//   logger.info("Business Logic: Update Todo");

//   return await todosAccess.updateTodo(
//     {
//       todoId: todoId,
//       name: updateTodoRequest.name,
//       done: updateTodoRequest.done,
//       dueDate: updateTodoRequest.dueDate,
//     },
//     userId
//   );
// }

// export async function deleteTodo(todoId: string, userId: string) {
//   logger.info("Business Logic: Delete Todo");
//   return await todosAccess.deleteTodo(todoId, userId);
// }
