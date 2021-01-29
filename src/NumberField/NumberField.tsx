import * as React from "react";
import { FieldRenderProps } from "react-final-form";
import { Input, InputProps, InputGroup } from "reactstrap";
import NumberFormat, { NumberFormatProps } from "react-number-format";

import ErrorTooltip from "../ErrorTooltip";
import { getMetaError } from "../utils";

export type NumberFieldProps = FieldRenderProps<string> &
  Omit<InputProps, "type"> &
  NumberFormatProps & {
    allowNegative?: NumberFormatProps["allowNegative"];
    decimalScale?: NumberFormatProps["decimalScale"];
    decimalSeparator?: NumberFormatProps["decimalSeparator"];
    disabled?: React.InputHTMLAttributes<HTMLInputElement>["disabled"];
    inputMode?: React.InputHTMLAttributes<HTMLInputElement>["inputMode"];
    fixedDecimalScale?: NumberFormatProps["fixedDecimalScale"];
    maxLength: React.InputHTMLAttributes<HTMLInputElement>["maxLength"];
    placeholder?: React.InputHTMLAttributes<HTMLInputElement>["placeholder"];
    thousandSeparator?: NumberFormatProps["thousandSeparator"];
    type?: "text" | "tel";
  };

const NumberField: React.FC<NumberFieldProps> = ({
  input,
  meta,
  allowNegative,
  decimalScale,
  decimalSeparator,
  disabled,
  inputMode,
  fixedDecimalScale,
  maxLength,
  placeholder,
  thousandSeparator,
  type,
  ...rest
}) => {
  const error = getMetaError(meta);

  return (
    <ErrorTooltip data-name={input.name} error={error}>
      <InputGroup>
        <NumberFormat
          {...input}
          {...rest}
          allowNegative={allowNegative}
          autoComplete="off"
          customInput={Input}
          decimalScale={decimalScale}
          decimalSeparator={decimalSeparator}
          disabled={disabled}
          fixedDecimalScale={fixedDecimalScale}
          inputMode={inputMode}
          invalid={!!error}
          maxLength={maxLength}
          placeholder={placeholder}
          thousandSeparator={thousandSeparator}
          type={type}
        />
      </InputGroup>
    </ErrorTooltip>
  );
};

NumberField.defaultProps = {
  decimalScale: 2,
  decimalSeparator: ",",
  fixedDecimalScale: true,
  maxLength: 20,
  thousandSeparator: " ",
};

export default NumberField;
