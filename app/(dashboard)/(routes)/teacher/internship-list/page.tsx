import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";


const InternshipPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const internship = await db.internship.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return ( 
    <div className="p-6">
      <DataTable columns={columns} data={internship} />
    </div>
   );
}
 
export default InternshipPage;