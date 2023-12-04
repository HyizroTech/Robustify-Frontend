import { lazy } from "react";

const HomePage = lazy(() => import("../views/admin/Home/home.router"));
const UserSettings = lazy(() =>
  import("../views/admin/UserSettings/usersettings.router")
);
const Operations = lazy(() =>
  import("../views/admin/Operations/operations.router")
);

export const AdminRoutes = [
  {
    path: "/admin/*",
    name: "home",
    component: HomePage,
  },
  {
    path: "/admin/user-settings/*",
    name: "user-settings",
    component: UserSettings,
  },
  {
    path: "/admin/operations/*",
    name: "operations",
    component: Operations,
  },
];
