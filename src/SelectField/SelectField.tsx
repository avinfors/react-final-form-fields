import * as React from "react";
import { FieldRenderProps } from "react-final-form";
import Select, { Props as SelectProps } from "react-select";
import cn from "classnames";

import ErrorTooltip from "../ErrorTooltip";
import { getMetaError } from "../utils";

export type SelectFieldOption = {
  [key: string]: string | number | boolean;
};

export type SelectFieldProps = FieldRenderProps<SelectFieldOption> &
  SelectProps<SelectFieldOption> & {
    disabled?: boolean;
    id?: React.InputHTMLAttributes<HTMLInputElement>["id"];
    isClearable?: SelectProps["isClearable"];
    isMulti?: SelectProps["isMulti"];
    isOptionDisabled?: SelectProps["isOptionDisabled"];
    isSearchable?: SelectProps["isSearchable"];
    menuPlacement?: SelectProps["menuPlacement"];
    noOptionsMessage?: SelectProps["noOptionsMessage"];
    optionLabel?: string;
    options?: SelectProps["options"];
    optionValue?: string;
    placeholder?: React.InputHTMLAttributes<HTMLInputElement>["placeholder"];
    processValuesBeforeSelect?: (values: any) => any;
    readOnly?: React.InputHTMLAttributes<HTMLInputElement>["readOnly"];
  };

const SelectField: React.FC<SelectFieldProps> = ({
  input,
  meta,
  disabled,
  formatOptionLabel,
  id,
  isClearable,
  isMulti,
  isOptionDisabled,
  isSearchable,
  menuPlacement,
  noOptionsMessage,
  optionLabel,
  options,
  optionValue,
  placeholder,
  processValuesBeforeSelect,
  readOnly,
  ...rest
}) => {
  const [menuOpenState, setMenuOpenState] = React.useState(false);

  const error = getMetaError(meta);

  return (
    <ErrorTooltip
      className={menuOpenState ? "SelectFieldOpened" : "SelectFieldClosed"}
      data-name={input.name}
      error={error}
      isHidden={menuOpenState}
    >
      <Select
        {...input}
        {...rest}
        blurInputOnSelect={!!error}
        className={cn("SelectField", error && "SelectFieldError")}
        classNamePrefix="SelectFieldInner"
        formatOptionLabel={formatOptionLabel}
        getOptionLabel={(option) => option[optionLabel]}
        getOptionValue={(option) => option[optionValue]}
        id={id || input.name.replace(/(\.|\[|\])/g, "-")}
        isClearable={isClearable}
        isDisabled={disabled || readOnly}
        isMulti={isMulti}
        isOptionDisabled={isOptionDisabled}
        isSearchable={isSearchable}
        maxMenuHeight={200}
        menuIsOpen={menuOpenState}
        menuPlacement={menuPlacement}
        noOptionsMessage={noOptionsMessage}
        onChange={(value) => input.onChange(processValuesBeforeSelect(value))}
        onMenuClose={() => setMenuOpenState(false)}
        onMenuOpen={() => setMenuOpenState(true)}
        options={options}
        placeholder={placeholder}
        readOnly={readOnly}
      />
    </ErrorTooltip>
  );
};

SelectField.defaultProps = {
  noOptionsMessage: () => "Нет опций для выбора",
  optionLabel: "name",
  optionValue: "code",
  processValuesBeforeSelect: (values) => values,
};

export default SelectField;
