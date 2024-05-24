import { twMerge } from "tailwind-merge";
import React, { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ className, children, ...props }: Props): JSX.Element => {
  return (
    <button
      {...props}
      className={twMerge(
        "text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-light-blue",
        props.disabled ? "cursor-default opacity-50" : "hover:opacity-80",
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
