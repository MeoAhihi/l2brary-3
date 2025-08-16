import {
  Activity,
  BarChart3,
  BookOpen,
  FileText,
  GraduationCap,
  Home,
  TrendingUp,
  UserCheck,
  Users
} from "lucide-react";

export const appSidebar = {
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
  navMain: [
    {
      title: "Public Access",
      navs: [
        {
          title: "Courses",
          url: "/courses",
          icon: GraduationCap,
          items: [
            {
              title: "Browse Courses",
              url: "/courses",
            },
          ],
        },
        {
          title: "Knowledge Hub",
          url: "/knowledge",
          icon: FileText,
          items: [
            {
              title: "Browse Posts",
              url: "/knowledge",
            },
            {
              title: "Create Post",
              url: "/knowledge/posts/new",
            },
          ],
        },
      ],
    },
    {
      title: "Member Dashboard",
      navs: [
        {
          title: "My Profile",
          url: "/profile",
          icon: UserCheck,
          items: [
            {
              title: "View Profile",
              url: "/profile",
            },
          ],
        },
        {
          title: "My Progress",
          url: "/my-progress/performance",
          icon: TrendingUp,
          items: [
            {
              title: "Performance",
              url: "/my-progress/performance",
            },
          ],
        },
        {
          title: "Log Activity",
          url: "/log-activity",
          icon: Activity,
          items: [
            {
              title: "Log Activity",
              url: "/log-activity",
            },
          ],
        },
      ],
    },
    {
      title: "Administration",
      navs: [
        {
          title: "Members",
          url: "/admin/members",
          icon: Users,
          items: [
            {
              title: "All Members",
              url: "/admin/members",
            },
          ],
        },
        {
          title: "Learning & Development",
          url: "/admin/ld/courses/new",
          icon: GraduationCap,
          items: [
            {
              title: "Create Course",
              url: "/admin/ld/courses/new",
            },
          ],
        },
        {
          title: "Engagement",
          url: "/admin/engagement/settings",
          icon: Activity,
          items: [
            {
              title: "Activity Settings",
              url: "/admin/engagement/settings",
            },
          ],
        },
        {
          title: "Analytics",
          url: "/admin/analytics/growth",
          icon: BarChart3,
          items: [
            {
              title: "Growth Dashboard",
              url: "/admin/analytics/growth",
            },
            {
              title: "Learning Dashboard",
              url: "/admin/analytics/learning",
            },
          ],
        },
      ],
    },
  ],
  projects: [
    {
      name: "Home",
      url: "/",
      icon: Home,
    },
    {
      name: "Courses",
      url: "/courses",
      icon: GraduationCap,
    },
    {
      name: "Knowledge",
      url: "/knowledge",
      icon: FileText,
    },
    {
      name: "Profile",
      url: "/profile",
      icon: UserCheck,
    },
  ],
};
