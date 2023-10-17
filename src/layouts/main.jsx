import React, { Suspense } from "react";
import SideBar from "../components/SideBar";
import Navbar from "../components/Navbar";

const MainLayout = ({ Component }) => {
  console.log("In the Main Layout");

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar />
      <div style={{ display: "flex", flex: 1 }}>
        <SideBar />
        <div style={{ flex: 1, padding: "1rem" }}>
          <Suspense>
            <Component />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
