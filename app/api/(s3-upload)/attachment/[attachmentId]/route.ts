import { db } from "@/lib/db";
import { s3Client } from "@/lib/s3-credentials";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { auth } from "@clerk/nextjs";

async function deleteS3File(key:string|undefined) {
    console.log(key);
	const params = {
		Bucket: process.env.N_AWS_S3_BUCKET_NAME,
		Key: key,
	}

	const command = new DeleteObjectCommand(params);
	const data = await s3Client.send(command);
    console.log(data);
	return data;
}

export async function DELETE(
    req:Request,
    { params }: { params: { attachmentId: string }}
    ) {
        try {
            const { userId } = auth();
            if (!userId) {
                return new Response("Unauthorized", { status: 401 });
            }
            const {attachmentId} = params;
            
            if(!attachmentId){
                return new Response("Key is required", {status: 400});
            }

            const attachment = await db.attachment.findUnique({
                where: {
                  id: attachmentId,
                }
            });

            if(!attachment){
                return new Response("Attachment is not found", {status: 400});
            }

            const res = await deleteS3File(attachment.key);
            console.log(res);
            return Response.json({ status: "success",res});
    
        } catch (err) {
          console.log("[S3 POST] ", err);
          return new Response("Internal Error", { status: 500 });
        }
}