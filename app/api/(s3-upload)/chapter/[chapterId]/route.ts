import { db } from "@/lib/db";
import { s3Client } from "@/lib/s3-credentials";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

async function deleteS3File(key:string) {
    console.log(key);
	const params = {
		Bucket: process.env.N_AWS_S3_BUCKET_NAME,
		Key: key,
	}

	const command = new DeleteObjectCommand(params);
	const data = await s3Client.send(command);
	return data;
}

export async function DELETE(req:Request,
    { params }: { params: { chapterId: string }}){
    try{
        const { userId } = auth();
  
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
  
        const chapter = await db.chapter.findUnique({
            where: {
                id: params.chapterId
            }
        })

        if(!chapter){
            return Response.json({ status: "fail"},{status:400});  
        }
        
        if(!chapter.videoKey){
            return Response.json({ status: "Key not found"},{status:400});  
        }

        const res = await deleteS3File(chapter.videoKey);
        console.log(res);
        return Response.json({ status: "success",res});

    }catch(err){
        console.log("[S3 CHAPTER SIGNED URL] ", err);
        return new Response("Internal Error", { status: 500 });
    }
}