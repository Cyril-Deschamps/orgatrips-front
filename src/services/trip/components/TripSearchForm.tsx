import classNames from "classnames";
import { addYears } from "date-fns";
import { useTranslation } from "next-i18next";
import React, { useCallback, useMemo } from "react";
import { object, number, mixed, string } from "yup";
import { useCountry } from "../../countries/CountryContext";
import AutoField from "../../forms/AutoField";
import Form from "../../forms/Form";
import SubmitButton from "../../forms/SubmitButton";
import ValidationsErrors from "../../forms/ValidationsErrors";
import { useToastsWithIntl } from "../../toast-notifications";
import { AirportType, budgetMax, SearchTripsForm } from "../trip";
import { useTrip } from "../tripProvider";
import iconPlane from "../../../assets/img/icons/icon-plane.svg";
import { TFuncKey } from "react-i18next";
import { useTransition } from "../../transition/TransitionContext";
import { TRIP_LINK } from "../../../routes";
import { useRouter } from "next-translate-routes";
import { AxiosError } from "axios";
import ReactGA from "react-ga4";

const TripSearchForm = ({ className }: { className?: string }): JSX.Element => {
  const { t, i18n } = useTranslation("trip");
  const { toastError } = useToastsWithIntl("trip");
  const { searchTrips, findAirports } = useTrip();
  const { countriesList } = useCountry();
  const { triggerTransition, stopTransition } = useTransition();
  const router = useRouter();

  const findAirportsAutoComplete = useCallback(
    (currentText: string) =>
      findAirports(currentText).then((airports) =>
        airports.map((airport) => ({
          id: airport.iataCode,
          label: airport.name,
          legend: `${airport.city !== "" ? `${airport.city}, ` : ""}${
            countriesList[airport.countryCode]
          } - ${t(`AIRPORT_TYPES.${AirportType[airport.type]}` as TFuncKey)}`,
        })),
      ),
    [countriesList, findAirports, t],
  );

  const TripSchema = useMemo(
    () =>
      object()
        .shape({
          departureCity: string()
            .label(t("departure_city"))
            .nullable()
            .required()
            .suggestion({ autocompleteRequest: findAirportsAutoComplete }),
          dateRange: mixed()
            .label(t("date_range"))
            .nullable()
            .required()
            .dateRange({ min: new Date(), max: addYears(new Date(), 1) }),
          adultsNumber: number()
            .label(t("number_of_adults"))
            .oneOfEnum([...Array(16).keys()].slice(1))
            .required(),
          childrenNumber: number()
            .label(t("number_of_children"))
            .oneOfEnum([...Array(16).keys()])
            .required(),
          budgetMax: number()
            .label(t("budget_max"))
            .nullable()
            .required()
            .slider({ min: 0, max: budgetMax }),
          locale: string().required().notVisible(),
        })
        .defined(),
    [findAirportsAutoComplete, t],
  );

  return (
    <div
      className={classNames(
        className,
        "w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 pt-3 md:p-10",
      )}
    >
      <Form
        initialValues={{
          adultsNumber: 1,
          childrenNumber: 0,
          budgetMax: 3000,
          locale: i18n.language,
        }}
        onSubmit={(values: SearchTripsForm, { setSubmitting }) => {
          ReactGA.event({
            category: "Trip Search",
            action: "Trip Search Submit",
            label: "Button",
          });
          triggerTransition(t("search_trips_loading"));
          return searchTrips(values).then(
            () => {
              setSubmitting(false);
              router.push(TRIP_LINK);
              stopTransition();
            },
            (e: AxiosError) => {
              if (e.isAxiosError && e.response?.status === 422) {
                toastError("search_trips.AIRPORT_NOT_COMPATIBLE");
              } else {
                toastError("search_trips.ERROR");
              }
              setSubmitting(false);
              stopTransition();
            },
          );
        }}
        schema={TripSchema}
      >
        <AutoField
          className={"mt-[-0.7rem] p-[0.85rem]"}
          name={"departureCity"}
          otherProps={{ icon: iconPlane }}
          placeholder={t("departure_city_placeholder")}
        />
        <div className={"flex gap-x-s flex-wrap sm:flex-nowrap"}>
          <div className={"w-full sm:basis-3/5"}>
            <AutoField
              name={"dateRange"}
              placeholder={t("date_range_placeholder")}
            />
          </div>
          <div className={"w-full sm:basis-1/5"}>
            <AutoField
              className={"mt-[-0.7rem] p-[0.85rem]"}
              name={"adultsNumber"}
            />
          </div>
          <div className={"w-full sm:basis-1/5"}>
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
