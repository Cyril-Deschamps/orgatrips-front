import classNames from "classnames";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  little?: boolean;
}

const SizedSection = ({ className, little, ...props }: Props): JSX.Element => {
  return (
    <div
      {...props}
      className={classNames(
        className,
        little ? "max-w-screen-lg" : "max-w-screen-2xl",
        "w-full px-m",
      )}
    />
  );
};

export default SizedSection;
