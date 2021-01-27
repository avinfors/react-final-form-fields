import * as React from "react";
import { FieldRenderProps } from "react-final-form";
import {
  Input,
  InputProps,
  InputGroup,
  InputGroupAddon,
  Button,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import ErrorTooltip from "../ErrorTooltip";
import { getMetaError } from "../utils";

export type PasswordFieldProps = FieldRenderProps<string> &
  InputProps & {
    disabled?: React.InputHTMLAttributes<HTMLInputElement>["disabled"];
    placeholder?: React.InputHTMLAttributes<HTMLInputElement>["placeholder"];
  };

const PasswordField: React.FC<PasswordFieldProps> = ({
  input,
  meta,
  disabled,
  placeholder,
  ...rest
}) => {
  const [showPasswordState, setShowPasswordState] = React.useState(false);

  const addonClickHandler = () => setShowPasswordState(!showPasswordState);

  const error = getMetaError(meta);

  return (
    <ErrorTooltip data-name={input.name} error={error}>
      <InputGroup>
        <Input
          {...input}
          {...rest}
          disabled={disabled}
          invalid={!!error}
          placeholder={placeholder}
          type={showPasswordState ? "text" : "password"}
        />
        <InputGroupAddon addonType="append">
          <Button disabled={disabled} onClick={addonClickHandler} outline>
            <FontAwesomeIcon
              fixedWidth
              icon={showPasswordState ? faEye : faEyeSlash}
            />
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </ErrorTooltip>
  );
};

export default PasswordField;
