import React from "react";
import classNames from "classnames";

const Sidebar = ({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>): JSX.Element => {
  return <div {...props} className={classNames(className, "sidebar")} />;
};

export default Sidebar;
