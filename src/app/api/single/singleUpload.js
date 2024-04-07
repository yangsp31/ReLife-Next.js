import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// AWS S3와 연결될 client 생성
const s3Client = new S3Client({
    region : process.env.AWS_S3_REGION,
    credentials : {
        accessKeyId : process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey : process.env.AWS_S3_SECRET_ACCESS_KEY,
    }
})

// 단일 이미지 업로드
export async function uploadSingleImage(cookie, file) {
    try {
        const fileBuffer = Buffer.from(await file.arrayBuffer());

        const params = {
            Bucket : process.env.AWS_S3_BUCKET_NAME,
            Key : `${cookie}/short/${file.name}`,
            Body : fileBuffer,
            ContentType : `${file.type}`
        }

        const command = new PutObjectCommand(params);
        await s3Client.send(command);

        return `${process.env.NEXT_PUBLIC_AWS_S3_OBJECT_URL}${cookie}/short/${file.name}`
    }
    catch (error) {
        console.log(error)
        throw error
    }
}