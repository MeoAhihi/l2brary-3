"use client"

import * as React from "react"
import {
  AudioWaveform,
  Zap,
  Users,
  Command,
  GalleryVerticalEnd,
  Settings2,
  DoorOpen,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Vĩ Phong lý",
    email: "viphongly@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Anh văn",
      navs: [
        {
          title: "Lớp học",
          url: "/dashboard/123/classes/overview",
          icon: DoorOpen,
          isActive: true,
          items: [
            {
              title: "Tổng quan",
              url: "/dashboard/123/classes/overview",
            },
            {
              title: "Phiên dịch",
              url: "/dashboard/123/classes/147",
            },
            {
              title: "AV chủ nhật",
              url: "/dashboard/123/classes/258",
            },
            {
              title: "AV thứ 5",
              url: "/dashboard/123/classes/369",
            },
          ],
        },
        {
          title: "Thành viên",
          url: "/dashboard/123/members/list",
          icon: Users,
          items: [
            {
              title: "Danh sách",
              url: "/dashboard/123/members/list",
            },
            {
              title: "Sinh nhật",
              url: "/dashboard/123/members/birthday",
            }
          ],
        },
        {
          title: "Kỹ năng",
          url: "/dashboard/123/skills/score-table",
          icon: Zap,
          items: [

            {
              title: "Bảng điểm",
              url: "/dashboard/123/skills/score-table",
            },
          ],
        }
      ],
    },
    {
      title: "Kỹ năng Giao tiếp",
      navs: [
        {
          title: "Lớp học",
          url: "/dashboard/456/classes/overview",
          icon: DoorOpen,
          isActive: true,
          items: [
            {
              title: "Tổng quan",
              url: "/dashboard/456/classes/overview",
            },
            {
              title: "Giao tiếp Đám đông",
              url: "/dashboard/456/classes/741",
            },
            {
              title: "Giao tiếp Thu hút",
              url: "/dashboard/456/classes/852",
            },
          ],
        },
        {
          title: "Thành viên",
          url: "/dashboard/456/members/list",
          icon: Users,
          items: [
            {
              title: "Danh sách",
              url: "/dashboard/456/members/list",
            },
            {
              title: "Sinh nhật",
              url: "/dashboard/456/members/birthday",
            }
          ],
        },
        {
          title: "Kỹ năng",
          url: "/dashboard/456/skills/score-table",
          icon: Zap,
          items: [

            {
              title: "Bảng điểm",
              url: "/dashboard/456/skills/score-table",
            },
          ],
        }
      ],
    },
  ]
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <NavMain key={item.title} title={item.title} items={item.navs} />
        ))}
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
