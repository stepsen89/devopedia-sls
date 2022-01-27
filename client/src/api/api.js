import { apiEndpoint } from "../config";
import axios from "axios";

export async function getEntries(idToken) {
  const response = await axios.get(`${apiEndpoint}/entries`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${idToken}`,
    },
  });
  return response.data.items;
}

export async function createEntry(idToken, newEntry): Promise<EntryItem> {
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
  idToken,
  entryId,
  updatedEntry
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

export async function deleteEntry(idToken: string, entryId: string) {
  await axios.delete(`${apiEndpoint}/entries/${entryId}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${idToken}`,
    },
  });
}

export async function getUploadUrl(
  idToken: string,
  entryId: string
) {
  const response = await axios.post(`${apiEndpoint}/entries/${entryId}/file`, '', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data.uploadUrl
}

export async function uploadFile(uploadUrl: string, file: Buffer) {
  await axios.put(uploadUrl, file)
}
