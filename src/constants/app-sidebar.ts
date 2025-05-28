import {
  AudioWaveform,
  CakeIcon,
  Command,
  DoorOpen,
  GalleryVerticalEnd,
  LucideIcon,
  Map,
  PieChart,
  Users,
  Users2,
  Users2Icon,
  Zap
} from "lucide-react";

export const appSidebar = {
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
      title: "Khám phá Vật lý",
      navs: [
        {
          title: "Lớp học",
          url: "/dashboard/12345/classes/overview",
          icon: DoorOpen,
          isActive: true,
          items: [
            {
              title: "Tổng quan",
              url: "/dashboard/12345/classes/overview",
            },
            {
              title: "Thí nghiệm Vật Lý",
              url: "/dashboard/12345/classes/translation",
            },
            {
              title: "Lịch sử Vật lý học",
              url: "/dashboard/12345/classes/sunday-english",
            },
            {
              title: "Hoạt động Dã ngoại",
              url: "/dashboard/12345/classes/thursday-english",
            },
          ],
        },
        {
          title: "Thành viên",
          url: "/dashboard/12345/members/list",
          icon: Users,
          items: [
            {
              title: "Danh sách",
              url: "/dashboard/12345/members/list",
            },
            {
              title: "Sinh nhật",
              url: "/dashboard/12345/members/birthday",
            },
          ],
        },
        {
          title: "Điểm số",
          url: "/dashboard/12345/skills/score-table",
          icon: Zap,
          items: [
            {
              title: "Bảng điểm",
              url: "/dashboard/12345/skills/score-table",
            },
          ],
        },
      ],
    },
    {
      title: "Vật lý Học thuật",
      navs: [
        {
          title: "Lớp học",
          url: "/dashboard/56789/classes/overview",
          icon: DoorOpen,
          isActive: true,
          items: [
            {
              title: "Tổng quan",
              url: "/dashboard/56789/classes/overview",
            },
            {
              title: "Phương pháp Nghiên cứu Khoa học",
              url: "/dashboard/56789/classes/crowd-communication",
            },
            {
              title: "101 Bài tập Vật lý Hay và Khó",
              url: "/dashboard/56789/classes/attraction-communication",
            },
          ],
        },
        {
          title: "Thành viên",
          url: "/dashboard/56789/members/list",
          icon: Users,
          items: [
            {
              title: "Danh sách",
              url: "/dashboard/56789/members/list",
            },
            {
              title: "Sinh nhật",
              url: "/dashboard/56789/members/birthday",
            },
          ],
        },
        {
          title: "Điểm số",
          url: "/dashboard/56789/skills/score-table",
          icon: Zap,
          items: [
            {
              title: "Bảng điểm",
              url: "/dashboard/56789/skills/score-table",
            },
          ],
        },
      ],
    },
  ],
  projects: [
    {
      name: "Thành viên",
      url: "/dashboard/members",
      icon: Users2Icon,
    },
    {
      name: "Sinh nhật",
      url: "/dashboard/birthdays",
      icon: CakeIcon,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map as LucideIcon,
    },
  ],
};
