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
    disabled,
    minDate,
    minDateMessage,
    maxDate,
    maxDateMessage,
  } = props;

  const prevDirty = React.useRef(meta.dirty);
  const errorTyped = React.useRef(null);

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
    getInitialMonth(inputTime, defaultDateTime)
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
      if (!isBefore(value, minDateTime) && !isAfter(value, maxDateTime)) {
        setDateState(value);
        setMonthState(value);
      }
    } else {
      input.onChange(undefined);
      setDateState(getInitialDate());
      setMonthState(getInitialMonth(undefined, defaultDateTime));
    }

    setShowState(false);
  };

  React.useEffect(() => {
    inputTime !== undefined &&
      setTypedState((prev) => prev || format(inputTime, dateFormat));
  }, [inputTime, dateFormat]);

  React.useEffect(() => {
    if (inputTime !== undefined) {
      const error = isBefore(inputTime, minDateTime)
        ? minDateMessage(minDateTime)
        : isAfter(inputTime, maxDateTime)
        ? maxDateMessage(maxDateTime)
        : undefined;

      if (error !== undefined) {
        input.onChange(error);
        if (!meta.active) {
          input.onBlur();
        }
        setDateState(getInitialDate());
        setMonthState(getInitialMonth(undefined, defaultDateTime));
        errorTyped.current = typedState;
      }
    } else if (errorTyped.current === typedState) {
      const parsedDate = parse(typedState, dateFormat, 0);

      if (
        isValid(parsedDate) &&
        !isBefore(parsedDate, minDateTime) &&
        !isAfter(parsedDate, maxDateTime)
      ) {
        setDateState(parsedDate);
        setMonthState(parsedDate);
        input.onChange(parsedDate);
        input.onBlur();
        errorTyped.current = null;
      }
    }
  }, [
    input,
    inputTime,
    defaultDateTime,
    maxDateTime,
    maxDateMessage,
    minDateTime,
    minDateMessage,
    meta.active,
    dateFormat,
    typedState,
  ]);

  React.useEffect(() => {
    const dirty = meta.dirty;
    const initial = meta.initial;
    const visited = meta.visited;

    if (prevDirty && !dirty && !visited) {
      let typed = "";

      if (initial instanceof Date || typeof initial === "number") {
        typed = format(initial);

        if (!isBefore(initial, minDateTime) && !isAfter(initial, maxDateTime)) {
          const value = initial instanceof Date ? initial : new Date(initial);

          setDateState(value);
          setMonthState(value);
        }
      } else {
        setDateState(getInitialDate());
        setMonthState(getInitialMonth(undefined, defaultDateTime));
      }
      setTypedState(typed);
    }

    return () => (prevDirty.current = dirty);
  }, [
    meta.dirty,
    meta.initial,
    meta.visited,
    defaultDateTime,
    minDateTime,
    maxDateTime,
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
        date: dateState,
        defaultDate: defaultDateTime,
        disabled,
        inputProps: {
          ...props.inputProps,
          "data-mindate": format(minDateTime, dateFormat),
          "data-maxdate": format(maxDateTime, dateFormat),
          "data-defaultdate": format(defaultDateTime, dateFormat),
        },
        maxDate: maxDateTime,
        minDate: minDateTime,
        month: monthState,
        selectDay,
        setDate: setDateState,
        setMonth: setMonthState,
        setShow: setShowState,
        setTyped: setTypedState,
        setView: setViewState,
        show: showState,
        typed: typedState,
        view: viewState,
      }}
    >
      {children}
    </DateFieldCtx.Provider>
  );
};
