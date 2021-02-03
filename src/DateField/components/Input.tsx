import * as React from "react";
import {
  Input,
  InputGroupAddon,
  Button,
  InputGroup,
  Popover,
} from "reactstrap";
import MaskedInput from "react-text-mask";
import createAutoCorrectedDatePipe from "text-mask-addons/dist/createAutoCorrectedDatePipe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";

import { useDateField } from "../Provider";
import Calendar from "./Calendar";
import { getMetaError } from "../../utils";

const InputBase: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const trigger = React.useRef<HTMLButtonElement>(null!);

  const pipe = React.useMemo(
    () => createAutoCorrectedDatePipe("dd.mm.yyyy"),
    []
  );

  const {
    input,
    meta,
    calendarPosition,
    disabled,
    inputProps,
    onCalendarOpen,
    onCalendarClose,
    selectDay,
    setShow,
    setView,
    show,
    typed,
  } = useDateField();

  React.useEffect(() => {
    !show && trigger.current.blur();
  }, [show]);

  React.useEffect(() => {
    show ? onCalendarOpen() : onCalendarClose();
  }, [show, onCalendarOpen, onCalendarClose]);

  const popoverToggleHandler = () => {
    setShow(false);
    setView("days");
  };

  const error = getMetaError(meta);

  return (
    <>
      <InputGroup>
        <MaskedInput
          {...input}
          {...inputProps}
          keepCharPositions={true}
          mask={[/\d/, /\d/, ".", /\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/]}
          onChange={(e) => selectDay(e.target.value)}
          pipe={pipe}
          render={(ref, props) => (
            <Input
              {...props}
              disabled={disabled}
              innerRef={ref}
              inputMode="numeric"
              invalid={!!error}
              onKeyDown={(e) => {
                // hack: When we set date via the calendar the first time
                // and try to clear the input it is not cleared
                // because onchange event doesn't fire for some unknown reason.
                const cursorPos = Number(e.currentTarget.selectionStart);
                const keyCode = Number(e.keyCode);
                if (
                  cursorPos === 0 &&
                  keyCode === 8 &&
                  e.currentTarget.value.length > 0
                ) {
                  e.preventDefault();
                  e.currentTarget.value = "";
                  props.onChange(e);
                }
              }}
            />
          )}
          value={typed}
        />
        <InputGroupAddon addonType="append">
          <Button
            className="calendar-button"
            color={error ? "danger" : "primary"}
            disabled={disabled}
            innerRef={trigger}
            onClick={() => setShow(!show)}
            outline
            tabIndex={-1}
          >
            <FontAwesomeIcon icon={faCalendarAlt} />
          </Button>
        </InputGroupAddon>
      </InputGroup>
      <Popover
        fade={false}
        innerClassName="shadow"
        isOpen={show}
        modifiers={{
          computeStyle: {
            gpuAcceleration: false,
          },
        }}
        placement={calendarPosition}
        target={trigger}
        toggle={popoverToggleHandler}
        trigger="focus"
      >
        <Calendar />
      </Popover>
    </>
  );
};

export default InputBase;
