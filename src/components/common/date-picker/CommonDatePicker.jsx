import * as React from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

const CommonDatePicker = ({ selectedDate, handleSelectedDate, label, maxDays }) => {
  const dayjsSelectedDate = dayjs(selectedDate);
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={dayjsSelectedDate}
        maxDate={maxDays}
        label= {label}
        onChange={handleSelectedDate}
        id={label}
        format="DD-MM-YYYY"
        sx={{width:{xs:'130px',sm:'auto'}}}
      />
    </LocalizationProvider>
  );
};

export default CommonDatePicker
