import { auth } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";

import { db } from "@/lib/db";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";


const HackathonPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }


  const hackathon = await db.hackathon.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return ( 
    <div className="p-6">
      <DataTable columns={columns} data={hackathon} />
    </div>
   );
}
 
export default HackathonPage;