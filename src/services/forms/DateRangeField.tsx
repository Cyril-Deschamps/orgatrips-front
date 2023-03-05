import classNames from "classnames";
import { format } from "date-fns";
import { useField } from "formik";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import { AnySchema } from "yup";
import { useDate } from "../date/DateContext";
import { PartialNullable } from "../types/utility";
import { useYupField } from "./Form";

import ChevronLeft from "../../assets/img/icons/chevron-left.svg";
import ChevronRight from "../../assets/img/icons/chevron-right.svg";
import Image from "next/image";

interface Props<CustomModifierNames extends string = never>
  extends Omit<
    ReactDatePickerProps<CustomModifierNames, true>,
    "onChange" | "selected"
  > {
  name: string;
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

const DateRangeField = ({
  name,
  dateFormat,
  className,
  ...otherProps
}: Props): JSX.Element => {
  const [field, , helper] = useField<PartialNullable<DateRange>>(name);
  const fieldSchema = useYupField(name) as AnySchema;
  const { locale } = useDate();

  return (
    <div className={"relative"}>
      <DatePicker
        className={classNames("input", className)}
        endDate={field.value?.endDate}
        locale={locale}
        maxDate={fieldSchema.meta()!.dateRange!.max}
        minDate={fieldSchema.meta()!.dateRange!.min}
        nextMonthButtonLabel={">"}
        onChange={(date) =>
          helper.setValue({ startDate: date[0], endDate: date[1] })
        }
        popperClassName={"react-datepicker-left"}
        previousMonthButtonLabel={"<"}
        selected={field.value?.startDate}
        startDate={field.value?.startDate}
        selectsRange
        {...otherProps}
        dateFormat={
          dateFormat ? dateFormat : locale.formatLong?.date({ width: "short" })
        }
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className={"flex items-center justify-between px-2 py-2"}>
            <span className={"text-lg text-gray-700"}>
              {format(date, "MMMM yyyy")}
            </span>
            <div className={"space-x-2"}>
              <button
                className={classNames(
                  prevMonthButtonDisabled && "cursor-not-allowed opacity-50",
                  "inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500",
                )}
                disabled={prevMonthButtonDisabled}
                onClick={decreaseMonth}
                type={"button"}
              >
                <Image
                  alt={"left"}
                  className={"w-5 h-5 text-gray-600"}
                  src={ChevronLeft}
                />
              </button>
              <button
                className={
                  (classNames(
                    nextMonthButtonDisabled && "cursor-not-allowed opacity-50",
                  ),
                  "inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500")
                }
                disabled={nextMonthButtonDisabled}
                onClick={increaseMonth}
                type={"button"}
              >
                <Image
                  alt={"right"}
                  className={"w-5 h-5 text-gray-600"}
                  src={ChevronRight}
                />
              </button>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default DateRangeField;
