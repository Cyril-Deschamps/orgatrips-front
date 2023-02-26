import classNames from "classnames";
import Link, { Props as LinkProps } from "../../routing/components/Link";

const CreateLink = <T extends string>(props: LinkProps<T>): JSX.Element => {
  return <Link {...props} className={classNames([props.className, "btn-1"])} />;
};

export default CreateLink;
