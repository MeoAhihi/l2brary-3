"use client";

import type * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
import { appSidebar } from "@/constants/app-sidebar";
import { NavProjects } from "./nav-projects";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={appSidebar.teams} />
      </SidebarHeader>
      <SidebarContent>
        {appSidebar.navMain.map((item) => (
          <NavMain key={item.title} title={item.title} items={item.navs} />
        ))}
        <NavProjects projects={appSidebar.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={appSidebar.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
