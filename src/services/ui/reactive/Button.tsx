import React from "react";
import classNames from "classnames";

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: 1 | 2 | "danger";
  block?: boolean;
  outlined?: boolean;
  link?: boolean;
}

const Button = ({
  variant = 1,
  block,
  outlined,
  link,
  className,
  ...buttonProps
}: ButtonProps): JSX.Element => {
  return (
    <button
      {...buttonProps}
      className={classNames(
        `btn-${variant}`,
        block && "btn-block",
        outlined && "outlined",
        link && "link",
        className,
      )}
    />
  );
};

export default Button;
