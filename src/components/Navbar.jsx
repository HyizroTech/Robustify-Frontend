import React from "react";
import { AppBar, Toolbar, IconButton, Badge, Avatar } from "@mui/material";
import { Notifications, AccountCircle } from "@mui/icons-material";

const Navbar = () => {
  return (
    <AppBar
      position="sticky"
      sx={{
        background: "#DFE1ED",
        width: "100%",
        zIndex: "-1",
        boxShadow: "0px 4px 15px 0px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
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
