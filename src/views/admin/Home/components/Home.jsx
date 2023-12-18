import React from "react";
import OrderHistogram from "./OrderHistogram";
import AverageUtilization from "./AverageUtilization";

const Home = () => {
  return (
    <>
      <div>Dashboard</div>
      <OrderHistogram />
      <AverageUtilization />
    </>
  );
};

export default Home;
