import { Injectable, Post } from '@nestjs/common';
import * as B2 from 'backblaze-b2';
import * as fs from 'fs';
import { S3Client, PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';
import { json } from 'stream/consumers';
import s3Connect from './s3.service';
const axios = require('axios');



@Injectable()
export class UploadService {

    async uploadImage(file: Express.Multer.File): Promise<any> {
        const s3Client = new S3Client({
            region: "us-east-1",
            endpoint: process.env.S3_ENDPOINT,
            credentials: {
                accessKeyId: process.env.B2_APPLICATION_KEY_ID,
                secretAccessKey: process.env.B2_APPLICATION_KEY,
            }

        })
        const bucketName = process.env.B2_BUCKET_NAME;


        const { originalname, path } = file;






        // Lê o arquivo local
        const data = await fs.readFileSync(file.path);

        // Define o nome do arquivo no B2
        const fileName = originalname;

        // Realiza o upload para o B2

        const time = new Date().getTime().toString();
        const filename = `${randomUUID()}-${file.originalname}`;

        const uploadParams = ({
            Bucket: process.env.B2_BUCKET_NAME,
            Key: `${filename}`,
            Body: data,
            ContentType: file.mimetype,

        })
        const uploadCommand = new PutObjectCommand(uploadParams);
        try {
            const response = await s3Client.send(uploadCommand);
            console.log('Upload realizado com sucesso:', response);
        } catch (error) {
            console.error('Erro ao fazer o upload:', error);
        } finally {
            // Remove o arquivo local após o upload
            await fs.rmSync(path);
        }
    }

    async listarArquivos() {
        const s3Client = new S3Client({
            endpoint: process.env.S3_ENDPOINT,
            credentials: {
                accessKeyId: process.env.B2_APPLICATION_KEY_ID,
                secretAccessKey: process.env.B2_APPLICATION_KEY,
            }

        })

        const listParams = {
            Bucket: process.env.B2_BUCKET_NAME,
        };
        const listCommand = new ListObjectsV2Command(listParams);
        try {
            const response = await s3Client.send(listCommand);
            console.log('Objetos no bucket:', response.Contents);
        } catch (error) {
            console.error('Erro ao listar objetos:', error);
        }

        return
    }
    async deleteArquivo(url: string) {
        const s3Client = new S3Client({
            endpoint: process.env.S3_ENDPOINT,
            credentials: {
                accessKeyId: process.env.B2_APPLICATION_KEY_ID,
                secretAccessKey: process.env.B2_APPLICATION_KEY,
            }

        })


        const string2 = url.split('/')
        const string3 = string2[string2.length - 1]

        const deleteParams = ({
            Bucket: process.env.B2_BUCKET_NAME,
            Key: `${string3}`,
        })
        const deleteCommand = new DeleteObjectCommand(deleteParams);
        try {
            const response = await s3Client.send(deleteCommand);
            console.log('Objeto removido com sucesso:', response);
        } catch (error) {
            console.error('Erro ao remover objeto:', error);
        }
    }
}
