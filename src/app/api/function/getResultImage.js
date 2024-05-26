import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

// AWS S3와 연결될 client 생성
const s3Client = new S3Client({
    region : process.env.AWS_S3_REGION,
    credentials : {
        accessKeyId : process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey : process.env.AWS_S3_SECRET_ACCESS_KEY,
    }
})

export async function getResult(url) {
    try {
        const response = await fetch(url)
        const data = await response.arrayBuffer()

        return data
    }
    catch (error) {
        console.log(error)
        throw error
    }
}