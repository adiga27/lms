import { db } from "@/lib/db";
import { Hackathon } from "@prisma/client";

export const getHackathon = async (organizer:string):Promise<Hackathon[]|undefined> => {
    try{
        const allHackathon = await db.hackathon.findMany({
            where:{
                organizer:{
                    contains:organizer
                }
            },
            orderBy: {
                createdAt: "desc",
            }
        });
        return allHackathon;
    }catch(e){
        console.log(e);
    }
}