import React, { useMemo } from "react";
import moment from "moment";
import Badge from "@mui/material/Badge";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";

/**
 * Renders a day in the calendar with a badge indicating the number of tasks due on that day.
 * @type {React.FC<{taskDays: Array<string>, day: moment.Moment, outsideCurrentMonth: boolean, ...other: Object}>}
 */
const ServerDay = (props) => {
  const { taskDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth && taskDays.includes(day.format("YYYY-MM-DD"));

  const count = taskDays.filter(
    (taskDay) => taskDay === day.format("YYYY-MM-DD")
  ).length;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? count : undefined}
      color="primary"
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
};

/**
 * Renders a calendar with badges on days that have tasks due on them.
 * @type {React.FC<{tasks: Object}>}
 */
const TaskCalendar = ({tasks}) => {
  const deadlines = tasks?.results?.map((task) =>
    moment(task.deadline).format("YYYY-MM-DD")
  );

  const taskDays = useMemo(() => {
    return deadlines || [];
  }, [deadlines]);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DateCalendar
          readOnly
          slots={{
            day: ServerDay,
          }}
          slotProps={{
            day: {
              taskDays,
            },
          }}
        />
      </LocalizationProvider>
    </>
  );
};

export default TaskCalendar;
