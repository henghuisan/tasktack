import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Stack from "@mui/material/Stack";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import Typography from "@mui/material/Typography";
import { UseDateFieldProps } from "@mui/x-date-pickers/DateField";
import {
  BaseSingleInputFieldProps,
  DateValidationError,
  FieldSection,
} from "@mui/x-date-pickers/models";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { fetchTasks, updateTask } from "../../app/features/task/taskActions";
import moment from "moment";
import red from "@mui/material/colors/red";
import blue from "@mui/material/colors/blue";

interface CalendarButtonFieldProps
  extends UseDateFieldProps<Dayjs>,
    BaseSingleInputFieldProps<
      Dayjs | null,
      Dayjs,
      FieldSection,
      DateValidationError
    > {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

function CalendarButtonField(props: CalendarButtonFieldProps) {
  const {
    setOpen,
    label,
    id,
    disabled,
    InputProps: { ref } = {},
    inputProps: { "aria-label": ariaLabel } = {},
  } = props;

  if (label === "null" || label === "Invalid Date") {
    return (
      <IconButton
        id={id}
        disabled={disabled}
        ref={ref}
        type="button"
        sx={{ p: "10px" }}
        aria-label="date"
        onClick={() => setOpen?.((prev) => !prev)}
      >
        <CalendarMonthIcon />
        <Typography variant="body2" sx={{ px: 1, fontSize: 14 }}>
          Pick a date
        </Typography>{" "}
      </IconButton>
    );
  }

  const currentMoment = moment();
  const dueDateMoment = moment(label as string, "MM/DD/YYYY");
  const isCurrent = dueDateMoment.isSame(currentMoment, "day");
  const isPastDue = dueDateMoment.isBefore(currentMoment, "day");
  const daysPast = currentMoment.diff(dueDateMoment, "days");
  const formattedDueDate = dueDateMoment.format("MMM D");
  const daysAgoText = daysPast > 0 && `${daysPast} days ago, `;
  const todayText = isCurrent && "Today, ";

  return (
    <IconButton
      id={id}
      disabled={disabled}
      ref={ref}
      type="button"
      sx={{
        p: "10px",
        color: isCurrent ? blue[600] : isPastDue ? red[500] : "inherit",
      }}
      aria-label={ariaLabel}
      onClick={() => setOpen?.((prev) => !prev)}
    >
      <CalendarMonthIcon />
      <Typography variant="body2" sx={{ px: 1, fontSize: 14 }}>
        {isCurrent ? todayText : daysAgoText} {formattedDueDate}
      </Typography>
    </IconButton>
  );
}

function ButtonDatePicker(
  props: Omit<DatePickerProps<Dayjs>, "open" | "onOpen" | "onClose">
) {
  const [open, setOpen] = React.useState(false);

  return (
    <DatePicker
      slots={{ field: CalendarButtonField, ...props.slots }}
      slotProps={{ field: { setOpen } as any }}
      {...props}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    />
  );
}

const TaskItemHeaderDueDatePicker: React.FC = () => {
  const [value, setValue] = useState<Dayjs | null>(null);
  const { task } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const { due_date } = task;
    const date = dayjs(due_date);
    setValue(date);
  }, [task, setValue]);

  const handleDueDateClick = (date: Dayjs | null) => {
    setValue(date);
    if (date !== null) {
      dispatch(
        updateTask({
          ...task,
          due_date: date.toDate(),
        })
      ).then(() => {
        dispatch(fetchTasks());
      });
    }
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={1}>
          <ButtonDatePicker
            label={`${value == null ? "null" : value.format("MM/DD/YYYY")}`}
            value={value}
            onChange={(newValue) => handleDueDateClick(newValue)}
          />
        </Stack>
      </LocalizationProvider>
    </>
  );
};

export default TaskItemHeaderDueDatePicker;
