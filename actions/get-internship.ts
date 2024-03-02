import { db } from "@/lib/db";
import { Internship } from "@prisma/client";

export const getInternship = async (role:string):Promise<Internship[]|undefined> => {
    try{
        const allInternship = await db.internship.findMany({
            where:{
                role:{
                    contains:role
                }
            },
            orderBy: {
                createdAt: "desc",
            }
        });
        return allInternship;
    }catch(e){
        console.log(e);
    }
}