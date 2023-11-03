import React from "react";

const CreateUser = () => {
  const handleClick = () => {
    console.log("Clicked");
  };
  return (
    <div onClick={handleClick}>
      <h2>User Settings Modal</h2>
    </div>
  );
};

export default CreateUser;
