import React, { useState, createElement, useEffect } from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FlagIcon from "@mui/icons-material/Flag";
import InputIcon from "@mui/icons-material/Input";
import InboxIcon from "@mui/icons-material/Inbox";
import blue from "@mui/material/colors/blue";
import { ListBFromMenu as ListB, PriorityList } from "../List/lists";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { setCategory, setPriority } from "../../app/features/task/taskSlice";

const SubMenu: React.FC = () => {
  const [submenuAnchorEl, setSubmenuAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const openSubmenu = Boolean(submenuAnchorEl);
  const [selectedItem, setSelectedItem] = useState<string>("Inbox");
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.task);

  const handleSubmenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setSubmenuAnchorEl(event.currentTarget);
  };

  const handleSubmenuClose = () => {
    setSubmenuAnchorEl(null);
  };

  const handleMenuItemClick = (itemName: string) => () => {
    setSelectedItem(itemName);
    dispatch(setCategory(itemName));
    handleSubmenuClose();
  };

  useEffect(() => {
    if (loading === "succeeded" || loading === "failed") {
      setSelectedItem("Inbox");
    }
  }, [loading, setSelectedItem]);

  return (
    <>
      <MenuItem onClick={handleSubmenuClick}>
        <ListItemIcon>
          <InputIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography variant="body2" sx={{ fontSize: 13 }}>
              Add to <b>{selectedItem[0].toUpperCase() + selectedItem.slice(1)}</b>
            </Typography>
          }
        />
      </MenuItem>
      <Menu
        anchorEl={submenuAnchorEl}
        open={openSubmenu}
        onClose={handleSubmenuClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <MenuItem selected={selectedItem === "Inbox"}>
          <ListItemIcon>
            <InboxIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body2" sx={{ fontSize: 13 }}>
                Inbox
              </Typography>
            }
          />
        </MenuItem>
        {ListB.map(({ title, key, icon }) => (
          <MenuItem
            key={key}
            onClick={handleMenuItemClick(key)}
            selected={selectedItem === key}
          >
            <ListItemIcon>
              {createElement(icon, { fontSize: "small" } as object)}
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body2" sx={{ fontSize: 13 }}>
                  {title}
                </Typography>
              }
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

const TaskFormDropDown: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selectedPriority, setSelectedPriority] = useState<string | undefined>(
    "None"
  );
  const [mainAnchorEl, setMainAnchorEl] = useState<null | HTMLElement>(null);
  const openMain = Boolean(mainAnchorEl);

  const handleMainClick = (event: React.MouseEvent<HTMLElement>) => {
    setMainAnchorEl(event.currentTarget);
  };

  const handleMainClose = () => {
    setMainAnchorEl(null);
  };

  const handlePriorityClick = (name: string) => () => {
    setSelectedPriority(name);
    dispatch(setPriority(name));
    handleMainClose();
  };

  return (
    <>
      <IconButton
        onClick={handleMainClick}
        size="small"
        aria-controls={openMain ? "main-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openMain ? "true" : undefined}
      >
        <KeyboardArrowDownIcon />
      </IconButton>
      <Menu
        anchorEl={mainAnchorEl}
        id="main-menu"
        open={openMain}
        onClose={handleMainClose}
      >
        <MenuItem
          sx={{
            display: "flex",
            flexDirection: "column",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <Typography variant="caption" display="block" gutterBottom>
            Priority
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {PriorityList.map(({ name, color }, index) => (
              <IconButton
                key={index}
                sx={{
                  color,
                  bgcolor: selectedPriority === name ? blue[50] : "transparent",
                }}
                onClick={handlePriorityClick(name)}
              >
                <FlagIcon />
              </IconButton>
            ))}
          </Box>
        </MenuItem>
        <Divider />
        <SubMenu />
      </Menu>
    </>
  );
};

export default TaskFormDropDown;
