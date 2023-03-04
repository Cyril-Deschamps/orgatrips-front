import { addMethod, date, mixed, string, array, object, number } from "yup";
import { getNumericEnumEntries } from "../data-structures/enum";
import { Namespace, TFuncKey } from "react-i18next";

addMethod(string, "password", function () {
  return this.required().meta({ password: true });
});

addMethod(date, "time", function () {
  return this.meta({ time: true });
});

addMethod(mixed, "disabled", function () {
  return this.test("disabled", () => true);
});

addMethod(mixed, "notEditable", function (isNotEditable: boolean = true) {
  return isNotEditable
    ? this.nullable()
        .optional()
        .meta({ disabled: true })
        .transform(() => undefined)
    : this;
});

addMethod(mixed, "notVisible", function (isNotVisible: boolean = true) {
  return isNotVisible
    ? this.nullable()
        .optional()
        .meta({ notVisible: true })
        .transform(() => null)
    : this;
});

addMethod(string, "multiline", function () {
  return this.meta({ multiline: true });
});

addMethod(mixed, "radio", function () {
  return this.meta({ radio: true });
});

addMethod(mixed, "dateRange", function (range: { min: number; max: number }) {
  return this.meta({ dateRange: range });
});

addMethod(mixed, "numberRange", function (range: { min: number; max: number }) {
  return this.meta({ numberRange: range });
});

addMethod(
  array,
  "autocomplete",
  function (
    values: Record<string | number | symbol, unknown>,
    namespace: Namespace,
    baseKey: TFuncKey<Namespace>,
    multiselect: boolean,
  ) {
    return this.defined()
      .of(
        object().shape({
          label: string().required(),
          value: string().required(),
        }),
      )
      .meta({
        enum: values,
        autocomplete: true,
        multiselect,
        translate: [namespace, baseKey],
      });
  },
);

addMethod(
  mixed,
  "oneOfEnum",
  function (
    values: Record<string | number | symbol, unknown> | Array<unknown>,
    namespace?: Namespace,
    baseKey?: TFuncKey<Namespace>,
    nullValue?: boolean,
  ) {
    if (Array.isArray(values)) {
      return this.clone({ nullable: nullValue ? true : this.spec.nullable })
        .oneOf(values.concat(nullValue ? [null] : []))
        .meta({
          translate: namespace ? [namespace, baseKey] : undefined,
          enum: values,
          select: true,
        });
    } else {
      const numericEntries = getNumericEnumEntries(values);
      return this.clone({ nullable: nullValue ? true : this.spec.nullable })
        .oneOf(
          (numericEntries as (number | null)[][])
            .map(([id]) => id)
            .concat(nullValue ? [null] : []),
        )
        .meta({
          translate: namespace ? [namespace, baseKey] : undefined,
          enum: values,
          select: true,
        });
    }
  },
);
