import classNames from "classnames";
import {
  DetailedHTMLProps,
  FunctionComponent,
  InputHTMLAttributes,
} from "react";

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const Input: FunctionComponent<InputProps> = ({ className, ...inputProps }) => {
  return <input {...inputProps} className={classNames("input", className)} />;
};

export default Input;
