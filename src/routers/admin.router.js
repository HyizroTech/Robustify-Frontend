import { lazy } from "react";
import CostofQuality from "../views/admin/Quality/CostofQuality/components/CostofQuality";

const HomePage = lazy(() => import("../views/admin/Home/home.router"));
const UserSettings = lazy(() =>
  import("../views/admin/UserSettings/usersettings.router")
);
const Operations = lazy(() =>
  import("../views/admin/Operations/operations.router")
);
const Orders = lazy(() => import("../views/admin/Orders/orders.router"));

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
  {
    path: "/admin/orders/*",
    name: "orders",
    component: Orders,
  },
  {
    path: "/admin/CostofQuality/*",
    name: "Cost-of-Quality",
    component: CostofQuality,
  },
];
