import { DetailedHTMLProps, FunctionComponent, HTMLAttributes } from "react";
import classNames from "classnames";

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  size?: "xs" | "s";
}

const ContentBlock: FunctionComponent<Props> = ({
  className,
  size,
  ...contentBlockProps
}) => {
  return (
    <div
      {...contentBlockProps}
      className={classNames(
        className,
        size ? `content-block-${size}` : "content-block",
      )}
    />
  );
};

export default ContentBlock;
