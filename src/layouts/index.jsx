import React, { useContext, useEffect } from "react";
import {
  Route,
  Routes,
  useLocation,
  useMatch,
  useNavigate,
} from "react-router-dom";

import { UserContext } from "../contexts/user.context";

// Layouts
import LoginLayout from "./login";
import MainLayout from "./main";

//Routes
import { AdminRoutes } from "../routers/admin.router";
import { EmployeeRoutes } from "../routers/employee.router";
import { LoginRoutes } from "../routers";

// Services
import { AuthenticationService } from "../services/auth.service";

const isAuthRoute = () =>
  !!LoginRoutes.find((route) => {
    return useMatch(route.path);
  });

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPath = isAuthRoute(location.pathname);

  const { setCurrentUser, userRole, setUserRole } = useContext(UserContext);

  useEffect(() => {
    const isLoggedIn = AuthenticationService.isLoggedIn();
    if (isLoggedIn) {
      const { user } = AuthenticationService.getCurrentUser();
      setCurrentUser(user);
      setUserRole(user?.role);
    } else {
      navigate(`/login`);
    }

    if (isLoggedIn && location.pathname === "/") {
      navigate(`/${userRole.toLowerCase()}`);
    }
  }, [location.pathname, navigate, setCurrentUser, setUserRole, userRole]);

  const renderRoutes = (routes) => {
    return routes.map((route, index) => (
      <Route
        path={route.path}
        exact={true}
        key={`${index}-${route.name}`}
        element={<MainLayout Component={route?.component} />}
      />
    ));
  };

  return (
    <>
      {isAuthPath ? (
        <LoginLayout />
      ) : (
        <Routes>
          {userRole === "Admin" && renderRoutes(AdminRoutes)}
          {userRole === "Employee" && renderRoutes(EmployeeRoutes)}
        </Routes>
      )}
    </>
  );
};

export default Layout;
