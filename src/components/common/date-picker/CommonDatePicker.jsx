import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const CommonDatePicker = ({ selectedDate, handleSelectedDate, label }) => {
  console.log("selectedDate", selectedDate);
  const dayjsSelectedDate = dayjs(selectedDate);
  console.log("dayjsSelectedDate---->",dayjsSelectedDate);
  const maxDate = dayjs().startOf("day");
  console.log("maxDate---->",maxDate);
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={dayjsSelectedDate}
        maxDate={maxDate}
        label= {label}
        onChange={handleSelectedDate}
      />
    </LocalizationProvider>
  );
};

export default CommonDatePicker;
