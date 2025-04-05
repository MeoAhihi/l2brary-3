import {
  AudioWaveform,
  Command,
  DoorOpen,
  GalleryVerticalEnd,
  Users,
  Zap,
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
      title: "Anh văn",
      navs: [
        {
          title: "Lớp học",
          url: "/dashboard/english/classes/overview",
          icon: DoorOpen,
          isActive: true,
          items: [
            {
              title: "Tổng quan",
              url: "/dashboard/english/classes/overview",
            },
            {
              title: "Phiên dịch",
              url: "/dashboard/english/classes/translation",
            },
            {
              title: "AV chủ nhật",
              url: "/dashboard/english/classes/sunday-english",
            },
            {
              title: "AV thứ 5",
              url: "/dashboard/english/classes/thursday-english",
            },
          ],
        },
        {
          title: "Thành viên",
          url: "/dashboard/english/members/list",
          icon: Users,
          items: [
            {
              title: "Danh sách",
              url: "/dashboard/english/members/list",
            },
            {
              title: "Sinh nhật",
              url: "/dashboard/english/members/birthday",
            },
          ],
        },
        {
          title: "Kỹ năng",
          url: "/dashboard/english/skills/score-table",
          icon: Zap,
          items: [
            {
              title: "Bảng điểm",
              url: "/dashboard/english/skills/score-table",
            },
          ],
        },
      ],
    },
    {
      title: "Kỹ năng Giao tiếp",
      navs: [
        {
          title: "Lớp học",
          url: "/dashboard/communication/classes/overview",
          icon: DoorOpen,
          isActive: true,
          items: [
            {
              title: "Tổng quan",
              url: "/dashboard/communication/classes/overview",
            },
            {
              title: "Giao tiếp Đám đông",
              url: "/dashboard/communication/classes/crowd-communication",
            },
            {
              title: "Giao tiếp Thu hút",
              url: "/dashboard/communication/classes/attraction-communication",
            },
          ],
        },
        {
          title: "Thành viên",
          url: "/dashboard/communication/members/list",
          icon: Users,
          items: [
            {
              title: "Danh sách",
              url: "/dashboard/communication/members/list",
            },
            {
              title: "Sinh nhật",
              url: "/dashboard/communication/members/birthday",
            },
          ],
        },
        {
          title: "Kỹ năng",
          url: "/dashboard/communication/skills/score-table",
          icon: Zap,
          items: [
            {
              title: "Bảng điểm",
              url: "/dashboard/communication/skills/score-table",
            },
          ],
        },
      ],
    },
  ],
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
};
