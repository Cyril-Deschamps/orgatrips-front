import { twMerge } from "tailwind-merge";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  little?: boolean;
}

const SizedSection = ({ className, little, ...props }: Props): JSX.Element => {
  return (
    <div className={"w-full flex justify-center"}>
      <div
        {...props}
        className={twMerge(
          little ? "max-w-screen-xl" : "max-w-[1450px]",
          "w-full px-m md:px-2xl",
          className,
        )}
      />
    </div>
  );
};

export default SizedSection;
