import { getHackathon } from "@/actions/get-hackathon";
import { HackathonList } from "@/components/hackathon-list";
import { SearchInput } from "@/components/search-input";

type SearchParams = {
    searchParams:{
        title : string,
    }
}

async function HackathonPage({searchParams}:SearchParams) {
    
    const hackathon = await getHackathon(searchParams.title);

    return (
        <>
            <div className="px-6 pt-6 ">
                <SearchInput />
            </div>
            <div className="pt-3 pl-8 space-y-4">
                <HackathonList items={hackathon!} />
            </div>
        </>
    );
}

export default HackathonPage;