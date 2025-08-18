"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { use } from "react";
import { cn } from "@/lib/utils";
import {
  Settings,
  Users,
  BookOpen,
  BarChart3
} from "lucide-react";

interface ManageCourseLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    "course-id": string;
  }>;
}

const tabs = [
  {
    name: "Overview",
    href: "",
    icon: BarChart3,
  },
  {
    name: "Enrollments",
    href: "/enrollments",
    icon: Users,
  },
  {
    name: "Content",
    href: "/content",
    icon: BookOpen,
  },
  {
    name: "Score Table",
    href: "/score-table",
    icon: BarChart3,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function ManageCourseLayout({
  children,
  params
}: ManageCourseLayoutProps) {
  const pathname = usePathname();
 const { "course-id": courseId } = use(params);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Manage Course</h1>
          <p className="text-muted-foreground">
            Course ID: {courseId}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="border-b">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const isActive = pathname === `/admin/ld/courses/${courseId}/manage${tab.href}`;

              return (
                <Link
                  key={tab.name}
                  href={`/admin/ld/courses/${courseId}/manage${tab.href}`}
                  className={cn(
                    "flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors",
                    isActive
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground"
                  )}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {children}
        </div>
      </div>
    </div>
  );
}
