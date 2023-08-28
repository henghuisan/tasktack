import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import TaskListItemDetails from "./TaskListItemDetails";
import { Task } from "../../app/interfaces";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { PriorityColors, selectTask } from "../../app/features/task/taskSlice";
import {
  deleteTask,
  fetchTasks,
  updateTask,
} from "../../app/features/task/taskActions";
import { grey } from "@mui/material/colors";
import { ListItemText } from "@mui/material";

interface TaskListProps {
  list: Array<Task> | [];
}

const TaskList: React.FC<TaskListProps> = ({ list }: TaskListProps) => {
  const dispatch = useAppDispatch();
  const { task: selectedTask } = useAppSelector((state) => state.task);

  const handleItemClick = (index: number, task: Task) => {
    dispatch(selectTask(task));
  };

  const handleDeleteTask = (id: string | undefined) => {
    id !== undefined &&
      dispatch(deleteTask(id)).then(() => {
        dispatch(fetchTasks());
      });
  };

  const handleTaskChecked = (task: Task) => {
    dispatch(updateTask({ ...task, completed: !task.completed })).then(() => {
      dispatch(fetchTasks());
    });
  };

  return (
    <Box
      sx={{
        px: 1,
      }}
    >
      <List>
        {list
          // .filter((task) => task.completed == completed)
          .map((task, index) => (
            <ListItem
              key={task.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              }
              disablePadding
              selected={selectedTask.id === task.id}
              sx={{
                "&:hover": {
                  backgroundColor: grey[100],
                },
              }}
            >
              <Checkbox
                size="small"
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
                onChange={() => handleTaskChecked(task)}
                checked={task.completed}
              />
              <ListItemButton
                disableRipple
                sx={{
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                  "&:active": {
                    backgroundColor: "transparent",
                  },
                }}
                onClick={() => handleItemClick(index, task)}
                dense
              >
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: 14,
                        color: task.title ? "inherits" : grey[400],
                      }}
                    >
                      {task.title ? task.title : "No Title"}
                    </Typography>
                  }
                />

                <TaskListItemDetails
                  category={task.category}
                  due_date={task.due_date}
                  subtasks={task.subtasks}
                />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Box>
  );
};

export default TaskList;
