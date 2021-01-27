import * as React from "react";
import { FieldRenderProps } from "react-final-form";
import { Input, InputProps, InputGroup } from "reactstrap";
import MaskedInput, { MaskedInputProps } from "react-text-mask";

import ErrorTooltip from "../ErrorTooltip";
import { getMetaError } from "../utils";

export type MaskedFieldProps = FieldRenderProps<string> &
  Omit<InputProps, "type"> &
  MaskedInputProps & {
    disabled?: React.InputHTMLAttributes<HTMLInputElement>["disabled"];
    inputMode?: React.InputHTMLAttributes<HTMLInputElement>["inputMode"];
    mask?: MaskedInputProps["mask"];
    pipe?: MaskedInputProps["pipe"];
    placeholder?: React.InputHTMLAttributes<HTMLInputElement>["placeholder"];
    placeholderChar?: MaskedInputProps["placeholderChar"];
  };

const MaskedField: React.FC<MaskedFieldProps> = ({
  input,
  meta,
  disabled,
  inputMode,
  mask,
  pipe,
  placeholder,
  placeholderChar,
  ...rest
}) => {
  const blurHandler: React.FocusEventHandler<HTMLInputElement> = (event) => {
    input.onBlur(event);

    const regex = new RegExp(`[${placeholderChar}]`);
    if (regex.test(event.target.value)) {
      input.onChange(undefined);
    }
  };

  const error = getMetaError(meta);

  return (
    <ErrorTooltip data-name={input.name} error={error}>
      <InputGroup>
        <MaskedInput
          {...input}
          {...rest}
          keepCharPositions
          mask={mask}
          pipe={pipe}
          placeholderChar={placeholderChar}
          render={(ref, props) => (
            <Input
              {...props}
              autoComplete="off"
              disabled={disabled}
              innerRef={ref}
              inputMode={inputMode}
              invalid={!!error}
              onBlur={blurHandler}
              placeholder={placeholder}
            />
          )}
        />
      </InputGroup>
    </ErrorTooltip>
  );
};

export default MaskedField;
