import * as React from "react";
import { FieldRenderProps } from "react-final-form";
import { Input, InputProps, InputGroup } from "reactstrap";
import MaskedInput, { MaskedInputProps } from "react-text-mask";

import ErrorTooltip from "../ErrorTooltip";
import { getMetaError } from "../utils";

export type PhoneFieldProps = FieldRenderProps<string> &
  Omit<InputProps, "type"> &
  MaskedInputProps & {
    disabled?: React.InputHTMLAttributes<HTMLInputElement>["disabled"];
    placeholder?: React.InputHTMLAttributes<HTMLInputElement>["placeholder"];
    placeholderChar?: MaskedInputProps["placeholderChar"];
  };

const PhoneField: React.FC<PhoneFieldProps> = ({
  input,
  meta,
  disabled,
  placeholder,
  placeholderChar = "_",
  ...rest
}) => {
  /**
   * Проверяем формат номера телефона.
   * Несмотря на маску, на некоторых iOS-устройствах при автозаполнении происходит вставка без круглых скобок и тире.
   * Поэтому в случае непрохождения проверки регуляркой и при условии, что введено 11 цифр, преобразуем к нужному формату.
   */
  const blurHandler: React.FocusEventHandler<HTMLInputElement> = (event) => {
    input.onBlur();

    let { value } = event.target;
    const isValid = /\+7\(\d{3}\)\d{3}-\d{2}-\d{2}/.test(value);

    if (!isValid) {
      const digits = value.replace(/\D/g, "");

      value =
        digits.length === 11
          ? digits.replace(
              /(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/,
              "+$1($2)$3-$4-$5"
            )
          : "";
      input.onChange(value);
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
          mask={[
            "+",
            "7",
            "(",
            /\d/,
            /\d/,
            /\d/,
            ")",
            /\d/,
            /\d/,
            /\d/,
            "-",
            /\d/,
            /\d/,
            "-",
            /\d/,
            /\d/,
          ]}
          placeholderChar={placeholderChar}
          render={(ref, props) => (
            <Input
              {...props}
              autoComplete="off"
              disabled={disabled}
              innerRef={ref}
              inputMode="numeric"
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

export default PhoneField;
