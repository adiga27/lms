import { Briefcase, GraduationCap, Lightbulb, MonitorPlay, PenBoxIcon,   } from "lucide-react";
import StudentHubCard from "./student-hub-card";

const hubRoutes = [
    {
        label: "Test Series",
        href: "/student-hub/test-series",
        icon: PenBoxIcon,
        },
    {
        label: "Jobs",
        href: "/student-hub/jobs",
        icon: Briefcase,
    },
    {
        label: "Internships",
        href: "/student-hub/internships",
        icon: GraduationCap,
    },
    {
        label: "Hackathon",
        href: "/student-hub/hackathon",
        icon: Lightbulb,
    },
    {
        label: "Webinar",
        href: "/student-hub/webinar",
        icon: MonitorPlay,
    }
]

function StudentHubList() {
    return (
        <div className="flex items-center gap-x-4">
            {hubRoutes.map((item) => 
                <StudentHubCard 
                    key={item.label}
                    label={item.label}
                    href={item.href}
                    icon={item.icon}
                />
            )}
        </div>
    );
}

export default StudentHubList;