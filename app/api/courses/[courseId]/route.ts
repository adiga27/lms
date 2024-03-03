import { db } from "@/lib/db";
import { s3Client } from "@/lib/s3-credentials";
import { isTeacher } from "@/lib/teacher";
import  {DeleteObjectsCommand} from "@aws-sdk/client-s3";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


async function deleteS3File(key:{Key:string}[],bucket:string|undefined) {
  const params = {
    Bucket: bucket,
    Delete: {
      Objects: key,
    },
  }

  const command = new DeleteObjectsCommand(params);
  
  const data = await s3Client.send(command);
  console.log(data);
  return data;
}

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const isAuthorized = isTeacher(userId);

    if (!userId || !isAuthorized) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
      include: {
        chapters: true,
        attachments:true,
      }
    });

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    let imageAndAttachmentKey:{Key:string}[] = [];
    if(course.imageKey !== null){
      imageAndAttachmentKey.push({Key:course.imageKey});
    }
    course.attachments.forEach(({key}) =>{
      if(key !== null){
        imageAndAttachmentKey.push({Key:key})
      }
    });
    console.log(imageAndAttachmentKey);

    if(imageAndAttachmentKey.length !== 0){
      const deletedImageAttachmentS3 = await deleteS3File(imageAndAttachmentKey,process.env.N_AWS_S3_BUCKET_NAME);
      
      console.log(deletedImageAttachmentS3);
      
      if(deletedImageAttachmentS3?.$metadata.httpStatusCode !== 200){
        return new NextResponse("Image and Attachment is not deleted",{status:400});
      }
    }
    
    let chapterKey:{Key:string}[]=[];
    course.chapters.forEach(({videoKey}) => {
      if(videoKey !== null){
        chapterKey.push({Key:videoKey})
      }
    });
    
    if(chapterKey.length !== 0){
      const videoS3 = await deleteS3File(chapterKey,process.env.N_AWS_S3_CLOUDFRONT_BUCKET_NAME);
      
      if(videoS3?.$metadata.httpStatusCode !== 200){
        return new NextResponse("Chapters are not deleted",{status:400});
      }
    }

    const deletedCourse = await db.course.delete({
      where: {
        id: params.courseId,
      },
    });

    return NextResponse.json(deletedCourse);
  } catch (error) {
    console.log("[COURSE_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
    req: Request,
    { params }: { params: { courseId: string } }
  ) {
    try {
      const { userId } = auth();
      const isAuthorized = isTeacher(userId);

      const { courseId } = params;
      const values = await req.json();
  
      if (!userId || !isAuthorized) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      const course = await db.course.update({
        where: {
          id: courseId,
          userId
        },
        data: {
          ...values,
        }
      });
  
      return NextResponse.json(course);
    } catch (error) {
      console.log("[COURSE_ID]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }