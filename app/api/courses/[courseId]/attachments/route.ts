import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const isAuthorized = isTeacher(userId);
    
    if (!userId || !isAuthorized) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    const { url , name , key} = await req.json();
    console.log(url,name,key);

    if(!url || !name || !key){
        return new NextResponse("Url, Name, and Key are required",{status:400});
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      }
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const attachment = await db.attachment.create({
      data: {
        url,
        name,
        key,
        courseId: params.courseId,
      }
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("COURSE_ID_ATTACHMENTS", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}