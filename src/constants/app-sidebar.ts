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
          url: "/dashboard/12345/classes/overview",
          icon: DoorOpen,
          isActive: true,
          items: [
            {
              title: "Tổng quan",
              url: "/dashboard/12345/classes/overview",
            },
            {
              title: "Phiên dịch",
              url: "/dashboard/12345/classes/translation",
            },
            {
              title: "AV chủ nhật",
              url: "/dashboard/12345/classes/sunday-english",
            },
            {
              title: "AV thứ 5",
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
          title: "Kỹ năng",
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
      title: "Kỹ năng Giao tiếp",
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
              title: "Giao tiếp Đám đông",
              url: "/dashboard/56789/classes/crowd-communication",
            },
            {
              title: "Giao tiếp Thu hút",
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
          title: "Kỹ năng",
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
