import React from "react";
import { Route, Routes, useLocation, useMatch } from "react-router-dom";

// Layouts
import LoginLayout from "./login";
import MainLayout from "./main";

//Routes
import { MainRoutes } from "../routers/main.router";
import { LoginRoutes } from "../routers";

const isAuthRoute = () =>
  !!LoginRoutes.find((route) => {
    return useMatch(route.path);
  });

const Layout = () => {
  const location = useLocation();
  const isAuthPath = isAuthRoute(location.pathname);
  return (
    <>
      {isAuthPath ? (
        <LoginLayout />
      ) : (
        <Routes>
          {MainRoutes.map((route, index) => {
            return (
              <Route
                path={route.path}
                exact={true}
                key={`${index}-${route.name}`}
                element={<MainLayout Component={route?.component} />}
              />
            );
          })}
        </Routes>
      )}
    </>
  );
};

export default Layout;
