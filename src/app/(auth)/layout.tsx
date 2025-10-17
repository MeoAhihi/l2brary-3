import { Metadata } from "next";
import Image from "next/image";

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
      <Image
        src="/il_fullxfull.4264851559_osx8.jpg"
        alt="Background"
        fill
        className="object-cover"
      />
      <div className="z-10 flex min-h-screen items-center justify-center">
        {children}
      </div>
    </div>
  );
}
