import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return <SidebarProvider>
        <AppSidebar />
        <main className="w-full px-4">
            <SiteHeader />
            {children}
        </main>
    </SidebarProvider>
}