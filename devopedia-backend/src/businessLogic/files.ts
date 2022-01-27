import { FileUploadAccess } from '../dataLayer/fileUploadAccess'
import { EntryAccess } from '../dataLayer/entriesAccess'

import { createLogger } from '../utils/logger'

const logger = createLogger('filesBusinessLogic')

const fileUploadAccess = new FileUploadAccess()
const entriesAccess = new EntryAccess()

export async function getUploadUrl(
  entryId: string,
  userId: string
): Promise<string> {
  logger.info('Business Logic: Get Upload Url for file')

  const uploadUrl = await fileUploadAccess.getUploadUrl(entryId)

  await entriesAccess.updateEntryFileUrl(entryId, userId)

  logger.info('Business Logic: Get Upload Url url for file result', {
    uploadUrl
  })

  return uploadUrl
}
