import classNames from "classnames";
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
      className={classNames(className, "text-3xl font-bold pb-s leading-8")}
    />
  );
};

export default Title2;
