import * as React from "react";
import { FieldMetaState } from "react-final-form";
import { Tooltip, TooltipProps } from "reactstrap";

import styles from "./styles.module.scss";

export type ErrorTooltipProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement> & {
    [key: string]: any;
    error: FieldMetaState<any>["error"];
    isHidden?: boolean;
    target?: TooltipProps["target"];
  }
>;

const ErrorTooltip: React.FC<ErrorTooltipProps> = ({
  error,
  isHidden,
  target,
  children,
  ...rest
}) => {
  const [hoverState, setHoverState] = React.useState(false);

  const ref = React.useRef(null);

  return (
    <div
      {...rest}
      ref={ref}
      onMouseEnter={() => setHoverState(true)}
      onMouseLeave={() => setHoverState(false)}
    >
      {children}
      <Tooltip
        fade={false}
        innerClassName={styles.inner}
        isOpen={!isHidden && hoverState && !!error}
        modifiers={{ computeStyle: { x: "top" } }}
        placement="top"
        target={target || ref}
      >
        {error}
      </Tooltip>
    </div>
  );
};

export default ErrorTooltip;
