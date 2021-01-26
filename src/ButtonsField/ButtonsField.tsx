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
  block = true,
  codeName = "code",
  disabled,
  options = [],
  readOnly,
  renderButtonName,
  trueFalse,
  valueName = "name",
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

export default ButtonsField;
