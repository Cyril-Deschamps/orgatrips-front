import { twMerge } from "tailwind-merge";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {}

const Title2 = ({ className, ...props }: Props): JSX.Element => {
  return (
    <h2
      {...props}
      className={twMerge("text-2xl font-semibold leading-9 pb-s", className)}
    />
  );
};

export default Title2;
