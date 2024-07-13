import { redirect} from "next/navigation";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import HackathonEdit from "./_components/hackathon-edit";

const HackathonFormPage = async ({
    params
  }: {
    params: { hackathonId: string }
  }) => {
    const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const initialData = await db.hackathon.findUnique({
    where:{
        id: params.hackathonId
    }
  });
  
  if(!initialData){
    return redirect('/');
  }

  return (
    <div className="mt-6 borde p-8">
      <div className="text-2xl font-medium mb-8">
        Hackathon Form
      </div>
      <HackathonEdit
        initialData={initialData}
        hackathonId={params.hackathonId}
      />
    </div>
  )
}

export default HackathonFormPage;