import React from "react";
import classNames from "classnames";

const LayoutContent = ({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>): JSX.Element => {
  return <div {...props} className={classNames(className, "layout-content")} />;
};

export default LayoutContent;
