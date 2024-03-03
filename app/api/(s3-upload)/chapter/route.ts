import { auth } from "@clerk/nextjs";
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from "@/lib/s3-credentials";
import { isTeacher } from "@/lib/teacher";

async function uploadFileToS3(file:Buffer, courseId:String, fileName:String) {
	const params = {
		Bucket: process.env.N_AWS_S3_CLOUDFRONT_BUCKET_NAME,
		Key: `${courseId}/chapters/${fileName}`,
		Body: file,
		ContentType: "video/mp4,mkv,avi,mov",
    }

	const command = new PutObjectCommand(params);
	const data = await s3Client.send(command);

    let url;
    if(data.$metadata.httpStatusCode === 200){
        url=`${process.env.N_AWS_DISTRIBUTION_DOMAIN_NAME}${params.Key}`
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
        const fileName = formData.get("name") as String;

        if(!file || !courseId || !fileName){
            return new Response("File, FileName and CourseId are required", {status: 400});
        }

        const buffer = Buffer.from(await file.arrayBuffer());
		const {url,key} = await uploadFileToS3(buffer, courseId,fileName);

        if(!url){
            return Response.json({ status: "fail"},{status:400});    
        }
        return Response.json({ status: "success",videoUrl:url,videoKey:key});

    } catch (err) {
      console.log("[S3 POST] ", err);
      return new Response("Internal Error", { status: 500 });
    }
}

