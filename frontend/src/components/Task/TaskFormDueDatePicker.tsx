import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Stack from "@mui/material/Stack";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { UseDateFieldProps } from "@mui/x-date-pickers/DateField";
import {
  BaseSingleInputFieldProps,
  DateValidationError,
  FieldSection,
} from "@mui/x-date-pickers/models";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { setDueDate } from "../../app/features/task/taskSlice";


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
  const { setOpen, id, disabled, InputProps: { ref } = {} } = props;

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

const TaskFormDueDatePicker: React.FC = () => {
  const [value, setValue] = useState<Dayjs | null>(null);
  const { loading } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loading === "succeeded" || loading === "failed") {
      setValue(null);
    }
  }, [loading, setValue]);

  const handleDueDateClick = (date: Dayjs | null) => {
    setValue(date);
    date !== null && dispatch(setDueDate(date.format("MM/DD/YYYY")));
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={1}>
          <ButtonDatePicker
            label={`Current date: ${
              value === null ? "null" : value.format("MM/DD/YYYY")
            }`}
            value={value}
            onChange={(newValue) => handleDueDateClick(newValue)}
          />
        </Stack>
      </LocalizationProvider>
    </>
  );
};

export default TaskFormDueDatePicker;
