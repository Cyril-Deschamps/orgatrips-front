import "yup";
import { AnyObject, Maybe } from "yup/lib/types";
import Reference from "yup/lib/Reference";
import { Namespace, TFuncKey } from "next-i18next";

declare module "yup" {
  interface StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType,
  > extends BaseSchema<TType, TContext, TOut> {
    password(): this;
    multiline(): this;
  }

  interface DateSchema<
    TType extends Maybe<Date>,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType,
  > extends BaseSchema<TType, TContext, TOut> {
    time(): this;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface BaseSchema<TCast, TContext, TOutput> {
    metaInterface?: {
      password?: boolean;
      multiline?: boolean;
      time?: boolean;
      disabled?: boolean;
      translate?: [string, string];
      enum?:
        | Record<string | number, string | number>
        | Array<string | number | null>;
      select?: boolean;
      notVisible?: boolean;
      radio?: boolean;
      autocomplete?: boolean;
      multiselect?: boolean;
      stringEnum?: boolean;
    };

    notEditable(isNotEditable?: boolean): this;
    notVisible(isNotVisible?: boolean): this;
    radio(): this;
    meta(): this["metaInterface"];
    meta(obj: Partial<this["metaInterface"]>): this;

    autocomplete<N extends Namespace>(
      values: Record<string | number | symbol, unknown>,
      translateNS: N,
      translateKey: TKeyWithParam,
      multiselect: boolean,
    ): this;

    oneOfEnum<
      U extends Record<string | number | symbol, unknown>,
      N extends Namespace,
      TKey extends TFuncKey<N>,
      TKeyWithParam extends TKey extends `${infer A}.${keyof U}` ? A : never,
    >(
      objectEnum: U,
      translateNS: N,
      translateKey: TKeyWithParam,
      nullValue?: boolean,
    ): this;

    oneOfEnum<
      U extends TCast,
      N extends Namespace,
      TKey extends TFuncKey<N>,
      TKeyWithParam extends TKey extends `${infer A}.${U}` ? A : never,
    >(
      enums: Array<Maybe<U> | Reference>,
      translateNS?: N,
      translateKey?: TKeyWithParam,
      nullValue?: boolean,
    ): this;

    oneOfEnum<U extends TCast>(enums: Array<Maybe<U> | Reference>): this;
  }
}
