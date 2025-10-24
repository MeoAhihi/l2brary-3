"use client";

import {
  BarChart3,
  CheckSquare,
  Gamepad2,
  Settings,
  Stamp,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { use } from "react";

import PageHeader from "@/components/ui/page-header";
import { useSessionByIdQuery } from "@/hooks";
import { cn } from "@/lib/utils";

interface ManageSessionLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    "session-id": string;
  }>;
}

const tabs = [
  {
    name: "Tổng quan",
    href: "",
    icon: BarChart3,
  },
  {
    name: "Điểm danh",
    href: "/check-in",
    icon: CheckSquare,
  },
  // {
  //   name: "Ghi điểm",
  //   href: "/game-log",
  //   icon: Gamepad2,
  // },
  {
    name: "Cài đặt",
    href: "/settings",
    icon: Settings,
  },
];

export default function ManageSessionLayout({
  children,
  params,
}: ManageSessionLayoutProps) {
  const pathname = usePathname();
  const { "session-id": sessionId } = use(params);
  const { data: session, isLoading: isLoadingSession } = useSessionByIdQuery({
    sessionId,
  });
  if (isLoadingSession) return <div>Vui lòng chờ giây lát ...</div>;
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <PageHeader
          pageTitle={session?.title ?? ""}
          descriptions={[`Session ID: ${sessionId}`]}
        />

        {/* Tab Navigation */}
        <div className="border-b">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const isActive =
                pathname ===
                `/admin/ld/sessions/${sessionId}/manage${tab.href}`;

              return (
                <Link
                  key={tab.name}
                  href={`/admin/ld/sessions/${sessionId}/manage${tab.href}`}
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
