import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { getUploadUrl } from '../../businessLogic/files'
import { getUserId } from '../../utils/utils'

import { createLogger } from '../../utils/logger'

const logger = createLogger('getUploadUrl')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info('GetUploadUrl Lambda: Processing event :', { event })

    const entryId = event.pathParameters.entryId
    const userId = getUserId(event)

    const fileUrl = await getUploadUrl(entryId, userId)

    try {
      logger.info('GetUpload Lambda: File Url Success :', {
        fileUrl
      })

      return {
        statusCode: 201,
        body: JSON.stringify({
          uploadUrl: fileUrl
        })
      }
    } catch (error) {
      logger.info('GetUploadUrl Lambda: File Url Error :', {
        error
      })
    }
  }
)

handler.use(httpErrorHandler()).use(
  cors({
    credentials: true
  })
)
