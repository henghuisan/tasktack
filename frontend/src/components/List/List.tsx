import React, { useState, createElement, useEffect } from "react";
import MuiList from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { MenuListItem } from "../../app/interfaces";
import { useNavigate, useLocation } from "react-router-dom";

interface ListProps {
  name: string;
  list: Array<MenuListItem>;
  style?: object;
}

const List: React.FC<ListProps> = ({ name, list, style }: ListProps) => {
  const [activeSidebarItem, setActiveSidebarItem] = useState<string>("tasks");
  const [activeMenuItem, setActiveMenuItem] = useState<string>("all");
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  let location = useLocation();

  const handleSidebarClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    key: string
  ) => {
    if (key !== "tasks") {
      setAnchorEl(e.currentTarget);
    } else {
      navigate("/tasks/all", { replace: true });
    }
  };

  const handleMenuClick = (key: string) => {
    setActiveMenuItem(key);
    navigate(`/tasks/${key}`, { replace: true });
  };

  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    const sidebarItem = pathSegments[pathSegments.length - 2];
    const menuItem = pathSegments[pathSegments.length - 1];
    setActiveSidebarItem(sidebarItem);
    setActiveMenuItem(menuItem);
  }, [setActiveSidebarItem, setActiveMenuItem, location]);

  return (
    <MuiList style={style}>
      {list.map(({ title, key, icon }) =>
        name === "sidebar" ? (
          <ListItem
            key={key}
            disablePadding
          >
            <>
              <Tooltip title={title} placement="right">
                <IconButton
                  aria-describedby={`${key}Popover`}
                  onClick={(e) => handleSidebarClick(e, key)}
                  disableFocusRipple
                  disableTouchRipple
                  sx={{
                    color: activeSidebarItem === key ? "#1976D2" : "#e0e0e0",
                    "&:hover": {
                      color: activeSidebarItem === key ? "#1976D2" : "#A9b1b1",
                    },
                  }}
                >
                  {createElement(icon)}
                </IconButton>
              </Tooltip>
              {open && (
                <Popover
                  id={`${key}Popover`}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={() => setAnchorEl(null)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Typography sx={{ p: 2, fontSize: "13px" }}>
                    Sorry, this function is not ready yet.
                  </Typography>
                </Popover>
              )}
            </>
          </ListItem>
        ) : (
          <ListItem key={key} disablePadding selected={activeMenuItem === key}>
            <ListItemButton onClick={() => handleMenuClick(key)}>
              <ListItemIcon sx={{ minWidth: "auto", mr: 2 }}>
                {createElement(icon, { fontSize: "small" } as object)}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body2" sx={{ fontSize: 13 }}>
                    {title}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        )
      )}
    </MuiList>
  );
};

export default List;
