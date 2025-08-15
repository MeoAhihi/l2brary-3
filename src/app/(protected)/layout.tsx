import { Metadata } from "next";

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
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Admin Sidebar can be added here */}
        <aside className="w-64 min-h-screen bg-muted/50 border-r">
          <div className="p-4">
            <h2 className="text-lg font-semibold">Admin Panel</h2>
            {/* Navigation menu will be implemented here */}
          </div>
        </aside>
        
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
