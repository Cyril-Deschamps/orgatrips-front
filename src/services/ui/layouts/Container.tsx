import React from "react";
import classNames from "classnames";

const Container = ({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>): JSX.Element => {
  return <div {...props} className={classNames(className, "container")} />;
};

export default Container;
