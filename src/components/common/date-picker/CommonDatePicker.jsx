import * as React from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

const CommonDatePicker = ({ selectedDate, handleSelectedDate }) => {
    console.log('selectedDate', selectedDate)
    const dayjsSelectedDate = dayjs(selectedDate)
    const maxDate = dayjs().startOf('day')

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                value={dayjsSelectedDate}
                maxDate={maxDate}
                label="Filter with Date"
                onChange={handleSelectedDate}
            />
        </LocalizationProvider>
    )
}

export default CommonDatePicker
