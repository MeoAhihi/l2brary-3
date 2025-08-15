import { Metadata } from "next";

export const metadata: Metadata = {
  title: "L2brary",
  description: "Learning and development platform for clubs",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header/Navigation can be added here */}
      <main className="flex-1">
        {children}
      </main>
      {/* Footer can be added here */}
    </div>
  );
}
