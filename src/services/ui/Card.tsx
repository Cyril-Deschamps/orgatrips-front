import { twMerge } from "tailwind-merge";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Card = ({ className, children, ...props }: Props): JSX.Element => {
  return (
    <div
      {...props}
      className={twMerge(
        "bg-white w-11/12 max-w-6xl p-4 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 mb-m",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Card;
