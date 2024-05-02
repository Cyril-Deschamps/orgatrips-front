import { twMerge } from "tailwind-merge";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {}

const TitleLegend = ({ className, ...props }: Props): JSX.Element => {
  return (
    <p
      {...props}
      className={twMerge("font-VarsityTeam text-s text-blue", className)}
    />
  );
};

export default TitleLegend;
