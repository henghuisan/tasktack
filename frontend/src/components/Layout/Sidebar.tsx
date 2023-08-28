import React from "react";
import { useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import Avatar from "@mui/material/Avatar";
import List from "../List/List";
import { ListAFromSidebar as ListA } from "../List/lists";
import { ListBFromSidebar as ListB } from "../List/lists";

const Sidebar: React.FC = () => {
  const theme = useTheme();

  return (
    <Drawer
      sx={{
        width: 60,
        zIndex: theme.zIndex.drawer,
        display: "flex", // Use flex display
        flexDirection: "column", // Stack children vertically
        justifyContent: "center", // Center content vertically
        alignItems: "center", // Center content horizontally
        "& .MuiDrawer-paper": {
          width: 60,
          boxSizing: "border-box",
          overflowX: "hidden", // Hide horizontal overflow
          bgcolor: "#263238",
          display: "flex", // Use flex display for internal content
          flexDirection: "column", // Stack internal content vertically
          alignItems: "center", // Center internal content horizontally
          py: 2,
        },
        // "& .MuiListItem-root:hover": {
        //   backgroundColor: "#1976D2", // Slightly darkened shade of your primary color
        // },
      }}
      variant="permanent"
      anchor="left"
    >
      <Avatar
        alt="avatar"
        sx={{ width: 32, height: 32 }}
        src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1600"
      />
      <List name="sidebar" list={ListA} />
      <List
        name="sidebar"
        list={ListB}
        style={{ position: "fixed", bottom: -10 }}
      />
    </Drawer>
  );
};

export default Sidebar;
