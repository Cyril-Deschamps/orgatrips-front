import { DetailedHTMLProps, HTMLAttributes } from "react";
import classNames from "classnames";

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const PageContent = ({ className, ...otherProps }: Props): JSX.Element => {
  return (
    <div
      {...otherProps}
      className={classNames("page-content", "container", className)}
    />
  );
};

export default PageContent;
