import {
  Activity,
  BarChart3,
  BookOpen,
  FileText,
  GraduationCap,
  Home,
  TrendingUp,
  UserCheck,
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
      name: "Members",
      url: "/admin/members",
      icon: Users,
    },
    {
      name: "Log Activity",
      url: "/log-activity",
      icon: Activity,
    },
    {
      name: "Engagement Settings",
      url: "/admin/engagement/settings",
      icon: BarChart3,
    },
  ],
  navMain: [
    {
      title: "Administration",
      navs: [
        {
          title: "Knowledge Sharing",
          url: "/knowledge",
          icon: FileText,
          items: [
            {
              title: "Posts",
              url: "/knowledge",
            },
            {
              title: "New Post",
              url: "/knowledge/posts/new",
            },
          ],
        },
        {
          title: "Learning & Development",
          url: "/admin/ld/courses",
          icon: GraduationCap,
          items: [
            {
              title: "Courses",
              url: "/admin/ld/courses",
            },
            {
              title: "Create Course",
              url: "/admin/ld/courses/new",
            },
          ],
        },
        {
          title: "Analytics",
          url: "/admin/analytics",
          icon: BarChart3,
          items: [
            {
              title: "Growth",
              url: "/admin/analytics/growth",
            },
            {
              title: "Learning",
              url: "/admin/analytics/learning",
            },
          ],
        },
      ],
    },
  ],
};
