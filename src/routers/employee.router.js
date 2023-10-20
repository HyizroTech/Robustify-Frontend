import { lazy } from "react";

const HomePage = lazy(() => import("../views/employee/home/home.router"));

export const EmployeeRoutes = [
  {
    path: "/employee*",
    name: "employeehome",
    component: HomePage,
  },
];
