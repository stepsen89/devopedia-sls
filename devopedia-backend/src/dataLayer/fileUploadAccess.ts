import * as AWS from 'aws-sdk'
const AWSXRay = require('aws-xray-sdk')

const XAWS = AWSXRay.captureAWS(AWS)

import { createLogger } from '../utils/logger'

const logger = createLogger('FileUploadAccess')

export class FileUploadAccess {
  constructor(
    private readonly s3Client = new XAWS.S3({ signatureVersion: 'v4' }),
    private readonly bucket = process.env.FILES_BUCKET_NAME,
    private readonly expirationTime = Number(process.env.SIGNED_URL_EXPIRATION)
  ) { }

  async getUploadUrl(fileId: string): Promise<any> {
    logger.info('DataLayer: Get Upload Url')

    const result = this.s3Client.getSignedUrl('putObject', {
      Bucket: this.bucket,
      Key: fileId,
      Expires: this.expirationTime
    })

    logger.info('DataLayer: Get Upload Url result', { result })

    return result
  }
}
