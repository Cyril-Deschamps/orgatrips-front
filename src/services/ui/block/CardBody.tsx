import { DetailedHTMLProps, FunctionComponent, HTMLAttributes } from "react";
import classNames from "classnames";

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const CardBody: FunctionComponent<Props> = ({
  className,
  ...cardBodyProps
}) => {
  return (
    <div {...cardBodyProps} className={classNames("card-body", className)} />
  );
};

export default CardBody;
