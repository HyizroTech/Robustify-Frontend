import React, { Suspense } from "react";

// Components
import SideBar from "../components/SideBar";
import Navbar from "../components/Navbar";
import LoadingFallback from "../components/LoadingFallback";

const MainLayout = ({ Component }) => {
  return (
    <div style={{ display: "flex", height: "100vh", gap: "13rem" }}>
      <SideBar />
      <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
        <Navbar />
        <div style={{ flex: 1, padding: "1rem" }}>
          <Suspense fallback={<LoadingFallback />}>
            <Component />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
