import { twMerge } from "tailwind-merge";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Divider = ({ className, ...props }: Props): JSX.Element => {
  return (
    <div {...props} className={twMerge("h-[1px] bg-gray-300", className)} />
  );
};

export default Divider;
