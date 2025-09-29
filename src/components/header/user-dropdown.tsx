"use client";

import { LogOut, User } from "lucide-react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/auth/AuthContext";

export function UserDropdown() {
  const { user, getUserDisplayName, logout } = useAuth();

  // Nếu không có user, hiển thị button Login
  if (!user) {
    return (
      <Button
        asChild
        variant="default"
        className="bg-primary text-primary-foreground"
      >
        <Link href="/login">Đăng nhập</Link>
      </Button>
    );
  }

  const displayName = getUserDisplayName();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="hover:bg-accent hover:text-accent-foreground flex items-center gap-2 px-3 py-2 text-sm font-medium"
        >
          <User className="h-4 w-4" />
          <span className="hidden md:block">{displayName}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium">{displayName}</p>
            <p className="text-muted-foreground text-xs leading-none">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={logout}
          className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Đăng xuất</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
