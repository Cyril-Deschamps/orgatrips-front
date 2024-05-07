import { addMethod, date, mixed, string, array, object, number } from "yup";
import { getNumericEnumEntries } from "../data-structures/enum";
import { Namespace, TFuncKey } from "react-i18next";
import { AutocompleteItem } from "../forms/SuggestionField";
import Reference from "yup/lib/Reference";

addMethod(
  string,
  "password",
  function (regex: RegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/) {
    return this.required()
      .meta({ password: true })
      .matches(regex, {
        message: { key: "user.password.matches" },
      });
  },
);

addMethod(string, "passwordConfirmation", function (ref: Reference) {
  return (
    this.required()
      .meta({ password: true })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .equals([ref], { key: "user.password.equals" }) as any
  );
});

addMethod(date, "time", function () {
  return this.meta({ time: true });
});

addMethod(mixed, "disabled", function () {
  return this.test("disabled", () => true);
});

addMethod(mixed, "notEditable", function (isNotEditable: boolean = true) {
  return isNotEditable
    ? this.nullable().optional().meta({ disabled: true })
    : this;
});

addMethod(mixed, "notVisible", function (isNotVisible: boolean = true) {
  return isNotVisible ? this.meta({ notVisible: true }) : this;
});

addMethod(string, "multiline", function () {
  return this.meta({ multiline: true });
});

addMethod(string, "richText", function () {
  return this.meta({ richText: true });
});

addMethod(mixed, "radio", function () {
  return this.meta({ radio: true });
});

addMethod(
  string,
  "suggestion",
  function (options: {
    autocompleteRequest: (searchText: string) => Promise<AutocompleteItem[]>;
  }) {
    return this.meta({ suggestion: options });
  },
);

addMethod(object, "dateRange", function (range: { min: number; max: number }) {
  return this.meta({ dateRange: range });
});

addMethod(
  number,
  "slider",
  function (range: { min: number; max: number; unit?: string }) {
    return this.meta({ slider: range });
  },
);

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
