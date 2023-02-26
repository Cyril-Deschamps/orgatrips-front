import { DetailedHTMLProps, FunctionComponent, HTMLAttributes } from "react";
import classNames from "classnames";

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  size?: "xs" | "s";
}

const Section: FunctionComponent<Props> = ({
  className,
  size,
  ...sectionProps
}) => {
  return (
    <div
      {...sectionProps}
      className={classNames(className, size ? `section-${size}` : "section")}
    />
  );
};

export default Section;
