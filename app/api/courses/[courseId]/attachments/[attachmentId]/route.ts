import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/lib/s3-credentials";
import { isTeacher } from "@/lib/teacher";

async function deleteS3File(key:string|undefined) {
  const params = {
    Bucket: process.env.N_AWS_S3_BUCKET_NAME,
    Key: key,
  }

  const command = new DeleteObjectCommand(params);
  const data = await s3Client.send(command);
  return data;
}

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string, attachmentId: string } }
) {
  try {
    const { userId } = auth();
    const isAuthorized = isTeacher(userId);

    if (!userId || !isAuthorized) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId
      }
    });
    
    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
   
    const attachment = await db.attachment.findUnique({
      where: {
        id: params.attachmentId,
      }
    });

    if(!attachment){
      return new Response("Attachment is not found", {status: 400});
    }

    if(attachment.key){
      const data = await deleteS3File(attachment.key);

      if(data?.$metadata.httpStatusCode !== 204){
        return Response.json({ status: "Attachment is not deleted"},{status:400});  
      }
    }

    const deletedAttachment = await db.attachment.delete({
      where: {
        courseId: params.courseId,
        id: params.attachmentId,
      }
    });

    return NextResponse.json(deletedAttachment);
  } catch (error) {
    console.log("ATTACHMENT_ID", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

