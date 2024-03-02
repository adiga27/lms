import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";


export async function PATCH( req:Request,
    { params }: { params: { imageId: string }}
    ){
    const { userId } = auth();

    if (!userId) {
        return new Response("Unauthorized", { status: 401 });
    }
    
    const {imageId} = params;
    
    if(!imageId){
        return new Response("Key is required", {status: 400});
    }

    const course = await db.course.findUnique({
        where: {
            id: imageId,
        }
    });

    if(!course){
        return new Response("Course Image is not found", {status: 400});
    }


    return Response.json({ success: "success"});
}