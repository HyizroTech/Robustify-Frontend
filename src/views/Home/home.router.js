import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("./components/Home"));

const Router = () => {
  console.log("This is the home routes");
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};

export default Router;
