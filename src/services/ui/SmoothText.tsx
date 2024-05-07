import { twMerge } from "tailwind-merge";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {}

const SmoothText = ({ className, children, ...props }: Props): JSX.Element => {
  return (
    <div>
      <p className={twMerge("", className)} {...props}>
        <div className={"goo bg-white"}>{children}</div>
      </p>
      <svg
        className={"hidden absolute"}
        height={"0"}
        version={"1.1"}
        width={"0"}
        xmlns={"http://www.w3.org/2000/svg"}
      >
        <defs>
          <filter id={"goo"}>
            <feGaussianBlur
              in={"SourceGraphic"}
              result={"blur"}
              stdDeviation={"5"}
            />
            <feColorMatrix
              in={"blur"}
              mode={"matrix"}
              result={"goo"}
              values={"1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"}
            />
            <feComposite in={"SourceGraphic"} in2={"goo"} operator={"atop"} />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default SmoothText;
