import { IconBadge } from "@/components/icon-badge";
import { LayoutDashboard, LucideIcon } from "lucide-react";
import Link from "next/link";

type StudentHubCardProps = {
    href:string,
    icon:LucideIcon,
    label:string,
}

function StudentHubCard(
    {href,
    icon,
    label,
    }:StudentHubCardProps
) {
    return (
        <Link href={href} >
            <div className="group transition-all duration-300 ease-in-out border rounded-2xl p-2 h-full">
                <div className="flex gap-x-2">
                    <IconBadge icon={icon}  size="base" />
                    <h2 className="text-base group-hover:text-sky-700 transition line-clamp-2 self-center">
                        {label}
                    </h2>
                </div>
            </div>
        </Link>
    );
}

export default StudentHubCard;