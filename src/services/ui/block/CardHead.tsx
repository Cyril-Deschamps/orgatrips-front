import { DetailedHTMLProps, FunctionComponent, HTMLAttributes } from "react";
import classNames from "classnames";

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title?: string;
}

const CardHead: FunctionComponent<Props> = ({
  title,
  className,
  children,
  ...cardHeadProps
}) => {
  return (
    <div {...cardHeadProps} className={classNames("card-head", className)}>
      {title && <h1 className={"card-title"}>{title}</h1>}
      {children}
    </div>
  );
};

export default CardHead;
