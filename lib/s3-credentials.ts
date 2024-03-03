import { S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
    region: process.env.N_AWS_REGION ?? "",
    credentials: {
        accessKeyId: process.env.N_AWS_ACCESS_KEY ?? "",
        secretAccessKey: process.env.N_AWS_SECRET_KEY ?? ""
    } 
});