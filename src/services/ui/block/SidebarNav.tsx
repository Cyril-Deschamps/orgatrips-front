import React from "react";
import classNames from "classnames";

const SidebarNav = ({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>): JSX.Element => {
  return <nav {...props} className={classNames(className, "sidebar-nav")} />;
};

export default SidebarNav;
