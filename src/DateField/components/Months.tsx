import * as React from "react";
import { ButtonGroup, Button } from "reactstrap";
import cn from "classnames";

import { useDateField } from "../Provider";
import {
  subYears,
  addYears,
  getYear,
  startOfMonth,
  setMonths,
  getMonths,
  startOfYear,
  endOfYear,
  eachMonthOfInterval,
  isBefore,
  isAfter,
  isEqual,
  format,
} from "../utils";

const Months: React.FC = () => {
  const { month, minDate, maxDate, setMonth, setView } = useDateField();

  const monthClickHandler = (date: Date, disabled: boolean) => () => {
    if (disabled) {
      return;
    }
    setMonth(setMonths(date, getMonths(date)));
    setView("days");
  };

  const isMonthDisabled = (date: Date) =>
    date < startOfMonth(minDate) || date > startOfMonth(maxDate);

  const isMonthSelected = (date: Date) =>
    isEqual(date, startOfMonth(month)) &&
    date >= startOfMonth(minDate) &&
    date <= startOfMonth(maxDate);

  const prevYear = subYears(month, 1);
  const nextYear = addYears(month, 1);
  const prevYearEnd = endOfYear(prevYear);
  const nextYearStart = startOfYear(nextYear);
  const year = getYear(month);
  const months = eachMonthOfInterval({
    start: startOfYear(month),
    end: endOfYear(month),
  });

  const rows = months.reduce<Date[][]>((acc, m) => {
    const lastRow = acc[acc.length - 1] ?? [];

    if (lastRow.length > 0 && lastRow.length < 4) {
      acc[acc.length - 1].push(m);
    } else {
      acc.push([m]);
    }
    return acc;
  }, []);

  const isPrevDisabled = isBefore(prevYearEnd, minDate);
  const isNextDisabled = isAfter(nextYearStart, maxDate);

  return (
    <>
      <div className="d-flex justify-content-between bg-white border-bottom">
        <Button
          className={cn(
            "rounded-0 border-0 outline-0",
            isPrevDisabled && "invisible"
          )}
          color="link"
          disabled={isPrevDisabled}
          onClick={() => setMonth(subYears(month, 1))}
          outline
        >
          {"<"}
        </Button>
        <Button
          className="rounded-0 border-0 outline-0"
          color="link"
          onClick={() => setView("years")}
          outline
        >
          <span> {year}</span>
        </Button>
        <Button
          className={cn(
            "rounded-0 border-0 outline-0",
            isNextDisabled && "invisible"
          )}
          color="link"
          disabled={isNextDisabled}
          onClick={() => setMonth(addYears(month, 1))}
          outline
        >
          {">"}
        </Button>
      </div>
      <div className="mb-2">
        {rows.map((row, index) => (
          <ButtonGroup key={index} className="w-100" size="sm">
            {row.map((day) => {
              const monthName = format(day, "LLL");
              const disabled = isMonthDisabled(day);
              const selected = isMonthSelected(day);

              return (
                <Button
                  key={day.getTime()}
                  className={cn(
                    "w-100 border-0 outline-0 rounded",
                    selected && !disabled && "text-white font-weight-normal"
                  )}
                  color={selected ? "primary" : "link"}
                  disabled={disabled}
                  onClick={monthClickHandler(day, disabled)}
                  outline={!selected}
                >
                  {monthName.substr(0, 3)}
                </Button>
              );
            })}
          </ButtonGroup>
        ))}
      </div>
    </>
  );
};

export default Months;
