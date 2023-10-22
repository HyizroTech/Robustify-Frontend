import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Avatar,
} from "@mui/material";
import { Notifications, AccountCircle } from "@mui/icons-material";

import Logo from "../assets/Application-Logo.png";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ background: "#AABFE7" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={Logo}
            alt="Logo"
            style={{ width: "40px", marginRight: "10px" }}
          />
          <Typography variant="h6">Robustify</Typography>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton color="inherit">
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          <Avatar alt="User" src="/user-profile.jpg" />
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
