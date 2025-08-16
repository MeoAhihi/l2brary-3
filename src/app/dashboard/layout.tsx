import { AppSidebar } from "@/components/side-nav/app-sidebar";
import { SiteHeader } from "@/components/header/site-header";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
