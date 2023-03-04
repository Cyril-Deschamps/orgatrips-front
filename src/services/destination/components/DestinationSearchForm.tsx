import classNames from "classnames";
import { addYears } from "date-fns";
import { useTranslation } from "next-i18next";
import React, { useMemo } from "react";
import { object, number, mixed } from "yup";
import AutoField from "../../forms/AutoField";
import Form from "../../forms/Form";
import SubmitButton from "../../forms/SubmitButton";
import ValidationsErrors from "../../forms/ValidationsErrors";
import { useToastsWithIntl } from "../../toast-notifications";
import { budgetMinMax, SearchDestinationForm } from "../destination";

const TripSearchForm = ({ className }: { className?: string }): JSX.Element => {
  const { t } = useTranslation("destination");
  const { toastError } = useToastsWithIntl("destination");

  const DestinationSchema = useMemo(
    () =>
      object()
        .shape({
          rangeDateOfDeparture: mixed()
            .label(t("start_date_range"))
            .nullable()
            .required()
            .dateRange({ min: new Date(), max: addYears(new Date(), 1) }),
          budget: mixed()
            .label(t("budget"))
            .nullable()
            .required()
            .numberRange(budgetMinMax),
          numberOfAdults: number()
            .label(t("number_of_adults"))
            .nullable()
            .oneOfEnum([...Array(30).keys()])
            .required(),
          numberOfChildren: number()
            .label(t("number_of_children"))
            .nullable()
            .oneOfEnum([...Array(30).keys()])
            .required(),
        })
        .defined(),
    [t],
  );

  return (
    <div
      className={classNames(
        className,
        "w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 md:p-10",
      )}
    >
      <Form
        initialValues={{
          numberOfAdults: 1,
          numberOfChildren: 0,
          budget: budgetMinMax,
        }}
        onSubmit={(values: SearchDestinationForm, { setSubmitting }) =>
          new Promise(() => {
            setSubmitting(false);
            toastError("search_destination.ERROR");
            return Promise.resolve();
          })
        }
        schema={DestinationSchema}
      >
        <AutoField name={"rangeDateOfDeparture"} />
        <div className={"flex gap-x-s flex-wrap sm:flex-nowrap"}>
          <div className={"w-full sm:basis-3/5"}>
            <AutoField
              className={"mt-[-0.7rem] p-[0.85rem]"}
              name={"numberOfAdults"}
            />
          </div>
          <div className={"w-full sm:basis-2/5"}>
            <AutoField
              className={"mt-[-0.7rem] p-[0.85rem]"}
              name={"numberOfChildren"}
            />
          </div>
        </div>
        <AutoField
          name={"budget"}
          otherProps={{ formatLabel: (value: number) => `${value} $` }}
        />

        <div className={"pt-l flex items-center flex-col"}>
          <ValidationsErrors />
          <SubmitButton className={"uppercase"}>
            {t("find_destinations")}
          </SubmitButton>
        </div>
      </Form>
    </div>
  );
};

export default TripSearchForm;
