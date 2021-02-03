import * as React from "react";
import { Button } from "reactstrap";
import cn from "classnames";

interface IDayProps {
  dayFormatted: string;
  disabled: boolean;
  onClick: () => void;
  selected: boolean;
}

const Day: React.FC<IDayProps> = ({
  dayFormatted,
  disabled,
  onClick,
  selected,
}) => (
  <Button
    className={cn(
      "border-0 outline-0 rounded",
      selected && !disabled && "font-weight-normal",
      disabled && "text-black-50"
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
