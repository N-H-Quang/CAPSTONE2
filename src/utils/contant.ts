import { MenuField } from "@/@type/movie.type";
import { LayoutDashboard, File, User, Monitor, PersonStanding, LogOutIcon } from "lucide-react";

export const ADMIN_MENU_ITEMS: MenuField[] = [
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

export const PROFILE_DROPDOWN_ITEMS = [
  {
    url: "/user/profile",
    title: "Profile",
    icon: PersonStanding,
    onlyIcon: false,
  },
  {
    url: "/user/logout",
    title: "Logout",
    icon: LogOutIcon,
    onlyIcon: false,
  },
];
