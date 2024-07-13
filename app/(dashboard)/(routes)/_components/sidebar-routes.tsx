"use client"

import { BarChart, GraduationCap, Layout, Lightbulb, List, ScrollText, UsersRound } from "lucide-react";
import {SidebarItem} from "./sidebar-item";
import { usePathname } from "next/navigation";

const guestRoutes = [
    {
        icon: Layout,
        label:'DashBoard',
        href: "/dashboard"
    },
    {
        icon: List,
        label:'Courses',
        href:"/search"
    },
    {
        icon: UsersRound,
        label: "Student Hub",
        href: "/student-hub/test-series",
    },
    {
        icon: ScrollText,
        label: "Research",
        href: "/research",
    },
]

const adminRoutes = [
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
        icon: GraduationCap,
        label: "Internship",
        href: "/teacher/internship-list",
    },
    {
        icon: Lightbulb,
        label: "Hackathon",
        href: "/teacher/hackathon-list",
    },
  ]

function SideBarRoutes() {
    const pathname = usePathname();

    const isAdminPage = pathname?.includes("/teacher");
  
    const routes = isAdminPage ? adminRoutes : guestRoutes;
    
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