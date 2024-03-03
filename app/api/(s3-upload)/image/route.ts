import { auth } from "@clerk/nextjs";
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from "@/lib/s3-credentials";
import { isTeacher } from "@/lib/teacher";

async function uploadFileToS3(file:Buffer, courseId:String) {
	const params = {
		Bucket: process.env.N_AWS_S3_BUCKET_NAME,
		Key: `${courseId}/images/thumbnail`,
		Body: file,
		ContentType: "image/jpg,jpeg,png",
	}

	const command = new PutObjectCommand(params);
	const data = await s3Client.send(command);

    let url;
    if(data.$metadata.httpStatusCode === 200){
       url=`https://${process.env.N_AWS_S3_BUCKET_NAME}.s3.${process.env.N_AWS_REGION}.amazonaws.com/${params.Key}`
    }
    return {url,key:params.Key};
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

        if(!file || !courseId){
            return new Response("File and CourseId are required", {status: 400});
        }

        const buffer = Buffer.from(await file.arrayBuffer());
		const {url,key} = await uploadFileToS3(buffer, courseId);
        
        if(!url || !key){
            return Response.json({ status: "fail", url});    
        }

		return Response.json({ status: "success", url,key});

    } catch (err) {
      console.log("[S3 POST] ", err);
      return new Response("Internal Error", { status: 500 });
    }
}

