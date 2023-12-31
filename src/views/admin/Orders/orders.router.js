import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const OrdersListPage = lazy(() => import("./components/OrdersList"));

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<OrdersListPage />} />
    </Routes>
  );
};

export default Router;
