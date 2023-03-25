import classNames from "classnames";
import { addYears } from "date-fns";
import { useTranslation } from "next-i18next";
import React, { useMemo } from "react";
import { object, number, mixed, string } from "yup";
import AutoField from "../../forms/AutoField";
import Form from "../../forms/Form";
import SubmitButton from "../../forms/SubmitButton";
import ValidationsErrors from "../../forms/ValidationsErrors";
import { useToastsWithIntl } from "../../toast-notifications";
import { budgetMax, SearchTripForm } from "../trip";

const TripSearchForm = ({ className }: { className?: string }): JSX.Element => {
  const { t } = useTranslation("trip");
  const { toastError } = useToastsWithIntl("trip");
  const { i18n } = useTranslation();

  const TripSchema = useMemo(
    () =>
      object()
        .shape({
          departureCity: string()
            .label(t("departure_city"))
            .nullable()
            .required(),
          dateRange: mixed()
            .label(t("date_range"))
            .nullable()
            .required()
            .dateRange({ min: new Date(), max: addYears(new Date(), 1) }),
          adultsNumber: number()
            .label(t("number_of_adults"))
            .nullable()
            .oneOfEnum([...Array(30).keys()])
            .required(),
          childrenNumber: number()
            .label(t("number_of_children"))
            .nullable()
            .oneOfEnum([...Array(30).keys()])
            .required(),
          budgetMax: number()
            .label(t("budget_max"))
            .nullable()
            .required()
            .slider({ min: 0, max: budgetMax }),
          locale: string().nullable().required().notVisible(),
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
          adultsNumber: 1,
          childrenNumber: 0,
          budgetMax: 3000,
          locale: i18n.language,
        }}
        onSubmit={(values: SearchTripForm, { setSubmitting }) =>
          new Promise(() => {
            setSubmitting(false);
            toastError("search_trips.ERROR");
            return Promise.resolve();
          })
        }
        schema={TripSchema}
      >
        <div className={"w-full"}>
          <AutoField
            className={"mt-[-0.7rem] p-[0.85rem]"}
            name={"departureCity"}
          />
        </div>
        <div className={"flex gap-x-s flex-wrap sm:flex-nowrap"}>
          <div className={"w-full sm:basis-3/5"}>
            <AutoField
              className={"mt-[-0.7rem] p-[0.85rem]"}
              name={"adultsNumber"}
            />
          </div>
          <div className={"w-full sm:basis-2/5"}>
            <AutoField
              className={"mt-[-0.7rem] p-[0.85rem]"}
              name={"childrenNumber"}
            />
          </div>
        </div>
        <AutoField name={"budgetMax"} />

        <AutoField name={"locale"} />

        <div className={"pt-l flex items-center flex-col"}>
          <ValidationsErrors />
          <SubmitButton className={"uppercase"}>{t("find_trips")}</SubmitButton>
        </div>
      </Form>
    </div>
  );
};

export default TripSearchForm;
