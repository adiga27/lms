import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { internshipId: string } }
  ) {
    try {
      const { userId } = auth();
      const isAuthorized = isTeacher(userId);

      const { internshipId } = params;
      const values = await req.json();
  
      if (!userId || !isAuthorized) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      const internship = await db.internship.update({
        where: {
          id: internshipId,
        },
        data: {
          ...values,
        }
      });
  
      return NextResponse.json(internship);
    } catch (error) {
      console.log("[INTERNSHIP_ID]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { internshipId: string } }
  ) {
    try {
      const { userId } = auth();
      const isAuthorized = isTeacher(userId);
  
      if (!userId || !isAuthorized) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      const deletedInternship = await db.internship.delete({
        where: {
          id: params.internshipId,
        },
      });

      if(!deletedInternship){
        return new NextResponse("Not Deleted", { status: 400 });
      }
  
      return NextResponse.json(deletedInternship);
    } catch (error) {
      console.log("[INTERNSHIP_ID_DELETE]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }