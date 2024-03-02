"use client"

import { BarChart, Briefcase, Compass, Layout, List } from "lucide-react";
import {SidebarItem} from "./sidebar-item";
import { usePathname } from "next/navigation";

const guestRoutes = [
    {
        icon: Layout,
        label:'DashBoard',
        href: "/"
    },
    {
        icon: Compass,
        label:'Browse',
        href:"/search"
    },
    {
        icon: Briefcase,
        label: "Internship",
        href: "/internship",
    },
]

const teacherRoutes = [
    {
      icon: List,
      label: "Courses",
      href: "/teacher/courses",
    },
    {
      icon: BarChart,
      label: "Analytics",
      href: "/teacher/analytics",
    },
    {
        icon: Briefcase,
        label: "Internship",
        href: "/teacher/internship-list",
    },
  ]

function SideBarRoutes() {
    const pathname = usePathname();

    const isTeacherPage = pathname?.includes("/teacher");
  
    const routes = isTeacherPage ? teacherRoutes : guestRoutes;
    
    return (
        <div className="flex flex-col w-full">
            {routes.map((route) =>
                <SidebarItem
                    key={route.href}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                    />
            )}
        </div>
    );
}

export default SideBarRoutes;