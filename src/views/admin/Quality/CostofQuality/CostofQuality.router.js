import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const CostofQuality = lazy(() => import("./components/CostofQuality"));

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<CostofQuality />} />
    </Routes>
  );
};

export default Router;
