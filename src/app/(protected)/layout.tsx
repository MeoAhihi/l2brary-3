import { Metadata } from "next";
import { AppSidebar } from "@/components/side-nav/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/header/site-header";

export const metadata: Metadata = {
  title: "Admin | L2brary",
  description: "Administrative dashboard and management tools",
};

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full px-4">
        <SiteHeader />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </SidebarProvider>
  );
}
