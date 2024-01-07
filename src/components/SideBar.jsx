import React, { useContext, useState } from "react";

import { UserContext } from "../contexts/user.context";

// Hooks
import { useNavigate } from "react-router-dom";

// MUI
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import {
  SpeedOutlined,
  AssessmentOutlined,
  NoteAddOutlined,
  WidgetsOutlined,
  ShowChartOutlined,
  PercentOutlined,
  SettingsOutlined,
  AssignmentOutlined,
  SentimentDissatisfiedOutlined,
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
      icon: <SpeedOutlined />,
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
      icon: <NoteAddOutlined />,
      onclick: () => navigate("/admin/orders"),
    },
    {
      id: 4,
      text: "Inventory",
      icon: <WidgetsOutlined />,
      sublinks: [
        { id: 1, text: "Stock", onclick: () => navigate("") },
        { id: 2, text: "Purchase History", onclick: () => navigate("") },
      ],
    },
    {
      id: 5,
      text: "Quality",
      icon: <ShowChartOutlined />,
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
      icon: <PercentOutlined />,
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
        height: "100%",
        "& .MuiDrawer-paper": {
          position: "static",
          background: "linear-gradient(180deg, #A9BEE6 6.59%, #5D367F 127%);",
        },
      }}
    >
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
              <ListItemText primary={link.text} />
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
