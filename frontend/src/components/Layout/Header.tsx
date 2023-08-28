import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
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
  const [sortAnchorEl, setSortAnchorEl] = useState<HTMLButtonElement | null>(
    null
  );
  const [filterAnchorEl, setFilterAnchorEl] =
    useState<HTMLButtonElement | null>(null);
  const openSortPopover = Boolean(sortAnchorEl);
  const openFilterPopover = Boolean(filterAnchorEl);

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
            <IconButton
              color="inherit"
              aria-describedby="sortPopover"
              onClick={(e) => setSortAnchorEl(e.currentTarget)}
            >
              <SortIcon />
            </IconButton>
          </Tooltip>
          <Popover
            id="sortPopover"
            open={openSortPopover}
            anchorEl={sortAnchorEl}
            onClose={() => setSortAnchorEl(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography sx={{ p: 2, fontSize: "13px" }}>
              Sorry, this function is not ready yet.
            </Typography>
          </Popover>
          <Tooltip title="More" placement="bottom">
            <IconButton
              color="inherit"
              aria-describedby="filterPopover"
              onClick={(e) => setFilterAnchorEl(e.currentTarget)}
            >
              <MoreHorizIcon />
            </IconButton>
          </Tooltip>
          <Popover
            id="filterPopover"
            open={openFilterPopover}
            anchorEl={filterAnchorEl}
            onClose={() => setFilterAnchorEl(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography sx={{ p: 2, fontSize: "13px" }}>
              Sorry, this function is not ready yet.
            </Typography>
          </Popover>
        </>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
