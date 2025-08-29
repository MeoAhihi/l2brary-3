import { AppSidebar } from "../app-sidebar";
import { SiteHeader } from "../site-header";
import { SidebarProvider } from "../ui/sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full px-4">
        <SiteHeader />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default MainLayout;
