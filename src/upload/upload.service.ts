import { Injectable, Post } from '@nestjs/common';
import * as B2 from 'backblaze-b2';
import * as fs from 'fs';
import * as aws from 'aws-sdk';
import { randomUUID } from 'crypto';
import { json } from 'stream/consumers';
const axios = require('axios');



@Injectable()
export class UploadService {

    async uploadImage(file: Express.Multer.File): Promise<string> {
        const endpoint = new aws.Endpoint(process.env.S3_ENDPOINT);

        const s3 = new aws.S3({
            endpoint,
            credentials: {
                accessKeyId: process.env.B2_APPLICATION_KEY_ID,
                secretAccessKey: process.env.B2_APPLICATION_KEY,
            }

        })
        const bucketName = process.env.B2_BUCKET_NAME;


        const { originalname, path } = file;



        try {


            const arquivos = await s3.listObjects({
                Bucket: bucketName,
            }).promise();

            // Lê o arquivo local
            const data = await fs.readFileSync(file.path);

            // Define o nome do arquivo no B2
            const fileName = originalname;

            // Realiza o upload para o B2

            const time = new Date().getTime().toString();
            const filename = `${randomUUID()}-${file.originalname}`;
            const arquivo = await s3.upload({

                Bucket: process.env.B2_BUCKET_NAME,
                Key: `${filename}`,
                Body: data,
                ContentType: file.mimetype,

            }).promise()

            console.log(arquivo);
            return arquivo.Location

        } catch (error) {
            console.log(error);
            throw new Error('Erro ao fazer o upload da imagem');
        } finally {
            // Remove o arquivo local após o upload
            await fs.rmSync(path);
        }
    }

    async listarArquivos() {
        const endpoint = new aws.Endpoint(process.env.S3_ENDPOINT);

        const s3 = new aws.S3({
            endpoint,
            credentials: {
                accessKeyId: process.env.B2_APPLICATION_KEY_ID,
                secretAccessKey: process.env.B2_APPLICATION_KEY,
            }

        })
        const bucketName = process.env.B2_BUCKET_NAME;
        const arquivos = await s3.listObjectsV2({
            Bucket: bucketName,
        }).promise();

        return arquivos.Contents;
    }
    async deleteArquivo(url: string) {
        const endpoint = new aws.Endpoint(process.env.S3_ENDPOINT);

        const s3 = new aws.S3({
            endpoint,
            credentials: {
                accessKeyId: process.env.B2_APPLICATION_KEY_ID,
                secretAccessKey: process.env.B2_APPLICATION_KEY,
            }

        })


        const string2 = url.split('/')
        const string3 = string2[string2.length - 1]
        try {
            await s3.deleteObject({
                Bucket: process.env.B2_BUCKET_NAME,
                Key: `${string3}`,
            }).promise();
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}
