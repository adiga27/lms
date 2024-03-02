import { redirect} from "next/navigation";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import InternshipEdit from "./_components/internship-edit";

const InternshipFormPage = async ({
    params
  }: {
    params: { internshipId: string }
  }) => {
    const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const initialData = await db.internship.findUnique({
    where:{
        id: params.internshipId
    }
  });
  if(!initialData){
    return redirect('/');
  }

  return (
    <div className="mt-6 borde p-8">
      <div className="text-2xl font-medium mb-8">
        Internship Form
      </div>
      <InternshipEdit
        initialData={initialData}
        internshipId={params.internshipId}
      />
    </div>
  )
}

export default InternshipFormPage;