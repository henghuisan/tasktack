import React, { createElement } from "react";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ListIcon from "@mui/icons-material/List";
import red  from "@mui/material/colors/red";
import blue  from "@mui/material/colors/blue";
import moment from "moment";
import { SubTask } from "../../app/interfaces";
import { ListAFromMenu as ListA } from "../List/lists";
import { ListBFromMenu as ListB } from "../List/lists";

interface TaskListItemDetailsProps {
  category: string;
  subtasks: Array<SubTask> | [];
  due_date: Date | null;
}

const TaskListItemDetails: React.FC<TaskListItemDetailsProps> = ({
  category,
  subtasks,
  due_date,
}: TaskListItemDetailsProps) => {
  const getCategory = () => {
    const list = category === "Inbox" ? ListA : ListB;
    const item = list.find(({ key }) => key === category);

    if (item) {
      return (
        <Box display="flex" alignItems="center" component={"span"}>
          {createElement(item.icon, { fontSize: "12px" } as object)}
          <Typography
            component={"span"}
            variant="body2"
            sx={{ fontSize: 13 }}
            mr={1}
          >
            {item.title}
          </Typography>
        </Box>
      );
    }
  };

  const getSubTasks = () => {
    // Get the total length of the subtasks
    const totalLength = subtasks.length;

    // Get the length of the completed subtasks
    const completedTaskslength = subtasks.filter(
      ({ completed }) => completed
    ).length;

    return (
      <Box display="flex" alignItems="center" component={"span"}>
        {createElement(ListIcon, { fontSize: "12px" } as object)}
        <Typography
          component={"span"}
          variant="body2"
          sx={{ fontSize: 13 }}
          mr={1}
        >
          {completedTaskslength}/{totalLength}
        </Typography>
      </Box>
    );
  };

  const getDueDate = () => {
    // Convert the due_date from backend to a moment object
    const dueDateMoment = moment(due_date);
    // Get the current moment
    const currentMoment = moment();
    // Compare due_date same with current moment
    const isCurrent = dueDateMoment.isSame(currentMoment, "day");
    // Compare due_date with the current moment
    const isPastDue = !isCurrent && dueDateMoment.isBefore(currentMoment, "day");

    return (
      <Typography
        component={"span"}
        variant="body2"
        sx={{ fontSize: 13 }}
        color={isCurrent ? blue[600] : isPastDue ? red[500] : 'inherit'}
      >
        {isCurrent? "Today" : dueDateMoment.format("MMM D")}
      </Typography>
    );
  };

  return (
    <ListItemText
      secondary={
        <span
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {category && getCategory()}
          {subtasks.length > 0 && getSubTasks()}
          {due_date && getDueDate()}
        </span>
      }
    />
  );
};

export default TaskListItemDetails;
