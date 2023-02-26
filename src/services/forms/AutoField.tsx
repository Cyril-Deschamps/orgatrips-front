import { useYupField } from "./Form";
import { AnySchema } from "yup";
import { ReactElement, useMemo } from "react";
import TextField from "./TextField";
import EmailField from "./EmailField";
import PasswordField from "./PasswordField";
import NumberField from "./NumberField";
import DateField from "./DateField";
import TextareaField from "./TextareaField";
import FSelect from "./FSelect";
import FAutoComplete from "./FAutoComplete";

interface Props {
  name: string;
  placeholder?: string;
  className?: string;
  id?: string;
  unit?: string;
  children?: ReactElement;
  disabled?: boolean;
  afterValueChanged?(value: unknown): void;
  otherProps?: object;
}

enum FieldType {
  String,
  Textarea,
  Number,
  Select,
  Email,
  Password,
  Date,
  DateTime,
  AutoComplete,
}

function getFieldType(fieldSchema: AnySchema): FieldType {
  if (fieldSchema.tests.find((t) => t.OPTIONS.name === "email")) {
    return FieldType.Email;
  }
  if (fieldSchema.meta()?.password) {
    return FieldType.Password;
  }
  if (fieldSchema.meta()?.multiline) {
    return FieldType.Textarea;
  }
  if (fieldSchema.meta()?.select) {
    return FieldType.Select;
  }
  if (fieldSchema.type === "number") {
    return FieldType.Number;
  }
  if (fieldSchema.type === "date") {
    return fieldSchema.meta()?.time ? FieldType.DateTime : FieldType.Date;
  }
  if (fieldSchema.meta()?.autocomplete) {
    return FieldType.AutoComplete;
  }
  return FieldType.String;
}

const AutoField = ({
  name,
  placeholder,
  className,
  id,
  unit,
  children,
  disabled,
  afterValueChanged,
  otherProps,
}: Props): JSX.Element | null => {
  const fieldSchema = useYupField(name) as AnySchema;

  const isRequired = useMemo(
    () => !!fieldSchema.tests.find((t) => t.OPTIONS.name === "required"),
    [fieldSchema],
  );

  const fieldType = useMemo(() => getFieldType(fieldSchema), [fieldSchema]);

  const isDisabled = useMemo(() => fieldSchema.meta()?.disabled, [fieldSchema]);

  if (fieldSchema.meta()?.notVisible) return null;

  return (
    <div className={"form-block"}>
      <label className={"input-label"} htmlFor={id || name}>
        {fieldSchema.spec.label} {unit && ` (${unit})`}
        {isRequired && "*"}
      </label>
      {fieldType === FieldType.Email && (
        <EmailField
          className={className}
          disabled={isDisabled}
          id={id || name}
          name={name}
          placeholder={placeholder}
          {...otherProps}
        />
      )}
      {fieldType === FieldType.Password && (
        <PasswordField
          className={className}
          disabled={isDisabled}
          id={id || name}
          name={name}
          placeholder={placeholder}
          {...otherProps}
        />
      )}
      {fieldType === FieldType.String && (
        <TextField
          className={className}
          disabled={isDisabled}
          id={id || name}
          name={name}
          placeholder={placeholder}
          {...otherProps}
        />
      )}
      {fieldType === FieldType.Textarea && (
        <TextareaField
          className={className}
          disabled={isDisabled}
          id={id || name}
          name={name}
          placeholder={placeholder}
          {...otherProps}
        />
      )}
      {fieldType === FieldType.Number && (
        <NumberField
          className={className}
          disabled={isDisabled}
          id={id || name}
          name={name}
          placeholder={placeholder}
          {...otherProps}
        />
      )}
      {(fieldType === FieldType.Date || fieldType === FieldType.DateTime) && (
        <DateField
          className={className}
          disabled={isDisabled}
          id={id || name}
          maxDate={new Date()}
          minDate={new Date(1900, 1, 1)}
          name={name}
          placeholderText={placeholder}
          showTimeSelect={fieldType === FieldType.DateTime}
          {...otherProps}
        />
      )}
      {fieldType === FieldType.Select && (
        <FSelect
          className={className}
          disabled={isDisabled}
          id={id || name}
          name={name}
          placeholder={placeholder}
          radio={fieldSchema.meta()?.radio}
          {...otherProps}
        />
      )}
      {fieldType === FieldType.AutoComplete && (
        <FAutoComplete
          afterValueChanged={afterValueChanged}
          className={className}
          disabled={isDisabled || disabled}
          multiselect={fieldSchema.meta()?.multiselect}
          name={name}
          {...otherProps}
        />
      )}
      {children}
    </div>
  );
};

export default AutoField;
