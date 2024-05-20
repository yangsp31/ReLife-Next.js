import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

// AWS S3와 연결될 client 생성
const s3Client = new S3Client({
    region : process.env.AWS_S3_REGION,
    credentials : {
        accessKeyId : process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey : process.env.AWS_S3_SECRET_ACCESS_KEY,
    }
})

// 단일 이미지 업로드
export async function getResult(url) {
    try {

        console.log(url)
        const params = {
            Bucket : process.env.AWS_S3_BUCKET_NAME,
            Key : url,
        }

        const command = new GetObjectCommand(params);
        const data = await s3Client.send(command);

        return data
    }
    catch (error) {
        console.log(error)
        throw error
    }
}