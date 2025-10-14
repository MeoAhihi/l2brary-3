"use client";

import { BarChart3, BookOpen, Layers, Settings, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { use } from "react";

import PageHeader from "@/components/ui/page-header";
import { useGetCourseById } from "@/hooks/courses/useGetCourseById";
import { cn } from "@/lib/utils";
interface ManageCourseLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    "course-id": string;
  }>;
}

const tabs = [
  {
    name: "Tổng quan",
    href: "",
    icon: BarChart3,
  },
  {
    name: "Buổi học",
    href: "/sessions",
    icon: Layers,
  },
  {
    name: "Đăng ký",
    href: "/enrollments",
    icon: Users,
  },
  {
    name: "Nội dung",
    href: "/content",
    icon: BookOpen,
  },
  {
    name: "Bảng điểm",
    href: "/score-table",
    icon: BarChart3,
  },
  {
    name: "Cài đặt",
    href: "/settings",
    icon: Settings,
  },
];

export default function ManageCourseLayout({
  children,
  params,
}: ManageCourseLayoutProps) {
  const pathname = usePathname();
  const { "course-id": courseId } = use(params);
  const { data, isLoading } = useGetCourseById(courseId);

  if (isLoading) return "Vui lòng chờ trong giây lát...";
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <PageHeader
          pageTitle={data!.title}
          descriptions={[`ID: ${courseId}`]}
        />

        {/* Tab Navigation */}
        <div className="border-b">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const isActive =
                pathname === `/admin/ld/courses/${courseId}/manage${tab.href}`;

              return (
                <Link
                  key={tab.name}
                  href={`/admin/ld/courses/${courseId}/manage${tab.href}`}
                  className={cn(
                    "flex items-center gap-2 border-b-2 px-1 py-4 text-sm font-medium transition-colors",
                    isActive
                      ? "border-primary text-primary"
                      : "text-muted-foreground hover:text-foreground hover:border-muted-foreground border-transparent",
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
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}
