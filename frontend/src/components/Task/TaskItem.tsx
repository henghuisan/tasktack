import React, { useEffect, useState } from "react";
import InputBase from "@mui/material/InputBase";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import SubTaskList from "../Subtask/SubTaskList";
import TaskItemFooter from "./TaskItemFooter";
import TaskItemHeader from "./TaskItemHeader";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { fetchTasks, updateTask } from "../../app/features/task/taskActions";
import { setSubtasks } from "../../app/features/task/taskSlice";
import { SubTask } from "../../app/interfaces";

const TaskItem: React.FC = () => {
  const { task } = useAppSelector((state) => state.task);
  const [title, setTitle] = useState<string>(task.title);
  const [note, setNote] = useState<string>(task.note!);
  const dispatch = useAppDispatch();

  const createSubTasks = () => {
    const subTaskForm: SubTask = {
      title: "",
      completed: false,
    };

    dispatch(setSubtasks(subTaskForm));
  };

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      title &&
        dispatch(updateTask({ ...task, title })).then(() => {
          dispatch(fetchTasks());
        });
    }, 1000); // Adjust the delay time as needed

    // Clear the timer if the user starts typing again
    return () => clearTimeout(delayTimer);
  }, [title, dispatch]);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      note &&
        dispatch(updateTask({ ...task, note })).then(() => {
          dispatch(fetchTasks());
        });
    }, 1000);
    return () => clearTimeout(delayTimer);
  }, [note, dispatch]);

  useEffect(() => {
    setTitle(task.title!);
    setNote(task.note!);
  }, [task, setTitle, setNote]);

  return (
    <Box
      sx={{
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <TaskItemHeader />
      <Divider />

      <Box
        py={2}
        pl={4}
        pr={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          overflow: "auto",
          boxSizing: "content-box",
        }}
      >
        <InputBase
          autoFocus
          fullWidth
          sx={{ typography: "h6", fontWeight: "bold" }}
          placeholder="What needs doing?"
          inputProps={{ "aria-label": "enter task" }}
          value={title || ""}
          onChange={(e) => setTitle(e.target.value)}
          autoComplete="off"
          endAdornment={
            <InputAdornment position="end">
              <Tooltip title="Create Subtasks">
                <IconButton
                  aria-label="create subtasks"
                  onClick={createSubTasks}
                >
                  <FormatListBulletedIcon />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          }
        />
        <InputBase
          id="note-container"
          name="note-container"
          fullWidth
          multiline
          placeholder="Notes"
          value={note || ""}
          onChange={(e) => setNote(e.target.value)}
          sx={{
            typography: "body1",
            fontSize: 13,
            maxHeight: "inherits", // Set maximum height for the description
          }}
        />
        <SubTaskList />
      </Box>
      <Divider />
      <TaskItemFooter />
    </Box>
  );
};
export default TaskItem;
