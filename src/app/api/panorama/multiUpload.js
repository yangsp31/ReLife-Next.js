import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from 'fs/promises';

// AWS S3와 연결될 client 생성
const s3Client = new S3Client({
    region : process.env.AWS_S3_REGION,
    credentials : {
        accessKeyId : process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey : process.env.AWS_S3_SECRET_ACCESS_KEY,
    }
})

// 모든 이미지 업로드
export async function uploadMultiImage(cookie, files) {
    const fileUrl = []

    try {
        for (const file of files) {
            const buffer = Buffer.from(await file.arrayBuffer())
            const params = {
                Bucket : process.env.AWS_S3_BUCKET_NAME,
                Key : `${cookie}/panorama/piece/${file.name}`,
                Body : buffer,
                ContentType : `${file.type}`
            }
    
            const command = new PutObjectCommand(params);
            await s3Client.send(command);
    
            fileUrl.push(`${process.env.NEXT_PUBLIC_AWS_S3_OBJECT_URL}${cookie}/panorama/piece/${file.name}`)
        }
    
        return fileUrl
    } 
    catch (error) {
        console.log(error)
        throw error
    }
}