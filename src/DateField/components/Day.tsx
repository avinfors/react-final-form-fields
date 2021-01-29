import * as React from "react";
import { Button } from "reactstrap";
import cn from "classnames";

interface IDayProps {
  dayFormatted: string;
  disabled: boolean;
  onClick: () => void;
  selected: boolean;
  today: boolean;
}

const Day: React.FC<IDayProps> = ({
  dayFormatted,
  disabled,
  onClick,
  selected,
  today,
}) => (
  <Button
    className={cn(
      "border-0 outline-0 rounded",
      today && !selected && "text-secondary font-weight-bold",
      selected && !disabled && "text-white font-weight-normal"
    )}
    color={selected ? "primary" : "link"}
    disabled={disabled}
    onClick={() => !disabled && onClick()}
    outline={!selected}
  >
    {dayFormatted}
  </Button>
);

export default Day;
