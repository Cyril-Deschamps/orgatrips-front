import React, { useEffect, useRef, useState } from "react";
import { useField } from "formik";
import Autocomplete from "react-autocomplete";
import { useYupField } from "./Form";
import { AnySchema, BaseSchema } from "yup";
import { debounce } from "../utils/debounce";
import Image from "next/image";

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string;
  className: string;
  icon: string;
}

export type AutocompleteItem = {
  id: string | number;
  label: string;
  legend: string;
};

const SuggestionField = ({
  name,
  className,
  ...otherProps
}: Props): JSX.Element => {
  const [field, , helper] = useField(name);
  const fieldSchema = useYupField(name) as AnySchema;

  const { suggestion } = fieldSchema.meta() as NonNullable<
    BaseSchema["metaInterface"]
  >;

  const [items, setItems] = useState<AutocompleteItem[]>([]);
  const [currentText, setCurrentText] = useState<AutocompleteItem["label"]>("");
  const cancelToken = useRef<Record<string, never> | null>(null);

  const debouncedRequest = useRef(
    debounce((text: string) => {
      const currentCancelToken = {};
      cancelToken.current = currentCancelToken;

      try {
        suggestion!.autocompleteRequest(text).then((data) => {
          if (currentCancelToken === cancelToken.current) {
            const perfectMatch = data.find(
              (item: AutocompleteItem) => item.label === text,
            );
            if (perfectMatch) {
              setItems([]);
              helper.setValue(perfectMatch.id);
            } else setItems(data);
          }
        });
      } catch {
        /* Handle error */
      }
    }, 300),
  );

  useEffect(() => {
    debouncedRequest.current(currentText);
  }, [currentText, debouncedRequest, suggestion]);

  return (
    <Autocomplete
      getItemValue={(item: AutocompleteItem) => item.label}
      items={items}
      onChange={(e) => {
        setCurrentText(e.currentTarget.value);
        if (field.value && field.value !== null) helper.setValue(null);
      }}
      onSelect={(label, item: AutocompleteItem) => {
        helper.setValue(item.id);
        setCurrentText(label);
      }}
      renderInput={(props) => (
        <input className={className} {...props} {...otherProps} />
      )}
      renderItem={(item: AutocompleteItem) => (
        <li
          key={item.id}
          className={
            "flex items-center px-3 py-3 text-sm text-gray-600 transition-colors duration-300 transform hover:bg-gray-100 cursor-pointer"
          }
        >
          {otherProps?.icon && (
            <Image
              alt={"icon-suggestion"}
              className={"w-5 ml-2 mr-1"}
              src={otherProps.icon}
            />
          )}
          <div>
            <p className={"font-bold ml-4"}>{item.label}</p>
            <p className={"font-light ml-4"}>{item.legend}</p>
          </div>
        </li>
      )}
      renderMenu={(items) =>
        items.length > 0 ? (
          <ul
            className={
              "absolute z-20 w-full mt-2 border bg-white rounded-md shadow-xl"
            }
          >
            {items}
          </ul>
        ) : (
          <></>
        )
      }
      value={currentText}
      wrapperStyle={{ position: "relative" }}
    />
  );
};

export default SuggestionField;
