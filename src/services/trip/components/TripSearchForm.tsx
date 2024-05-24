import { twMerge } from "tailwind-merge";
import { addYears } from "date-fns";
import { useTranslation } from "next-i18next";
import React, { useCallback, useMemo, useState } from "react";
import { object, number, string, date } from "yup";
import { useCountry } from "../../countries/CountryContext";
import AutoField from "../../forms/AutoField";
import Form from "../../forms/Form";
import SubmitButton from "../../forms/SubmitButton";
import ValidationsErrors from "../../forms/ValidationsErrors";
import { useToastsWithIntl } from "../../toast-notifications";
import {
  AirportType,
  budgetMax,
  searchAndSaveTrips,
  SearchTripsForm,
} from "../trip";
import iconPlane from "../../../assets/img/icons/icon-plane.svg";
import { useTransition } from "../../transition/TransitionContext";
import { TRIP_LINK } from "../../../routes";
import { AxiosError } from "axios";
import { event } from "nextjs-google-analytics";
import ValueObserver from "../../forms/ValueObserver";
import Image from "next/image";
import InfoIcon from "../../../assets/img/icons/icon-info.svg";
import { useRouter } from "next/router";
import { findAirports } from "../api";
import GoToLastSearchButton from "./GoToLastSearchButton";

const TripSearchForm = ({ className }: { className?: string }): JSX.Element => {
  const { t, i18n } = useTranslation("trip");
  const { toastError } = useToastsWithIntl("trip");
  const { countriesList } = useCountry();
  const { triggerTransition, stopTransition } = useTransition();
  const router = useRouter();
  const [adultsNumber, setAdultsNumber] = useState(1);

  const findAirportsAutoComplete = useCallback(
    (currentText: string) =>
      findAirports(currentText).then(({ data: airports }) =>
        airports.map((airport) => ({
          id: airport.iataCode,
          label: airport.name,
          legend: `${airport.city !== "" ? `${airport.city}, ` : ""}${
            countriesList[airport.countryCode]
          } - ${t(
            `AIRPORT_TYPES.${
              AirportType[airport.type] as keyof typeof AirportType
            }`,
          )}`,
        })),
      ),
    [countriesList, t],
  );

  const adultsNumberEnum = useMemo(() => [...Array(10).keys()].slice(1), []);
  const childrenNumberEnum = useMemo(
    () => [...Array(10 - adultsNumber).keys()],
    [adultsNumber],
  );

  const TripSchema = useMemo(
    () =>
      object()
        .shape({
          departureIataCode: string()
            .label(t("departure_iata_code"))
            .nullable()
            .required()
            .suggestion({ autocompleteRequest: findAirportsAutoComplete }),
          dateRange: object()
            .label(t("date_range"))
            .nullable()
            .required()
            .shape({
              startDate: date().required().label(t("date_range_start")),
              endDate: date().required().label(t("date_range_end")),
            })
            .dateRange({
              min: new Date(),
              max: addYears(new Date(), 1),
            }),
          adultsNumber: number()
            .label(t("number_of_adults"))
            .oneOfEnum(adultsNumberEnum)
            .required(),
          childrenNumber: number()
            .label(t("number_of_children"))
            .oneOfEnum(childrenNumberEnum)
            .notEditable(adultsNumber === 9)
            .required(),
          budgetMax: number()
            .label(t("budget_max"))
            .nullable()
            .required()
            .max(budgetMax)
            .slider({ min: 0, max: budgetMax, unit: "$" }),
          locale: string().required().notVisible(),
        })
        .defined(),
    [
      adultsNumber,
      adultsNumberEnum,
      childrenNumberEnum,
      findAirportsAutoComplete,
      t,
    ],
  );

  return (
    <div
      className={twMerge(
        "w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 pt-3 md:p-10",
        className,
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
          event("Trip Search Submit", {
            category: "Trip Search",
            label: "Button",
          });
          triggerTransition(t("search_trips_loading"));
          return searchAndSaveTrips(values).then(
            () => {
              setSubmitting(false);
              router.push(TRIP_LINK).then(stopTransition);
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
        <ValueObserver
          name={"adultsNumber"}
          setValueCallback={(value) =>
            setAdultsNumber((value as number | undefined) || 1)
          }
        />
        <AutoField
          name={"departureIataCode"}
          otherProps={{ icon: iconPlane }}
          placeholder={t("departure_iata_code_placeholder")}
        />
        <div className={"flex gap-x-s flex-wrap sm:flex-nowrap"}>
          <div className={"w-full sm:basis-3/5"}>
            <AutoField
              name={"dateRange"}
              otherProps={{ datesSelectionInfo: t("select_dates_info") }}
              placeholder={t("date_range_placeholder")}
            />
          </div>
          <div className={"w-full sm:basis-1/5"}>
            <AutoField name={"adultsNumber"} />
          </div>
          <div className={"w-full sm:basis-1/5"}>
            <AutoField name={"childrenNumber"} />
          </div>
        </div>
        {adultsNumber !== 1 && (
          <div
            className={
              "flex bg-gray-100 p-2 items-center gap-2 rounded-md mt-1 mb-3"
            }
          >
            <Image alt={"info"} className={"w-5 h-5"} src={InfoIcon} />

            <p className={"text-xs"}>{t("travelers_number_info")}</p>
          </div>
        )}

        <AutoField name={"budgetMax"} />

        <AutoField name={"locale"} />

        <div className={"pt-l flex items-center flex-col"}>
          <ValidationsErrors />
          <SubmitButton className={"uppercase"}>{t("find_trips")}</SubmitButton>
          <GoToLastSearchButton
            className={"mt-s bg-transparent text-black font-bold"}
          />
        </div>
      </Form>
    </div>
  );
};

export default TripSearchForm;
