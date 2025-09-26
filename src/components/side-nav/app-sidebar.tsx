"use client";

import type * as React from "react";

import { NavMain, NavMainProps } from "@/components/side-nav/nav-main";
import { NavUser } from "@/components/side-nav/nav-user";
import { TeamSwitcher } from "@/components/side-nav/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
// This is sample data.
import { adminSidebar } from "@/constants/admin-sidebar";
import { useAuth } from "@/contexts";

import { NavProjects } from "./nav-projects";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={adminSidebar.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={adminSidebar.projects} />
        {adminSidebar.navMain.map((item: NavMainProps) => (
          <NavMain key={item.title} title={item.title} items={item.items} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
