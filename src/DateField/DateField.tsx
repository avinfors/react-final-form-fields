import * as React from "react";
import { FieldRenderProps } from "react-final-form";
import { InputProps, PopoverProps } from "reactstrap";

import { DateFieldProvider } from "./Provider";
import Input from "./components/Input";
import { getMinDate, getMaxDate, format } from "./utils";
import ErrorTooltip from "../ErrorTooltip";
import { getMetaError } from "../utils";

export type DateFieldProps = FieldRenderProps<Date | number> & {
  calendarPosition?: PopoverProps["placement"];
  dateFormat?: string;
  defaultDate?: Date | number;
  disabled?: boolean;
  inputProps?: InputProps;
  maxDate?: Date | number;
  maxDateMessage?: (maxDate: Date | number) => string;
  minDate?: Date | number;
  minDateMessage?: (minDate: Date | number) => string;
};

const DateField: React.FC<DateFieldProps> = ({
  input,
  meta,
  calendarPosition,
  dateFormat,
  defaultDate,
  disabled,
  inputProps,
  maxDate,
  maxDateMessage,
  minDate,
  minDateMessage,
}) => {
  const [tooltipHiddenState, setTooltipHiddenState] = React.useState(false);

  const error = getMetaError(meta);

  return (
    <ErrorTooltip
      data-name={input.name}
      error={error}
      isHidden={tooltipHiddenState}
    >
      <DateFieldProvider
        calendarPosition={calendarPosition}
        dateFormat={dateFormat}
        defaultDate={defaultDate}
        disabled={disabled}
        input={input}
        inputProps={inputProps}
        maxDate={maxDate}
        maxDateMessage={maxDateMessage}
        meta={meta}
        minDate={minDate}
        minDateMessage={minDateMessage}
        onCalendarClose={() => setTooltipHiddenState(false)}
        onCalendarOpen={() => setTooltipHiddenState(true)}
      >
        <Input />
      </DateFieldProvider>
    </ErrorTooltip>
  );
};

DateField.defaultProps = {
  calendarPosition: "bottom",
  dateFormat: "dd.MM.yyyy",
  inputProps: { placeholder: "дд.мм.гггг" },
  maxDate: getMaxDate(120),
  maxDateMessage: (maxDate) =>
    `Дата не может быть больше ${format(maxDate, "dd.MM.yyyy")}`,
  minDate: getMinDate(120),
  minDateMessage: (minDate) =>
    `Дата не может быть меньше ${format(minDate, "dd.MM.yyyy")}`,
};

export default DateField;
