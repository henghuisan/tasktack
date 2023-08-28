import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import SortIcon from "@mui/icons-material/Sort";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import grey from "@mui/material/colors/grey";

interface HeaderProps {
  handleMenu: () => void;
  open: boolean;
}

const Header: React.FC<HeaderProps> = ({ handleMenu, open }: HeaderProps) => {
  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "background.paper",
        color: grey[600],
        boxShadow: "none",
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open menu"
          onClick={handleMenu}
        >
          {open ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>
        <Typography
          variant="h5"
          color="black"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          All
        </Typography>
        <>
          <Tooltip title="Sort" placement="bottom">
            <IconButton color="inherit">
              <SortIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="More" placement="bottom">
            <IconButton color="inherit">
              <MoreHorizIcon />
            </IconButton>
          </Tooltip>
        </>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
