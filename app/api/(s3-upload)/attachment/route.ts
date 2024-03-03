import { auth } from "@clerk/nextjs";
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from "@/lib/s3-credentials";
import { isTeacher } from "@/lib/teacher";

async function uploadFileToS3(file:Buffer, courseId:String, fileName:String) {
	const params = {
		Bucket: process.env.N_AWS_S3_BUCKET_NAME,
		Key: `${courseId}/attachments/${fileName}`,
		Body: file,
		ContentType: "applicaation/pdf,msword,vnd.openxmlformats-officedocument.wordprocessingml.document,vnd.ms-powerpoint,vnd.openxmlformats-officedocument.presentationml.presentation,vnd.ms-excel,vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }

	const command = new PutObjectCommand(params);
	const data = await s3Client.send(command);

    let url; 
    if(data.$metadata.httpStatusCode === 200){
        url = `https://${process.env.N_AWS_S3_BUCKET_NAME}.s3.${process.env.N_AWS_REGION}.amazonaws.com/${params.Key}`
    }
	return {
        url,
        key:params.Key
    };
}

export async function POST(req:Request){
    try {
        const { userId } = auth();
        const isAuthorized = isTeacher(userId);

        if (!userId || !isAuthorized) {
            return new Response("Unauthorized", { status: 401 });
        }
        const formData = await req.formData();
		const file = formData.get("file") as File;
        const courseId = formData.get("id") as String;
        const fileName = formData.get("name") as String;

        if(!file || !courseId || !fileName){
            return new Response("File, FileName and CourseId are required", {status: 400});
        }

        const buffer = Buffer.from(await file.arrayBuffer());
		const data = await uploadFileToS3(buffer, courseId,fileName);

        return Response.json({ status: "success", url:data.url, key:data.key,name:fileName});

    } catch (err) {
      console.log("[S3 POST] ", err);
      return new Response("Internal Error", { status: 500 });
    }
}

