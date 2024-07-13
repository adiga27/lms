import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { hackathonId: string } }
  ) {
    try {
      const { userId } = auth();
      const isAuthorized = isTeacher(userId);

      const { hackathonId } = params;
      const values = await req.json();
  
      if (!userId || !isAuthorized) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      const hackathon = await db.hackathon.update({
        where: {
          id: hackathonId,
        },
        data: {
          ...values,
        }
      });
  
      return NextResponse.json(hackathon);
    } catch (error) {
      console.log("[HACKATHON_ID]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { hackathonId: string } }
  ) {
    try {
      const { userId } = auth();
      const isAuthorized = isTeacher(userId);
  
      if (!userId || !isAuthorized) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      const deletedHackathon = await db.hackathon.delete({
        where: {
          id: params.hackathonId,
        },
      });

      if(!deletedHackathon){
        return new NextResponse("Not Deleted", { status: 400 });
      }
  
      return NextResponse.json(deletedHackathon);
    } catch (error) {
      console.log("[HACKATHON_ID_DELETE]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }