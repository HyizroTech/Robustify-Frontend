import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const UserSettingsPage = lazy(() => import("./components/UserSettings"));

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<UserSettingsPage />} />
    </Routes>
  );
};

export default Router;
