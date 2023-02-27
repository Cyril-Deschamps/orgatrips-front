import classNames from "classnames";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const SizedSection = ({ className, ...props }: Props): JSX.Element => {
  return (
    <div
      {...props}
      className={classNames(className, "max-w-screen-2xl w-full px-m")}
    />
  );
};

export default SizedSection;
