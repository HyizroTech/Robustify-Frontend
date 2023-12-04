import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const UtilizationPage = lazy(() => import("./components/Utilization"));
const PlaceNewOrderPage = lazy(() => import("./components/PlaceOrder"));
const PlaceNewDocumentPage = lazy(() => import("./components/PlaceDocument"));

const Router = () => {
  return (
    <Routes>
      <Route path="/utilization" element={<UtilizationPage />} />
      <Route path="/place-order" element={<PlaceNewOrderPage />} />
      <Route path="/place-document" element={<PlaceNewDocumentPage />} />
    </Routes>
  );
};

export default Router;
