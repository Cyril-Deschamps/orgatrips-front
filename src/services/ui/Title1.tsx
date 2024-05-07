import { twMerge } from "tailwind-merge";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {
  big?: boolean;
}

const Title1 = ({ className, big = false, ...props }: Props): JSX.Element => {
  return (
    <h1
      className={twMerge(
        "font-VarsityTeam leading-8 md:leading-10",
        big
          ? "text-4xl lg:text-5xl xl:text-6xl"
          : "text-3xl lg:text-4xl xl:text-5xl",
        className,
      )}
      {...props}
    />
  );
};

export default Title1;
