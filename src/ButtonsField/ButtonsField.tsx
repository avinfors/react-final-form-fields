import * as React from "react";
import { FieldRenderProps } from "react-final-form";
import { Button, ButtonGroup } from "reactstrap";
import cn from "classnames";

import ErrorTooltip from "../ErrorTooltip";
import { getMetaError } from "../utils";

export type ButtonsFieldOption =
  | {
      [key: string]: string | number | boolean;
    }
  | boolean;

export type ButtonsFieldProps = FieldRenderProps<ButtonsFieldOption> & {
  block?: boolean;
  codeName?: string;
  disabled?: boolean;
  equalWidth?: boolean;
  options?: ButtonsFieldOption[];
  readOnly?: boolean;
  renderButtonName?: (option: ButtonsFieldOption) => React.ReactNode;
  trueFalse?: boolean;
  valueName?: string;
  vertical?: boolean;
};

const ButtonsField: React.FC<ButtonsFieldProps> = ({
  input,
  meta,
  block,
  codeName,
  disabled,
  equalWidth,
  options,
  readOnly,
  renderButtonName,
  trueFalse,
  valueName,
  vertical,
}) => {
  const buttonClickHandler = (option: ButtonsFieldOption) => () => {
    input.onFocus();
    input.onChange(trueFalse ? option[codeName] : option);
    input.onBlur();
  };

  const error = getMetaError(meta);

  return (
    <ErrorTooltip data-name={input.name} error={error} tabIndex={-1}>
      <ButtonGroup className={cn(block && "d-flex")} vertical={vertical}>
        {options.map((option) => (
          <Button
            key={`${input.name}-${option[codeName]}`}
            className={cn(block && equalWidth && "w-100")}
            color={error ? "danger" : "primary"}
            disabled={disabled || readOnly}
            onClick={buttonClickHandler(option)}
            outline={
              trueFalse
                ? option[codeName] !== input.value
                : option[codeName] !== input.value[codeName]
            }
            type="button"
          >
            {renderButtonName ? renderButtonName(option) : option[valueName]}
          </Button>
        ))}
      </ButtonGroup>
    </ErrorTooltip>
  );
};

ButtonsField.defaultProps = {
  block: true,
  codeName: "code",
  options: [],
  valueName: "name",
};

export default ButtonsField;
