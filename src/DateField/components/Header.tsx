import * as React from "react";
import { Button } from "reactstrap";
import cn from "classnames";

import { useDateField } from "../Provider";
import {
  format,
  getYear,
  subMonths,
  addMonths,
  startOfMonth,
  endOfMonth,
  isBefore,
  isAfter,
} from "../utils";

const Header: React.FC = () => {
  const { month, setMonth, setView, minDate, maxDate } = useDateField();

  const monthName = format(month, "LLLL");
  const year = getYear(month);
  const prevMonth = subMonths(month, 1);
  const nextMonth = addMonths(month, 1);
  const nextMonthStart = startOfMonth(nextMonth);
  const prevMonthEnd = endOfMonth(prevMonth);

  const isPrevDisabled = isBefore(prevMonthEnd, minDate);
  const isNextDisabled = isAfter(nextMonthStart, maxDate);

  return (
    <div className="d-flex justify-content-between bg-white border-bottom">
      <Button
        className={cn(
          "rounded-0 border-0 outline-0",
          isPrevDisabled && "invisible"
        )}
        color="link"
        disabled={isPrevDisabled}
        onClick={() => setMonth(subMonths(month, 1))}
        outline
      >
        {"<"}
      </Button>
      <Button
        className="rounded-0 border-0 outline-0"
        color="link"
        onClick={() => setView("months")}
        outline
      >
        <span className="text-capitalize">{monthName}</span>
        <span> {year}</span>
      </Button>
      <Button
        className={cn(
          "rounded-0 border-0 outline-0",
          isNextDisabled && "invisible"
        )}
        color="link"
        disabled={isNextDisabled}
        onClick={() => setMonth(addMonths(month, 1))}
        outline
      >
        {">"}
      </Button>
    </div>
  );
};

export default Header;
