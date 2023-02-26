import { DetailedHTMLProps, FunctionComponent, HTMLAttributes } from "react";
import classNames from "classnames";

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Card: FunctionComponent<Props> = ({ className, ...cardProps }) => {
  return <div {...cardProps} className={classNames("card", className)} />;
};

export default Card;
