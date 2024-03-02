import { getInternship } from "@/actions/get-internship";
import { InternshipList } from "@/components/internship-list";
import { SearchInput } from "@/components/search-input";

type SearchParams = {
    searchParams:{
        title : string,
    }
}

async function InternshipPage({searchParams}:SearchParams) {
    
    const internships = await getInternship(searchParams.title);

    return (
        <>
            <div className="px-6 pt-6 ">
                <SearchInput />
            </div>
            <div className="p-8 space-y-4">
                <InternshipList items={internships!} />
            </div>
        </>
    );
}

export default InternshipPage;