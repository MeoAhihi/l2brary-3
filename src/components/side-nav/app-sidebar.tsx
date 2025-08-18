"use client";

import type * as React from "react";

import { NavMain } from "@/components/side-nav/nav-main";
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
import { appSidebar } from "@/constants/app-sidebar";
import { NavProjects } from "./nav-projects";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={appSidebar.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={appSidebar.projects} />
        {appSidebar.navMain.map((item) => (
          <NavMain key={item.title} title={item.title} items={item.navs} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={appSidebar.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
