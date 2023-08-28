import React from "react";
import Box from "@mui/material/Box";
import Sidebar from "../Layout/Sidebar";
import Menu from "../Layout/Menu";

const MainPage: React.FC = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Menu />
    </Box>
  );
};

export default MainPage;
