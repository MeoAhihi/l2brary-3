import { Metadata } from "next";

import { SiteHeader } from "@/components/header/site-header";
import { AppSidebar } from "@/components/side-nav/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "next-themes";

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
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full px-4">
          <SiteHeader />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
}
