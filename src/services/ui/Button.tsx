import { twMerge } from "tailwind-merge";
import React, { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ className, children, ...props }: Props): JSX.Element => {
  return (
    <button
      {...props}
      className={twMerge(
        "text-white hover:opacity-80 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-light-blue",
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
