import classNames from "classnames";
import { useField } from "formik";
import { useCallback, useEffect, useState } from "react";
import InputRange, { InputRangeProps, Range } from "react-input-range";
import "react-input-range/lib/css/index.css";
import { AnySchema } from "yup";
import { useYupField } from "./Form";

interface Props extends Omit<InputRangeProps, "onChange" | "value"> {
  name: string;
  id: string;
  className: string;
}

export interface NumberRange extends Range {}

const NumberRangeField = ({
  name,
  className,
  ...otherProps
}: Props): JSX.Element => {
  const [field, , helper] = useField<NumberRange>(name);
  const fieldSchema = useYupField(name) as AnySchema;

  const minValue = fieldSchema.meta()!.numberRange!.min;
  const maxValue = fieldSchema.meta()!.numberRange!.max;

  const [values, setValues] = useState<NumberRange>(
    field.value ?? {
      min: minValue,
      max: maxValue,
    },
  );

  useEffect(() => {
    setValues(
      field.value ?? {
        min: minValue,
        max: maxValue,
      },
    );
  }, [field.value, maxValue, minValue]);

  const valueValidation: (value: number, isMin: boolean) => number = (
    value,
    isMin,
  ) => {
    if (isMin) {
      return value <= values.max
        ? value >= minValue
          ? parseInt(value.toString())
          : minValue
        : values.max;
    } else {
      return value >= values.min
        ? value <= maxValue
          ? parseInt(value.toString())
          : maxValue
        : values.min;
    }
  };

  const valuesValidation: (value: NumberRange) => NumberRange = (value) => {
    return {
      min: valueValidation(value.min, true),
      max: valueValidation(value.max, false),
    };
  };

  const debounce = (ms = 25) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let count = 0;
    return (value: NumberRange) => {
      count += 1;
      clearTimeout(timeoutId);
      if (count > 10) {
        setValues(valuesValidation(value));
        count = 0;
      } else {
        timeoutId = setTimeout(() => setValues(valuesValidation(value)), ms);
      }
    };
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const optimizedFn = useCallback(debounce(), []);

  return (
    <div className={classNames(className, "px-2xl md:px-3xl py-2xl")}>
      <InputRange
        {...otherProps}
        classNames={{
          activeTrack:
            "input-range__track input-range__track--active !bg-green",
          disabledInputRange: "input-range input-range--disabled",
          inputRange: "input-range",
          labelContainer: "input-range__label-container",
          maxLabel: "input-range__label input-range__label--max",
          minLabel: "input-range__label input-range__label--min",
          slider: "!bg-green !border-green input-range__slider",
          sliderContainer: "input-range__slider-container",
          track: "input-range__track input-range__track--background",
          valueLabel: "hidden",
        }}
        maxValue={maxValue}
        minValue={minValue}
        onChange={(numberRange: NumberRange) => optimizedFn(numberRange)}
        onChangeComplete={() => helper.setValue(values)}
        value={values}
        allowSameValues
      />

      <div className={"grid grid-cols-2 pt-2xl gap-s md:gap-3xl"}>
        <div>
          <label htmlFor={"minimum"}>Minimum</label>
          <input
            className={className}
            id={"minimum"}
            name={"minimum"}
            onChange={(event) =>
              setValues((values) =>
                event.target.value === ""
                  ? { ...values }
                  : {
                      ...values,
                      min: valueValidation(event.target.valueAsNumber, true),
                    },
              )
            }
            type={"number"}
            value={values?.min.toString()}
          />
        </div>
        <div>
          <label htmlFor={"maximum"}>Maximum</label>
          <input
            className={className}
            id={"maximum"}
            name={"maximum"}
            onChange={(event) =>
              setValues((values) =>
                event.target.value === ""
                  ? { ...values }
                  : {
                      ...values,
                      max: valueValidation(event.target.valueAsNumber, false),
                    },
              )
            }
            type={"number"}
            value={values?.max}
          />
        </div>
      </div>
    </div>
  );
};

export default NumberRangeField;
