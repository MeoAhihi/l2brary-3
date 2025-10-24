import {
  Activity,
  BarChart3,
  BookOpen,
  GraduationCap,
  ShieldCheck,
  Table,
  Users,
} from "lucide-react";

export const adminSidebar = {
  user: {
    name: "Vĩ Phong lý",
    email: "viphongly@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "L2brary",
      logo: BookOpen,
      plan: "Learning Platform",
    },
  ],
  projects: [
    {
      name: "Bảng điều khiển",
      url: "/admin/dashboard",
      icon: BarChart3,
    },
    {
      name: "Thành viên",
      url: "/admin/members",
      icon: Users,
    },
    {
      name: "Lớp học",
      url: "/admin/ld/courses",
      icon: GraduationCap,
    },

    {
      name: "Ghi nhận hoạt động",
      url: "/log-activity",
      icon: Activity,
    },
    {
      name: "Cấu hình hoạt động",
      url: "/admin/engagement/settings",
      icon: Table,
    },
    {
      name: "Bảo mật",
      url: "/admin/security",
      icon: ShieldCheck,
    },
  ],
  navMain: [
    //   {
    //     title: "Administration",
    //     navs: [
    //       {
    //         title: "Knowledge Sharing",
    //         url: "/knowledge",
    //         icon: FileText,
    //         items: [
    //           {
    //             title: "Posts",
    //             url: "/knowledge",
    //           },
    //           {
    //             title: "New Post",
    //             url: "/knowledge/posts/new",
    //           },
    //         ],
    //       },
    //       {
    //         title: "Learning & Development",
    //         url: "/admin/ld/courses",
    //         icon: GraduationCap,
    //         items: [
    //           {
    //             title: "Courses",
    //             url: "/admin/ld/courses",
    //           },
    //           {
    //             title: "Create Course",
    //             url: "/admin/ld/courses/new",
    //           },
    //         ],
    //       },
    //       {
    //         title: "Analytics",
    //         url: "/admin/analytics",
    //         icon: BarChart3,
    //         items: [
    //           {
    //             title: "Growth",
    //             url: "/admin/analytics/growth",
    //           },
    //           {
    //             title: "Learning",
    //             url: "/admin/analytics/learning",
    //           },
    //         ],
    //       },
    //     ],
    //   },
  ],
};
