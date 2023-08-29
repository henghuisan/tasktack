import React, { useEffect, useRef, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import InputBase from "@mui/material/InputBase";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { SubTask, Task } from "../../app/interfaces";
import { fetchTasks, updateTask } from "../../app/features/task/taskActions";
import { setSubtasks } from "../../app/features/task/taskSlice";

const SubTaskList: React.FC = () => {
  const { task } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();
  const [subTaskList, setSubTaskList] = useState<SubTask[]>([]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const updateSubTasks = (index: number, title: string) => {
    setSubTaskList([
      ...subTaskList.slice(0, index),
      { title, completed: false },
      ...subTaskList.slice(index + 1),
    ]);
  };

  const handleSubTasksChange = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const updatedTask: Task = {
        ...task,
        subtasks: [...subTaskList],
      };
      dispatch(updateTask(updatedTask)).then(() => {
        const subTaskForm: SubTask = {
          title: "",
          completed: false,
        };

        dispatch(setSubtasks(subTaskForm));
        dispatch(fetchTasks());
        inputRefs.current[index]?.blur();
      });
    }
  };

  const handleSubTaskDelete = (index: number) => {
    const updatedSubTaskList = [...subTaskList];
    updatedSubTaskList.splice(index, 1);

    const updatedTask: Task = {
      ...task,
      subtasks: [...updatedSubTaskList],
    };
    dispatch(updateTask(updatedTask)).then(() => {
      dispatch(fetchTasks());
    });
  };

  const handleSubTaskCheck = (index: number) => {
    const updatedSubTaskList = subTaskList.map((subTask, i) =>
      i === index ? { ...subTask, completed: !subTask.completed } : subTask
    );

    const updatedTask: Task = {
      ...task,
      subtasks: [...updatedSubTaskList],
    };
    dispatch(updateTask(updatedTask)).then(() => {
      setSubTaskList([...updatedSubTaskList]);
      dispatch(fetchTasks());
    });
  };

  useEffect(() => {
    if (JSON.stringify(task) !== "{}" && task.subtasks.length > 0) {
      setSubTaskList([...task.subtasks]);
    } else {
      setSubTaskList([]);
    }
  }, [task]);

  return (
    <List>
      {subTaskList.length > 0 &&
        subTaskList.map((subtask, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleSubTaskDelete(index)}
              >
                <DeleteOutlineIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton dense>
              <Checkbox
                size="small"
                onClick={() => handleSubTaskCheck(index)}
                checked={subtask.completed}
              />
              <InputBase
                fullWidth
                value={subtask.title}
                inputRef={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => updateSubTasks(index, e.target.value)}
                onKeyDown={(e) => handleSubTasksChange(e, index)}
                placeholder="Press 'Enter' to add subtask"
                sx={{
                  typography: "body1",
                  fontSize: 13,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
    </List>
  );
};

export default SubTaskList;
