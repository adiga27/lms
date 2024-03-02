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
      
      const values = await req.json();

      const internship = await db.internship.create({
        data: {
          ...values
        }
      });
  
      return Response.json(internship);
    } catch (error) {
      console.log("[INTERSHIP]", error);
      return new Response("Internal Error", { status: 500 });
    }
  }