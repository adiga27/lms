import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs";

export async function POST(
    req: Request,
  ) {
    try {
      const { userId } = auth();
      const isAuthorized = isTeacher(userId);

      if (!userId || !isAuthorized) {
        return new Response("Unauthorized", { status: 401 });
      }
      
      const { title } = await req.json();
      const course = await db.course.create({
        data: {
          userId,
          title,
        }
      });
  
      return Response.json(course);
    } catch (error) {
      console.log("[COURSES]", error);
      return new Response("Internal Error", { status: 500 });
    }
  }