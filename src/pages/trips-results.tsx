import React, { useEffect, useMemo } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next";
import nextI18NextConfig from "../../next-i18next.config";
import { Trans, useTranslation } from "next-i18next";
import Image from "next/image";
import BaseSeo from "../services/seo/BaseSeo";
import Link from "next/link";
import LeftChevron from "../assets/img/icons/icon-chevron-left.svg";
import { TRIPS_STORAGE_KEY, useTrip } from "../services/trip/tripProvider";
import TripListItem from "../services/trip/components/TripListItem";
import router from "next-translate-routes/router";
import { BASE_LINK } from "../routes";
import { useDate } from "../services/date/DateContext";
import { TFuncKey } from "react-i18next";

const Trips = (): JSX.Element => {
  const { t } = useTranslation(["trips_results"]);
  const { trips } = useTrip();
  const { formatDate } = useDate();

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
        <div className={"flex items-center gap-s"}>
          <Link className={"w-10"} href={".."}>
            <Image alt={"back"} className={"w-full"} src={LeftChevron} />
          </Link>
          <h1
            className={
              "text-green font-VarsityTeam leading-8 md:w-full text-3xl md:text-4xl font-medium"
            }
          >
            {t("trips_results:main_title")}
          </h1>
        </div>
        {trips.length > 0 && (
          <p className={"font-roboto font-medium text-s pt-5 p-2 leading-7"}>
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
          </p>
        )}

        <div className={"mt-6"}>
          <p className={"mb-3 text-gray-500 text-xs pl-1"}>
            <Trans
              count={trips.length}
              i18nKey={"trips_results:sortedByRating" as TFuncKey}
              values={{ count: trips.length }}
            />
          </p>
          <div
            className={"grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}
          >
            {trips.map((trip) => (
              <TripListItem key={trip.destinationName} trip={trip} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale ?? "en",
      ["trips_results"],
      nextI18NextConfig,
    )),
  },
});

export default Trips;
