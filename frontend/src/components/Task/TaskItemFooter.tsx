import React, { useState, createElement, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InputIcon from "@mui/icons-material/Input";
import InboxIcon from "@mui/icons-material/Inbox";
import DeleteIcon from "@mui/icons-material/Delete";
import grey from "@mui/material/colors/grey";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { ListAFromMenu as ListA } from "../List/lists";
import { ListBFromMenu as ListB } from "../List/lists";
import { MenuListItem } from "../../app/interfaces";
import {
  deleteTask,
  fetchTasks,
  updateTask,
} from "../../app/features/task/taskActions";

const TaskItemFooter: React.FC = () => {
  const [categoryMenuAnchorEl, setCategoryMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const openCategoryMenu = Boolean(categoryMenuAnchorEl);
  const { task } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();
  const [category, setCategory] = useState<MenuListItem>({} as MenuListItem);

  const handleCategoryMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setCategoryMenuAnchorEl(event.currentTarget);
  };

  const handleCategoryMenuClose = () => {
    setCategoryMenuAnchorEl(null);
  };

  const handleCategoryChange = (category: string) => {
    dispatch(updateTask({ ...task, category })).then(() => {
      dispatch(fetchTasks());
    });
    handleCategoryMenuClose();
  };

  const handleTaskDelete = () => {
    const { id } = task;
    id &&
      dispatch(deleteTask(id)).then(() => {
        dispatch(fetchTasks())
      });
  };

  useEffect(() => {
    const list = task.category === "Inbox" ? ListA : ListB;
    const item = list.find(({ key }) => key === task.category);
    item && setCategory({ ...item });
  }, [task, setCategory]);

  return (
    <Box
      sx={{
        display: "flex",
        my: 1,
        maxHeight: "10vh",
        justifyContent: "space-between",
      }}
    >
      <Tooltip title="Move To">
        <Button
          startIcon={<InputIcon sx={{ color: grey[500] }} />}
          sx={{ color: grey[600] }}
          onClick={handleCategoryMenuClick}
        >
          {category.key}
        </Button>
      </Tooltip>
      <Menu
        anchorEl={categoryMenuAnchorEl}
        open={openCategoryMenu}
        onClose={handleCategoryMenuClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <MenuItem
          selected={category.key === "Inbox"}
          onClick={() => {
            handleCategoryChange("Inbox");
          }}
        >
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
            selected={category.key === key}
            onClick={() => {
              handleCategoryChange(key);
            }}
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

      <Tooltip title="Delete Task">
        <IconButton aria-label="delete task" onClick={handleTaskDelete}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default TaskItemFooter;
