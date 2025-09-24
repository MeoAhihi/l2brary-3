import { Metadata } from "next";

import FooterSection from "@/components/guest/footer.section";
import { AppNavbar } from "@/components/side-nav/app-navbar";
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
    <div className="bg-background flex min-h-screen flex-col">
      <AppNavbar />
      <main className="flex-1">{children}</main>
      {/* Footer can be added here */}

      <FooterSection />
    </div>
  );
}
