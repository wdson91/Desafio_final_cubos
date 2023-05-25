

import { S3 } from '@aws-sdk/client-s3';


async function s3Connect(): Promise<any> {


    const s3 = new S3({
        endpoint: process.env.S3_ENDPOINT,
        credentials: {
            accessKeyId: process.env.B2_APPLICATION_KEY_ID,
            secretAccessKey: process.env.B2_APPLICATION_KEY,
        }

    })
    return s3
}

export = s3Connect