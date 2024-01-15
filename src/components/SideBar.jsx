import React, { useContext, useState } from "react";

import { UserContext } from "../contexts/user.context";

// Hooks
import { useNavigate } from "react-router-dom";

import Logo from "../assets/Application-Logo.png";

// MUI
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
} from "@mui/material";
import {
  AssessmentOutlined,
  SettingsOutlined,
  AssignmentOutlined,
  SentimentDissatisfiedOutlined,
  AppsOutlined,
  MenuBookOutlined,
  InboxOutlined,
  CheckBoxOutlined,
  RequestQuoteOutlined,
} from "@mui/icons-material";

const SideBar = () => {
  const navigate = useNavigate();
  const [openSublinks, setOpenSublinks] = useState({});

  const { userRole } = useContext(UserContext);

  const toggleSublinks = (linkText) => {
    setOpenSublinks((prevOpenSublinks) => ({
      ...prevOpenSublinks,
      [linkText]: !prevOpenSublinks[linkText],
    }));
  };

  const AdminSideBar = [
    {
      id: 1,
      text: "Dashboard",
      icon: <AppsOutlined />,
      onclick: () => navigate("/admin"),
    },
    {
      id: 2,
      text: "Operations",
      icon: <AssessmentOutlined />,
      sublinks: [
        {
          id: 1,
          text: "Utilization",
          onclick: () => navigate("/admin/operations/utilization"),
        },
        {
          id: 2,
          text: "Place New Order",
          onclick: () => navigate("/admin/operations/place-order"),
        },
        {
          id: 3,
          text: "Place New Document",
          onclick: () => navigate("/admin/operations/place-document"),
        },
      ],
    },
    {
      id: 3,
      text: "Orders",
      icon: <MenuBookOutlined />,
      onclick: () => navigate("/admin/orders"),
    },
    {
      id: 4,
      text: "Inventory",
      icon: <InboxOutlined />,
      sublinks: [
        {
          id: 1,
          text: "Stock",
          onclick: () => navigate("/admin/inventory/stock"),
        },
        {
          id: 2,
          text: "Purchase History",
          onclick: () => navigate("/admin/inventory/purchase-history"),
        },
      ],
    },
    {
      id: 5,
      text: "Quality",
      icon: <CheckBoxOutlined />,
      sublinks: [
        {
          id: 1,
          text: "Complaints",
          onclick: () => navigate(""),
        },
        {
          id: 2,
          text: "COQ",
          onclick: () => navigate("/admin/CostOfQuality/coq"),
        },
      ],
    },
    {
      id: 6,
      text: "Finance",
      icon: <RequestQuoteOutlined />,
      sublinks: [
        { id: 1, text: "Sales", onclick: () => navigate("") },
        { id: 2, text: "Invoices", onclick: () => navigate("") },
      ],
    },
    {
      id: 7,
      text: "User Settings",
      icon: <SettingsOutlined />,
      onclick: () => navigate("/admin/user-settings"),
    },
  ];

  const EmployeeSideBar = [
    {
      id: 1,
      text: "Tasks",
      icon: <AssignmentOutlined />,
      onclick: () => navigate(""),
    },

    {
      id: 2,
      text: "Complaints",
      icon: <SentimentDissatisfiedOutlined />,
      onclick: () => navigate(""),
    },
  ];

  const SideBarLinks = userRole === "Admin" ? AdminSideBar : EmployeeSideBar;

  return (
    <Drawer
      variant="permanent"
      sx={{
        height: "100vh",
        "& .MuiDrawer-paper": {
          position: "fixed",
          background: "linear-gradient(180deg, #AABFE7 0%, #6F5697 100%);",
          alignItems: "center",
          paddingTop: "1rem",
          gap: "2rem",
        },
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={Logo}
          alt="Logo"
          style={{ width: "40px", marginRight: "10px" }}
        />
        <Typography
          variant="h6"
          sx={{ fontFamily: "Archivo Narrow", fontWeight: "700" }}
        >
          Robustify
        </Typography>
      </div>
      <List
        sx={{
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {SideBarLinks.map((link) => (
          <ListItem
            key={link.id}
            sx={{ flexDirection: "column", width: "100%" }}
          >
            <ListItemButton
              sx={{ width: "100%" }}
              onClick={() =>
                link.sublinks ? toggleSublinks(link.text) : link.onclick()
              }
            >
              <ListItemIcon>{link.icon}</ListItemIcon>
              <ListItemText
                primary={link.text}
                sx={{ fontSize: "1.25rem", fontFamily: "Archivo Narrow" }}
              />
            </ListItemButton>
            {link.sublinks && (
              <Collapse
                in={openSublinks[link.text]}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {link.sublinks.map((sublink) => (
                    <ListItemButton
                      sx={{ width: "100%" }}
                      onClick={sublink.onclick}
                      key={`${sublink.id}-${link.text}`}
                    >
                      <ListItemText primary={sublink.text} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideBar;
