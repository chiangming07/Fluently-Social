import dotenv from "dotenv";
dotenv.config();

import { v4 as uuidv4 } from "uuid";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
  region: process.env.AWS_BUCKET_REGION,
});

export async function generateUploadURL() {
  const imageName = uuidv4();

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: imageName,
  };

  const command = new PutObjectCommand(params);
  const URL = await getSignedUrl(s3, command, { expiresIn: 60 });

  return { URL, imageName };
}
