import { lazy } from "react";

const HomePage = lazy(() => import("../views/Home/home.router"));

export const MainRoutes = [
  {
    path: "/home/*",
    name: "home",
    component: HomePage,
  },
];
