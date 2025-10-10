import { ChevronsUpDown } from "lucide-react";

import { Avatar } from "../ui/avatar";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

// Skeleton component cho NavUser
export const NavUserSkeleton = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="bg-muted text-muted-foreground animate-pulse"
          disabled
        >
          <Avatar className="h-8 w-8 rounded-lg">
            <div className="h-8 w-8 rounded-lg bg-gray-300 dark:bg-gray-700" />
          </Avatar>
          <div className="ml-2 grid flex-1 gap-1 text-left text-sm leading-tight">
            <div className="h-4 w-24 rounded bg-gray-300 dark:bg-gray-700" />
            <div className="h-3 w-16 rounded bg-gray-200 dark:bg-gray-800" />
          </div>
          <ChevronsUpDown className="ml-auto size-4 opacity-30" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
