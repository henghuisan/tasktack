import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import grey from "@mui/material/colors/grey";
import { Typography } from "@mui/material";
import { useAppSelector } from "../../app/store/hooks";
import TaskItem from "../Task/TaskItem";
import { Task } from "../../app/interfaces";


const Content: React.FC = () => {
  const { task, tasks } = useAppSelector((state) => state.task);
  const [taskItem, setTaskItem] = useState<Task>({} as Task);

  useEffect(() => {
    const findIndex = tasks.findIndex(({ id }) => id === task.id);
    setTaskItem(findIndex > -1 ? task : ({} as Task));
  }, [task, tasks, setTaskItem]);

  const defaultContent = (
    <Container
      fixed
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <AdsClickIcon sx={{ fontSize: "150px", color: grey[300] }} />
      <Typography variant="body1" sx={{ color: grey[400] }}>
        Click task title to view the detail
      </Typography>
    </Container>
  );

  return (
    <>{JSON.stringify(taskItem) === "{}" ? defaultContent : <TaskItem />}</>
  );
};

export default Content;
