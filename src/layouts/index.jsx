import React from "react";
import { Route, Routes } from "react-router-dom";

// Layouts
import LoginLayout from "./login";

//Routes
import { MainRoutes } from "../routers/main.router";
import MainLayout from "./main";

const Layout = () => {
  const isAuth = false;
  console.log("This is the Index Layout");
  return (
    <>
      {isAuth ? (
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
