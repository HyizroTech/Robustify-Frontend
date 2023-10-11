import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const LoginPage = lazy(() => import("./Components/Login"));

const Router = () => {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
    </Routes>
  );
};

export default Router;
