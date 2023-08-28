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
        width: 55,
        flexShrink: 0,
        zIndex: theme.zIndex.drawer,
        "& .MuiDrawer-paper": {
          width: 55,
          boxSizing: "border-box",
          overflowX: "hidden", // Hide horizontal overflow
          bgcolor: "#263238",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Avatar
        alt="avatar"
        sx={{ width: 28, height: 28, mx: 2, mt: 2 }}
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
