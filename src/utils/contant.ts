import { MenuField } from "@/@type/movie.type";
import { LayoutDashboard, File, User, Monitor } from "lucide-react";

export const menuItems: MenuField[] = [
  {
    url: "/admin/dashboard",
    title: "Dashboard",
    icon: LayoutDashboard,
    onlyIcon: false,
  },
  {
    url: "/admin/users",
    title: "Users",
    icon: User,
    onlyIcon: false,
  },
  {
    url: "/admin/movies",
    title: "Movies",
    icon: File,
    onlyIcon: false,
    childs: [
      {
        url: "/admin/movies/list",
        title: "Movie List",
        icon: File,
        onlyIcon: false,
      },
      {
        url: "/admin/movies/add",
        title: "Add Movie",
        icon: File,
        onlyIcon: false,
      },
    ],
  },
  {
    url: "/admin/showTimes",
    title: "ShowTime",
    icon: Monitor,
    onlyIcon: false,
  },
];
