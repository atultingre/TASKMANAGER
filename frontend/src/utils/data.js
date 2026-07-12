import {
  LuLayoutDashboard,
  LuUsers,
  LuClipboardCheck,
  LuSquarePlus,
  LuLogOut,
} from "react-icons/lu";

export const SIDE_MENU_DATA = [
  {
    id: 1,
    label: "Dashboard",
    icon: LuLayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    id: 3,
    label: "Manage Tasks",
    icon: LuClipboardCheck,
    path: "/admin/tasks",
  },
  {
    id: 4,
    label: "Create Task",
    icon: LuSquarePlus,
    path: "/admin/create-task",
  },
  { id: 2, label: "Team Members", icon: LuUsers, path: "/admin/users" },
  { id: 5, label: "Logout", icon: LuLogOut, path: "logout" },
];

export const SIDE_MENU_USER_DATA = [
  {
    id: 1,
    label: "Dashboard",
    icon: LuLayoutDashboard,
    path: "/user/dashboard",
  },
  {
    id: 2,
    label: "My Tasks",
    icon: LuUsers,
    path: "/user/tasks",
  },
  { id: 3, label: "Logout", icon: LuLogOut, path: "logout" },
];

export const PRIORITY_DATA = [
  { id: 1, label: "Low", value: "Low" },
  { id: 2, label: "Medium", value: "Medium" },
  { id: 3, label: "High", value: "High" },
];

export const STATUS_DATA = [
  { id: 1, label: "Pending", value: "Pending" },
  { id: 2, label: "In Progress", value: "In Progress" },
  { id: 3, label: "Completed", value: "Completed" },
];
