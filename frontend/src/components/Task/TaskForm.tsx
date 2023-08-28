import React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import AddIcon from "@mui/icons-material/Add";
import grey from "@mui/material/colors/grey";
import TaskFormDueDatePicker from "./TaskFormDueDatePicker";
import TaskFormDropDown from "./TaskFormDropdown";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { createTask, fetchTasks } from "../../app/features/task/taskActions";
import { TaskFormData } from "../../app/interfaces";
import { resetForm, setTitle } from "../../app/features/task/taskSlice";

const TaskForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { taskFormData } = useAppSelector((state) => state.task);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle(e.target.value));
  };

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { title, due_date } = taskFormData;

    if (e.key === "Enter" && title!.trim() !== "") {
      e.preventDefault();
      // console.log("Form submitted:", taskFormData);
      const formData: TaskFormData = {
        ...taskFormData,
        due_date: due_date && new Date(due_date),
      };
      dispatch(createTask(formData)).then(() => {
        dispatch(fetchTasks());
        dispatch(resetForm());
      });
    }
  };

  return (
    <Paper
      component="form"
      sx={{
        ml: 2,
        mr: 3,
        display: "flex",
        alignItems: "center",
        backgroundColor: grey[100],
        boxShadow: "none",
      }}
    >
      <InputBase
        placeholder='Add task to "Inbox", press Enter to save.'
        inputProps={{ "aria-label": "enter task" }}
        startAdornment={
          <InputAdornment position="start">
            <AddIcon sx={{ color: grey[500] }} />
          </InputAdornment>
        }
        value={taskFormData.title}
        onChange={handleTitleChange}
        onKeyDown={handleSubmit}
        sx={{ ml: 1, flex: 1, fontSize: 14 }}
      />
      <TaskFormDueDatePicker />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <TaskFormDropDown />
    </Paper>
  );
};

export default TaskForm;
