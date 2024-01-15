import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const PurchaseHistoryPage = lazy(() => import("./components/PurchaseHistory"));
const StockPage = lazy(() => import("./components/Stock"));

const Router = () => {
  return (
    <Routes>
      <Route path="/purchase-history" element={<PurchaseHistoryPage />} />
      <Route path="/stock" element={<StockPage />} />
    </Routes>
  );
};

export default Router;
