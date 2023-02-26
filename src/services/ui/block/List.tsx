import { DetailedHTMLProps, FunctionComponent, HTMLAttributes } from "react";
import classNames from "classnames";

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const List: FunctionComponent<Props> = ({ className, ...listProps }) => {
  return <div {...listProps} className={classNames(className, "list")} />;
};

export default List;
