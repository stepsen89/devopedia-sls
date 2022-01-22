// import * as uuid from "uuid";

import { EntryAccess } from "../dataLayer/entriesAccess";

import { EntryItem } from "../models/EntryItem";
// import { EntryUpdate } from "../models/TodoUpdate";

// import { CreateTodoRequest } from "../requests/CreateTodoRequest";
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

// export async function createTodo(
//   createTodoRequest: CreateTodoRequest,
//   userId: string
// ): Promise<TodoItem> {
//   logger.info("Business Logic: Create Todo");

//   const id = uuid.v4();

//   return await todosAccess.createTodo({
//     todoId: id,
//     userId,
//     name: createTodoRequest.name,
//     description: createTodoRequest.description,
//     dueDate: createTodoRequest.dueDate,
//     done: false, //default value for new todos
//     createdAt: new Date().toISOString(),
//   });
// }

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
