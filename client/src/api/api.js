import { apiEndpoint } from "../config";
import axios from "axios";

export async function getEntries(idToken) {
  console.log(apiEndpoint);
  console.log(idToken);
  const response = await axios.get(`${apiEndpoint}/entries`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${idToken}`,
    },
  });
  console.log(response);
  return response.data.items;
}

export async function createEntry(
  idToken: string,
  newEntry: CreateEntryRequest
): Promise<EntryItem> {
  const response = await axios.post(
    `${apiEndpoint}/entries`,
    JSON.stringify(newEntry),
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${idToken}`,
      },
    }
  );
  return response.data.item;
}

export async function updateEntry(
  idToken: string,
  entryId: string,
  updatedEntry: UpdateTodoRequest
): Promise<void> {
  await axios.patch(
    `${apiEndpoint}/entries/${entryId}`,
    JSON.stringify(updatedEntry),
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${idToken}`,
      },
    }
  );
}
