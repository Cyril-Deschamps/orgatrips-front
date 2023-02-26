import React from "react";
import classNames from "classnames";

const ContentView = ({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>): JSX.Element => {
  return <div {...props} className={classNames(className, "content-view")} />;
};

export default ContentView;
