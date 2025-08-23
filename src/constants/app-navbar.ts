import { BookOpen, GraduationCap, Home, Info, Mail } from "lucide-react";

export const appNavbar = [
  {
    title: "Home",
    url: "/",
    icon: Home,
    public: true,
  },
  {
    title: "About",
    url: "/about",
    icon: Info,
    public: true,
  },
  {
    title: "Courses",
    url: "/courses",
    icon: GraduationCap,
    public: true,
  },
  {
    title: "Knowledge",
    url: "/knowledge",
    icon: BookOpen,
    public: true,
  },
];
