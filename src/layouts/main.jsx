import React, { Suspense, useContext, useEffect } from "react";

// Components
import SideBar from "../components/SideBar";
import Navbar from "../components/Navbar";

// Contexts
import { UserContext } from "../contexts";

// Services
import { AuthenticationService } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const MainLayout = ({ Component }) => {
  const navigate = useNavigate();

  const { setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    const isLoggedIn = AuthenticationService.isLoggedIn();
    isLoggedIn
      ? setCurrentUser(AuthenticationService.getCurrentUser())
      : navigate(
          `/login?returnUrl=${encodeURIComponent(
            window.location.href.replace(window.location.origin, "")
          )}`
        );
  }, [navigate, setCurrentUser]);

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
