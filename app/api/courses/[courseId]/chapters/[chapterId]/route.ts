import { db } from "@/lib/db";
import { s3Client } from "@/lib/s3-credentials";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

async function deleteS3File(key:string) {
  console.log(key);
  const params = {
    Bucket: process.env.N_AWS_S3_CLOUDFRONT_BUCKET_NAME,
    Key: key,
  }

  const command = new DeleteObjectCommand(params);
  const data = await s3Client.send(command);
  console.log(data);
  return data;
}


export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      }
    });

    if (!ownCourse) {
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
    
    if(chapter.videoKey){
      const data = await deleteS3File(chapter.videoKey);

      if(data?.$metadata.httpStatusCode !== 204){
        return Response.json({ status: "Video is not deleted"},{status:400});  
      }
    }
    
    const deletedChapter = await db.chapter.delete({
      where: {
        id: params.chapterId
      }
    });
    
    if (!deletedChapter) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const publishedChaptersInCourse = await db.chapter.findMany({
      where: {
        courseId: params.courseId,
        isPublished: true,
      }
    });

    if (!publishedChaptersInCourse.length) {
      await db.course.update({
        where: {
          id: params.courseId,
        },
        data: {
          isPublished: false,
        }
      });
    }

    return NextResponse.json(deletedChapter);
  } catch (error) {
    console.log("[CHAPTER_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
    req: Request,
    { params }: { params: { courseId: string; chapterId: string } }
  ) {
    try {
      const { userId } = auth();
      const { isPublished, ...values } = await req.json();
  
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      const ownCourse = await db.course.findUnique({
        where: {
          id: params.courseId,
          userId
        }
      });
  
      if (!ownCourse) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      const chapter = await db.chapter.update({
        where: {
          id: params.chapterId,
          courseId: params.courseId,
        },
        data: {
          ...values,
        }
      });
  
      return NextResponse.json(chapter);
    } catch (error) {
      console.log("[COURSES_CHAPTER_ID]", error);
      return new NextResponse("Internal Error", { status: 500 }); 
    }
  }