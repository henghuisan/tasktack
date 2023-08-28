import React, { useLayoutEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "../List/List";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import grey from "@mui/material/colors/grey";
import Content from "./Content";
import Header from "./Header";
import TaskForm from "../Task/TaskForm";
import TaskList from "../Task/TaskList";
import { ListAFromMenu as ListA } from "../List/lists";
import { ListBFromMenu as ListB } from "../List/lists";
import { ListCFromMenu as ListC } from "../List/lists";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { fetchTasks } from "../../app/features/task/taskActions";
import { useLocation } from "react-router-dom";
import moment from "moment";

const drawerWidth = 250;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  paddingLeft: theme.spacing(1),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  zIndex: theme.zIndex.drawer,
  marginLeft: `-${drawerWidth - 50}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const Menu: React.FC = () => {
  const theme = useTheme();
  const { tasks } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(true);
  const [openCompletedTaskList, setOpenCompletedTaskList] = useState(true);
  const [category, setCategory] = useState("all");
  let location = useLocation();

  const handleMenu = () => {
    setOpen(!open);
  };

  const handleCompletedTaskList = () => {
    setOpenCompletedTaskList(!openCompletedTaskList);
  };

  const getTaskList = (completed: boolean) => {
    const currentMoment = moment();

    let filteredTasks = tasks.filter((task) => task.completed === completed);

    switch (category) {
      case "today":
        filteredTasks = filteredTasks.filter((task) =>
          moment(task.due_date).isSameOrBefore(currentMoment, "day")
        );
        break;
      case "week":
        const next7Days = currentMoment.clone().add(7, "days");
        filteredTasks = filteredTasks.filter((task) => {
          const dueDateMoment = moment(task.due_date);
          return dueDateMoment.isBetween(currentMoment, next7Days, "day", "[]");
        });
        break;
      default:
        if (category !== "all" && category !== "completed") {
          filteredTasks = filteredTasks.filter(
            (task) => task.category === category
          );
        }
        break;
    }

    return filteredTasks;
  };

  useLayoutEffect(() => {
    const pathSegments = location.pathname.split("/"); // Split the pathname by "/"
    const lastPathSegment = pathSegments[pathSegments.length - 1]; // Get the last segment
    setCategory(lastPathSegment); // Get the last segment
    dispatch(fetchTasks());
  }, [dispatch, location]);

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Drawer
        sx={{
          width: drawerWidth - 50,
          flexShrink: 0,
          zIndex: theme.zIndex.drawer - 1, // Place the menu below the first one
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            pl: 8,
            pr: 1,
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Divider />
        <List name="menu" list={ListA} />
        <Divider />
        <Typography
          variant="caption"
          display="block"
          mt={2}
          ml={1}
          color={grey[600]}
          gutterBottom
        >
          Lists
        </Typography>
        <List name="menu" list={ListB} />
        <Divider />
        <List name="menu" list={ListC} />
      </Drawer>
      <Main open={open}>
        <Grid container sx={{ height: "100vh" }}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={6}
            sx={{
              borderRight: "1px solid #ccc",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              height: "100vh",
            }}
          >
            <Header handleMenu={handleMenu} open={open} />
            <TaskForm />
            <Box
              sx={{
                flex: 1,
                overflow: "auto",
                pr: 2,
                pl: 1,
              }}
            >
              {category !== "completed" && (
                <TaskList list={getTaskList(false)} />
              )}

              {getTaskList(true).length > 0 && (
                <>
                  <Divider sx={{ my: 2, mr: 1 }} />
                  <Button
                    fullWidth
                    size="small"
                    startIcon={
                      openCompletedTaskList ? (
                        <KeyboardArrowDownIcon />
                      ) : (
                        <KeyboardArrowRightIcon />
                      )
                    }
                    onClick={handleCompletedTaskList}
                    style={{ justifyContent: "flex-start" }}
                  >
                    Completed
                  </Button>
                  <Collapse
                    in={openCompletedTaskList}
                    timeout="auto"
                    unmountOnExit
                  >
                    <TaskList list={getTaskList(true)} />
                  </Collapse>
                </>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6} sx={{ px: 1 }}>
            {/* <TaskItem /> */}
            <Content />
          </Grid>
        </Grid>
      </Main>
    </Box>
  );
};

export default Menu;
