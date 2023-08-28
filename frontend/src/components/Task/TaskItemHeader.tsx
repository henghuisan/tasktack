import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FlagIcon from "@mui/icons-material/Flag";
import TaskItemHeaderDueDatePicker from "./TaskItemHeaderDueDatePicker";
import grey from "@mui/material/colors/grey";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { PriorityList } from "../List/lists";
import { PriorityColors } from "../../app/features/task/taskSlice";
import { fetchTasks, updateTask } from "../../app/features/task/taskActions";

const TaskItemHeader: React.FC = () => {
  const { task } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (itemName: string) => () => {
    dispatch(
      updateTask({
        ...task,
        priority: itemName,
      })
    ).then(() => {
      dispatch(fetchTasks());
    });
    handleClose();
  };

  const handleTaskChecked = () => {
    dispatch(
      updateTask({
        ...task,
        completed: !task.completed,
      })
    ).then(() => {
      // dispatch(selectTask({} as Task));
      dispatch(fetchTasks());
    });
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          bgcolor: "background.paper",
          color: grey[600],
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <InputBase
            fullWidth
            inputProps={{ "aria-label": "check, change due date or priority" }}
            startAdornment={
              <InputAdornment position="start">
                <Checkbox
                  size="small"
                  checked={task.completed}
                  sx={{
                    color:
                      PriorityColors[task.priority] || PriorityColors.default,
                    "&.Mui-checked": {
                      color:
                        PriorityColors[task.priority] || PriorityColors.default, // Color when checked
                    },
                    "&.Mui-checked.MuiCheckbox-root": {
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    },
                    "&.Mui-checked.MuiCheckbox-root.Mui-disabled": {
                      color:
                        PriorityColors[task.priority] || PriorityColors.default, // Color when checked and disabled
                    },
                    "&.Mui-checked.MuiCheckbox-root.Mui-disabled:hover": {
                      backgroundColor:
                        PriorityColors[task.priority] || PriorityColors.default, // Background color when checked, disabled, and hovered
                    },
                  }}
                  onChange={handleTaskChecked}
                />
                <TaskItemHeaderDueDatePicker />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <Tooltip title="Priority">
                  <IconButton
                    aria-label="priority"
                    onClick={handleClick}
                    size="small"
                    sx={{
                      ml: 2,
                      color:
                        PriorityColors[task.priority] || PriorityColors.default,
                    }}
                    aria-controls={open ? "priority-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <FlagIcon />
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  id="priority-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                >
                  {PriorityList.map(({ name, key, color }) => (
                    <MenuItem
                      key={key}
                      onClick={handleMenuItemClick(name)}
                      selected={name === task.priority}
                    >
                      <ListItemIcon>
                        <FlagIcon sx={{ color }} />
                      </ListItemIcon>
                      <Typography variant="body2" sx={{ fontSize: 14 }}>
                        {name}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </InputAdornment>
            }
          />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default TaskItemHeader;
