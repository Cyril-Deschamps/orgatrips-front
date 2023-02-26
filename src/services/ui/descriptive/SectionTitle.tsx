import { DetailedHTMLProps, FunctionComponent, HTMLAttributes } from "react";
import classNames from "classnames";

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title?: string;
}

const SectionTitle: FunctionComponent<Props> = ({
  title,
  className,
  ...sectionTitleProps
}) => {
  return (
    <h2
      {...sectionTitleProps}
      className={classNames(className, "section-title")}
    >
      {title}
    </h2>
  );
};

export default SectionTitle;
