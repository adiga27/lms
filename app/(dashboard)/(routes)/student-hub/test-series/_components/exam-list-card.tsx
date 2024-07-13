import Link from "next/link";

function ExamListCard() {
    const exams = [
        {
            label:"IT Placement Papers",
            href:"https://ejnanaam.com/exams/it-placement-papers/541",
        },
        {
            label:"Skill, Aplitutde and Language Test",
            href:"https://ejnanaam.com/exams/skill-aptitude-and-language-test/523",
        },
        {
            label:"Civil Services",
            href:"https://ejnanaam.com/exams/civil-services/518",
        },
        {
            label:"School Level - All India",
            href:"https://ejnanaam.com/exams/school-level-all-india/529",
        },
        {
            label:"School Level - State Boards",
            href:"https://ejnanaam.com/exams/school-level-state-boards/949",
        }
    ]
    return (
        <>
            {exams.map((item) => 
                <div key={item.label} className="m-3">
                    <Link href={item.href} target="_blank">
                        <div className="group border rounded-2xl p-1 h-full">
                            <h3 className="inline-block text-base font-normal group-hover:text-sky-700 transition line-clamp-2">
                                <li className="p-2">
                                    {item.label}
                                </li>
                            </h3>
                        </div>
                    </Link>
                </div>
            )}
        </>
    );
}

export default ExamListCard;