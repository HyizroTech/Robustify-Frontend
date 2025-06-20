import React from "react";

const LoadingFallback = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h2>Loading...</h2>
    </div>
  );
};

export default LoadingFallback;
