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
          url: "#",
          icon: DoorOpen,
          isActive: true,
          items: [
            {
              title: "Tổng quan",
              url: "#",
            },
            {
              title: "Phiên dịch",
              url: "#",
            },
            {
              title: "AV chủ nhật",
              url: "#",
            },
            {
              title: "AV thứ 5",
              url: "#",
            },
          ],
        },
        {
          title: "Học sinh",
          url: "#",
          icon: Users,
          items: [
            {
              title: "Danh sách",
              url: "#",
            },
            {
              title: "Phân tổ",
              url: "#",
            },
            {
              title: "Thống kê",
              url: "#",
            },
          ],
        },
        {
          title: "Kỹ năng",
          url: "#",
          icon: Zap,
          items: [

            {
              title: "Bảng điểm",
              url: "#",
            },
            {
              title: "Nhóm Kỹ năng",
              url: "#",
            },
            {
              title: "Thống kê",
              url: "#",
            },
            {
              title: "Lịch sử",
              url: "#",
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
          url: "#",
          icon: DoorOpen,
          isActive: true,
          items: [
            {
              title: "Tổng quan",
              url: "#",
            },
            {
              title: "Giao tiếp Đám đông",
              url: "#",
            },
            {
              title: "Giao tiếp Thu hút",
              url: "#",
            },
          ],
        },
        {
          title: "Học sinh",
          url: "#",
          icon: Users,
          items: [
            {
              title: "Danh sách",
              url: "#",
            },
            {
              title: "Phân tổ",
              url: "#",
            },
            {
              title: "Thống kê",
              url: "#",
            },
          ],
        },
        {
          title: "Kỹ năng",
          url: "#",
          icon: Zap,
          items: [

            {
              title: "Bảng điểm",
              url: "#",
            },
            {
              title: "Nhóm Kỹ năng",
              url: "#",
            },
            {
              title: "Thống kê",
              url: "#",
            },
            {
              title: "Lịch sử",
              url: "#",
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
          <NavMain key={item.title} title={item.title} items={item.navs}/>
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
