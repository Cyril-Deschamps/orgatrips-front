import React, { useEffect, useMemo, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next";
import nextI18NextConfig from "../../next-i18next.config";
import { Trans, useTranslation } from "next-i18next";
import Image from "next/image";
import BaseSeo from "../services/seo/BaseSeo";
import Link from "next/link";
import HomeIcon from "../assets/img/icons/icon-home.svg";
import { TRIPS_STORAGE_KEY, useTrip } from "../services/trip/tripProvider";
import TripListItem from "../services/trip/components/TripListItem";
import router from "next-translate-routes/router";
import { BASE_LINK } from "../routes";
import { useDate } from "../services/date/DateContext";
import { TFuncKey } from "react-i18next";
import PaginatedList from "../services/ui/PaginatedList";
import { SortingOption } from "../services/trip/trip";
import { orderByField } from "../services/data-structures/array";
import classNames from "classnames";

const Trips = (): JSX.Element => {
  const { t } = useTranslation(["trips_results"]);
  const { trips } = useTrip();
  const { formatDate } = useDate();
  const [sortingOption, setSortingOption] = useState<SortingOption>(
    SortingOption.POPULARITY,
  );

  const sortedTrips = useMemo(() => {
    switch (sortingOption) {
      case SortingOption.POPULARITY:
        return [...trips].sort(orderByField("popularity", true));
      case SortingOption.CHEAPER:
        return [...trips].sort(orderByField("totalPrice"));
    }
  }, [sortingOption, trips]);

  useEffect(() => {
    if (trips.length === 0) {
      const trips = localStorage.getItem(TRIPS_STORAGE_KEY);
      if (!trips || (trips && JSON.parse(trips).length === 0)) {
        router.replace(BASE_LINK);
      }
    }
  });

  const maxPrice = useMemo(
    () => Math.max(...trips.map((trip) => trip.totalPrice)),
    [trips],
  );

  const minNightsNumber = useMemo(
    () => Math.min(...trips.map((trip) => trip.nightsNumber)),
    [trips],
  );

  const maxNightsNumber = useMemo(
    () => Math.max(...trips.map((trip) => trip.nightsNumber)),
    [trips],
  );

  return (
    <div className={"bg-appBgColor"}>
      <BaseSeo
        description={t("trips_results:page_description")}
        title={t("trips_results:page_title")}
      />
      <div className={"container mx-auto px-4 py-8"}>
        <div className={"flex items-center gap-s justify-between"}>
          <h1
            className={
              "text-green font-VarsityTeam leading-8 md:w-full text-3xl md:text-4xl lg:text-5xl font-medium"
            }
          >
            {t("trips_results:main_title")}
          </h1>
          <Link className={"p-1 rounded-md bg-green"} href={".."}>
            <Image alt={"Back home"} className={"w-8 md:w-9"} src={HomeIcon} />
          </Link>
        </div>
        {trips.length > 0 && (
          <p
            className={
              "text-center sm:inline-block block font-roboto font-medium text-xs text-white mt-5 p-3 leading-5 bg-blue rounded"
            }
          >
            <Trans
              count={trips[0].travelersNumber}
              i18nKey={"trips_results:trip_info" as TFuncKey}
              values={{
                maxPrice: maxPrice,
                count: trips[0].travelersNumber,
                departureDate: formatDate(
                  trips[0].Transportation.departureDate,
                  "P",
                ),
                returnDate: formatDate(trips[0].Transportation.returnDate, "P"),
              }}
            />
            {" - "}
            <span className={"whitespace-nowrap"}>
              {minNightsNumber === maxNightsNumber ? (
                <Trans
                  count={trips[0].travelersNumber}
                  i18nKey={"trips_results:nights_number" as TFuncKey}
                  values={{
                    count: trips[0].nightsNumber,
                  }}
                />
              ) : (
                <Trans
                  i18nKey={"trips_results:multiple_nights_number" as TFuncKey}
                  values={{
                    minNightsNumber,
                    maxNightsNumber,
                  }}
                />
              )}
            </span>
          </p>
        )}

        <div
          className={
            "border-t border-gray-400 pt-4 mt-5 mb-4 flex justify-between items-center flex-wrap-reverse gap-s"
          }
        >
          <p className={"text-gray-500 font-bold text-xs pl-1"}>
            <Trans
              count={trips.length}
              i18nKey={"trips_results:results_number" as TFuncKey}
              values={{ count: trips.length }}
            />
          </p>
          <div className={"flex gap-3 overflow-x-scroll whitespace-nowrap"}>
            {Object.values(SortingOption).map((sortName) => (
              <button
                key={sortName}
                className={classNames(
                  "text-xs border rounded-full p-1 px-2 cursor-pointer",
                  sortName === sortingOption
                    ? "text-white border-blue bg-blue"
                    : "text-gray-600 border-gray-400",
                )}
                onClick={() => setSortingOption(sortName)}
                type={"button"}
              >
                {t(`trips_results:sorting_option_${sortName}`)}
              </button>
            ))}
          </div>
        </div>
        <PaginatedList
          className={"grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}
          id={"trip-list"}
          items={sortedTrips}
          paginatedBy={12}
          render={(trip) => (
            <TripListItem key={trip.destinationName} trip={trip} />
          )}
        />
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale ?? "en",
      ["trips_results", "website"],
      nextI18NextConfig,
    )),
  },
});

export default Trips;
