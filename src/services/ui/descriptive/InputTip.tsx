import { ReactNode } from "react";

const InputTip = ({ children }: { children?: ReactNode }): JSX.Element => {
  return <p className={"input-tip"}>{children}</p>;
};

export default InputTip;
