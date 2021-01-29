import * as React from "react";

import { DateFieldProps } from "./DateField";
import {
  getInitialMonth,
  getInitialDate,
  parse,
  format,
  isValid,
  isBefore,
  isAfter,
  getDefaultDate,
} from "./utils";

type ViewType = "days" | "months" | "years";

type DateFieldProviderProps = DateFieldProps & {
  onCalendarClose: () => void;
  onCalendarOpen: () => void;
};

type DateFieldCtxProps = DateFieldProviderProps & {
  view: ViewType;
  date: Date;
  month: Date;
  show: boolean;
  typed: string;
  setView: (view: ViewType) => void;
  setDate: (date: Date) => void;
  setMonth: (month: Date) => void;
  setShow: (show: boolean) => void;
  setTyped: (typed: string) => void;
  selectDay: (day: any) => void;
};

const DateFieldCtx = React.createContext<DateFieldCtxProps>(null);

export const useDateField = (): DateFieldCtxProps =>
  React.useContext(DateFieldCtx);

export const DateFieldProvider: React.FC<
  React.PropsWithChildren<DateFieldProviderProps>
> = ({ children, ...props }) => {
  const {
    input,
    meta,
    dateFormat,
    defaultDate,
    minDate,
    minDateMessage,
    maxDate,
    maxDateMessage,
    setFieldData,
  } = props;

  const ref = React.useRef(false);

  const inputTime = React.useMemo(
    () => (input.value instanceof Date ? input.value.getTime() : undefined),
    [input.value]
  );

  const minDateTime = React.useMemo(
    () =>
      minDate instanceof Date && isValid(minDate)
        ? minDate.getTime()
        : getDefaultDate().getTime(),
    [minDate]
  );

  const maxDateTime = React.useMemo(
    () =>
      maxDate instanceof Date && isValid(maxDate)
        ? maxDate.getTime()
        : getDefaultDate().getTime(),
    [maxDate]
  );

  const defaultDateTime = React.useMemo(
    () =>
      defaultDate instanceof Date && isValid(defaultDate)
        ? defaultDate.getTime()
        : minDateTime,
    [defaultDate, minDateTime]
  );

  const [viewState, setViewState] = React.useState<ViewType>("days");
  const [dateState, setDateState] = React.useState(() =>
    getInitialDate(inputTime)
  );
  const [monthState, setMonthState] = React.useState(() =>
    getInitialMonth(inputTime, defaultDate)
  );
  const [showState, setShowState] = React.useState(false);
  const [typedState, setTypedState] = React.useState("");

  const selectDay = (day) => {
    let value = day;
    const selected = day instanceof Date;

    setTypedState(selected ? format(day, dateFormat) : day);

    if (!selected) {
      const parsedDate = parse(day, dateFormat, 0);
      if (isValid(parsedDate)) {
        value = parsedDate;
      }
    }

    if (value instanceof Date) {
      input.onChange(value);
      if (selected) {
        input.onBlur();
      }
      if (!isBefore(value, minDate) && !isAfter(value, maxDate)) {
        setDateState(value);
        setMonthState(value);
      }
    } else {
      input.onChange(undefined);
      setDateState(getInitialDate(undefined));
      setMonthState(getInitialMonth(undefined, defaultDate));
    }

    setShowState(false);
  };

  React.useEffect(() => {
    inputTime !== undefined &&
      setTypedState((prev) => prev || format(inputTime, dateFormat));
  }, [inputTime, dateFormat]);

  React.useEffect(() => {
    const error = isBefore(inputTime, minDateTime)
      ? minDateMessage(minDateTime)
      : isAfter(inputTime, maxDateTime)
      ? maxDateMessage(maxDateTime)
      : undefined;

    const setError = () =>
      setFieldData(input.name, {
        error,
      });

    // hack: We need setTimeout() because setFieldData() doesn't fire
    // on the first render when the field has initial value.
    if (!ref.current) {
      ref.current = true;
      meta.initial === undefined ? setError() : setTimeout(setError);
    } else {
      setError();
    }

    if (error !== undefined) {
      setDateState(getInitialDate(undefined));
      setMonthState(getInitialMonth(undefined, defaultDateTime));
    }
  }, [
    input.name,
    inputTime,
    defaultDateTime,
    maxDateTime,
    maxDateMessage,
    minDateTime,
    minDateMessage,
    setFieldData,
    meta.initial,
  ]);

  React.useEffect(() => {
    showState &&
      !isBefore(inputTime, minDateTime) &&
      !isAfter(inputTime, maxDateTime) &&
      setMonthState(getInitialMonth(inputTime, defaultDateTime));
  }, [showState, inputTime, minDateTime, maxDateTime, defaultDateTime]);

  return (
    <DateFieldCtx.Provider
      value={{
        ...props,
        inputProps: {
          ...props.inputProps,
          "data-mindate": format(minDateTime, dateFormat),
          "data-maxdate": format(maxDateTime, dateFormat),
          "data-defaultdate": format(defaultDateTime, dateFormat),
        },
        minDate: minDateTime,
        maxDate: maxDateTime,
        defaultDate: defaultDateTime,
        view: viewState,
        date: dateState,
        month: monthState,
        show: showState,
        typed: typedState,
        setView: setViewState,
        setDate: setDateState,
        setMonth: setMonthState,
        setShow: setShowState,
        setTyped: setTypedState,
        selectDay,
      }}
    >
      {children}
    </DateFieldCtx.Provider>
  );
};
