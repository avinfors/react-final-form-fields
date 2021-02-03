import * as React from "react";
import { FieldRenderProps, FieldInputProps } from "react-final-form";
import { InputGroup, Input, InputProps, InputGroupAddon } from "reactstrap";

import ErrorTooltip from "../ErrorTooltip";
import { getMetaError } from "../utils";

export type TextFieldProps = FieldRenderProps<string> &
  InputProps & {
    action?: {
      addon: React.ReactNode;
      callback?: (value: FieldInputProps<string>["value"]) => void;
    };
    disabled?: React.InputHTMLAttributes<HTMLInputElement>["disabled"];
    noPast?: boolean;
    placeholder?: React.InputHTMLAttributes<HTMLInputElement>["placeholder"];
    readOnly?: React.InputHTMLAttributes<HTMLInputElement>["readOnly"];
    sanitazeOnBlur?: boolean;
    trimOnBlur?: boolean;
    type?: "text" | "email";
    validateLanguage?: {
      regex: RegExp;
      error: string;
    };
  };

const TextField: React.FC<TextFieldProps> = ({
  input,
  meta,
  action,
  disabled,
  noPast,
  placeholder,
  readOnly,
  sanitazeOnBlur,
  trimOnBlur,
  type,
  validateLanguage,
  ...rest
}) => {
  const [staticErrorState, setStaticErrorState] = React.useState("");

  const addonClickHandler = () =>
    action?.callback && !disabled && action.callback(input.value);

  const blurHandler = () => {
    input.onBlur();

    let { value } = input;

    if (trimOnBlur && value) {
      value = value.trim();
    }
    if (sanitazeOnBlur && value) {
      value = value.replace(/^[^A-ZА-Я]+|[^A-ZА-Я]+$/gi, "");
    }
    input.onChange(value);

    setStaticErrorState("");
  };

  const changeHadler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;

    if (validateLanguage) {
      const { regex, error } = validateLanguage;

      if (value && !regex.test(value)) {
        return setStaticErrorState(error);
      } else {
        setStaticErrorState("");
      }
    }

    input.onChange(value);
  };

  const error = getMetaError(meta);

  return (
    <ErrorTooltip data-name={input.name} error={error || staticErrorState}>
      <InputGroup>
        <Input
          {...input}
          {...rest}
          autoComplete="off"
          disabled={disabled}
          invalid={!!error || !!staticErrorState}
          onBlur={blurHandler}
          onChange={changeHadler}
          onPaste={(e) => noPast && e.preventDefault()}
          placeholder={placeholder}
          readOnly={readOnly}
          type={type}
        />
        {action && (
          <InputGroupAddon addonType="append" onClick={addonClickHandler}>
            {action.addon}
          </InputGroupAddon>
        )}
      </InputGroup>
    </ErrorTooltip>
  );
};

export default TextField;
