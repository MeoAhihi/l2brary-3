import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | L2brary",
  description: "Sign in or create your L2brary account",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background min-h-screen">
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
