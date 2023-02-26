import React from "react";
import Input from "./Input";

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const InputSearch = ({
  type,
  placeholder,
  ...otherProps
}: Props): JSX.Element => {
  return (
    <Input
      {...otherProps}
      placeholder={placeholder || "Rechercher"}
      type={type || "search"}
    />
  );
};

export default InputSearch;
