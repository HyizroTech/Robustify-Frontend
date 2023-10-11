import { lazy } from "react";

const LoginRouter = lazy(() => import("../views/Login/login.router"));

export const LoginRoutes = [
  {
    path: "/login/*",
    name: "login",
    component: LoginRouter,
  },
];
