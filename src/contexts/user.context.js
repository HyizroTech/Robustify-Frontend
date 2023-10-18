import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [loggedInId, setLoggedInId] = useState(null);

  const value = {
    currentUser,
    setCurrentUser,
    loggedInId,
    setLoggedInId,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
