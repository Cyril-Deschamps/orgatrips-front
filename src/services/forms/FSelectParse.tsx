import classNames from "classnames";
import { Field, FieldProps } from "formik";
import React, { FunctionComponent } from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  className?: string;
  name: string;
  type?: "number" | "float" | "string";
  parse?(val: string): unknown;
}

const FSelectParse: FunctionComponent<Props> = ({
  className,
  name,
  children,
  type = "number",
  parse = type === "string"
    ? (v) => (v === "" ? null : v)
    : type === "number"
    ? (v) => (v.length !== 0 ? parseInt(v, 10) : null)
    : (v) => (v.length !== 0 ? parseFloat(v) : null),
  ...otherProps
}) => {
  return (
    <Field name={name}>
      {({
        field: { value },
        form: { setFieldValue, setFieldTouched },
      }: FieldProps) => (
        <select
          className={classNames("select", className)}
          onBlur={() => setFieldTouched(name)}
          onChange={(event) => setFieldValue(name, parse(event.target.value))}
          value={value === null ? "" : value}
          {...otherProps}
        >
          {children}
        </select>
      )}
    </Field>
  );
};

export default FSelectParse;
