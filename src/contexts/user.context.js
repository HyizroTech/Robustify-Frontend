import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [userRole, setUserRole] = useState("");

  const value = {
    currentUser,
    setCurrentUser,
    userRole,
    setUserRole,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
