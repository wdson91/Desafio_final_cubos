

import * as aws from 'aws-sdk';

async function s3Connect(): Promise<any> {
    const endpoint = await new aws.Endpoint(process.env.S3_ENDPOINT);

    const s3 = await new aws.S3({
        endpoint,
        credentials: {
            accessKeyId: process.env.B2_APPLICATION_KEY_ID,
            secretAccessKey: process.env.B2_APPLICATION_KEY,
        }

    })
    return s3
}

export = s3Connect