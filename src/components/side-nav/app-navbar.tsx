"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { appNavbar } from "@/constants/app-navbar";
import { CollapsibleSearch } from "../ui/collapsible-search";

export function AppNavbar() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between px-4 py-2 border-b bg-background sticky top-0 z-40">
      {/* Logo on the left */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          {/* You can replace this with an actual logo image if available */}
          <img
            src="/l2brary.ico"
            alt="L2brary logo"
            className="w-7 h-7"
          />
          <span className="hidden sm:inline">L2brary</span>
        </Link>
      </div>

      {/* Buttons in the middle */}
      <div className="flex items-center gap-2">
        {appNavbar.map((item) => {
          // Only show public items or (optionally) handle auth here
          if (!item.public) {
            // In a real app, check authentication here
            // For now, skip non-public items
            // return null;
          }
          const isActive = pathname === item.url;
          return (
            <Button
              key={item.title}
              asChild
              variant={isActive ? "secondary" : "ghost"}
              className="flex items-center gap-2"
            >
              <Link href={item.url}>
                <item.icon className="w-5 h-5 mr-1" />
                <span>{item.title}</span>
              </Link>
            </Button>
          );
        })}
        <CollapsibleSearch />
      </div>

      {/* Login on the right */}
      <div className="flex items-center gap-2">
        <Button asChild variant="outline">
          <Link href="/contact">Contact</Link>
        </Button>
        <Button asChild variant="default" className="bg-primary text-primary-foreground">
          <Link href="/login">Login</Link>
        </Button>
      </div>
    </nav>
  );
}

