import * as React from "react";
import { FieldRenderProps } from "react-final-form";
import { CustomInput, CustomInputProps } from "reactstrap";

import ErrorTooltip from "../ErrorTooltip";
import { getMetaError } from "../utils";

export type CheckboxFieldProps = FieldRenderProps<boolean> &
  Omit<CustomInputProps, "id"> & {
    disabled?: React.InputHTMLAttributes<HTMLInputElement>["disabled"];
    id?:
      | CustomInputProps["id"]
      | React.InputHTMLAttributes<HTMLInputElement>["id"];
    label?: CustomInputProps["label"];
    readOnly?: React.InputHTMLAttributes<HTMLInputElement>["readOnly"];
  };

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  input,
  meta,
  disabled,
  id,
  label,
  readOnly,
  ...rest
}) => {
  const ref = React.useRef(null);

  const error = getMetaError(meta);

  return (
    <ErrorTooltip data-name={input.name} error={error} target={ref}>
      <CustomInput
        {...input}
        {...rest}
        checked={input.checked}
        disabled={disabled || readOnly}
        id={id || `${input.name}_custom_input`}
        innerRef={ref}
        invalid={!!error}
        label={label}
        type="checkbox"
        value={undefined}
      />
    </ErrorTooltip>
  );
};

export default CheckboxField;
