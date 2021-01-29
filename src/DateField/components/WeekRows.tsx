import * as React from "react";
import { ButtonGroup } from "reactstrap";

import { useDateField } from "../Provider";
import Day from "./Day";
import {
  endOfMonth,
  endOfWeek,
  eachDayOfInterval,
  eachWeekOfInterval,
  format,
  isAfter,
  isBefore,
  isEqual,
  isToday,
  startOfMonth,
} from "../utils";

const WeekRows: React.FC = () => {
  const { date, month, selectDay, minDate, maxDate } = useDateField();

  const isDayDisabled = (day: Date) => {
    return isBefore(day, minDate) || isAfter(day, maxDate);
  };

  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  const weeks = eachWeekOfInterval(
    {
      start: monthStart,
      end: monthEnd,
    },
    { weekStartsOn: 1 }
  );
  const rows = weeks.map((weekStart) =>
    eachDayOfInterval({
      start: weekStart,
      end: endOfWeek(weekStart, { weekStartsOn: 1 }),
    })
  );

  return (
    <div className="mb-2">
      {rows.map((row, index) => (
        <ButtonGroup key={index} className="w-100" size="sm">
          {row.map((day) => (
            <Day
              key={day.getDate()}
              dayFormatted={format(day, "dd")}
              disabled={isDayDisabled(day)}
              onClick={() => selectDay(day)}
              selected={isEqual(day, date)}
              today={isToday(day)}
            />
          ))}
        </ButtonGroup>
      ))}
    </div>
  );
};

export default WeekRows;
