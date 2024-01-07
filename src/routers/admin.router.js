import { lazy } from "react";

const HomePage = lazy(() => import("../views/admin/Home/home.router"));
const UserSettings = lazy(() =>
  import("../views/admin/UserSettings/usersettings.router")
);
const Operations = lazy(() =>
  import("../views/admin/Operations/operations.router")
);
const Orders = lazy(() => import("../views/admin/Orders/orders.router"));
const CostOfQuality = lazy(()=> import("../views/admin/Quality/CostofQuality/CostofQuality.router"))

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
    path: "/admin/CostOfQuality/*",
    name: "Cost-of-Quality",
    component: CostOfQuality,
  },
];
