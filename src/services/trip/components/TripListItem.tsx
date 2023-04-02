import { useTranslation } from "next-i18next";
import Image from "next/image";
import React from "react";
import { Trip } from "../trip";
import tripImageBasic from "../../../assets/img/trip-image-basic.jpg";
import useFileAsObjectURL from "../../files/useFileAsObjectURL";
import Link from "next/link";
import { format } from "date-fns";
import BlankImage from "../../../assets/img/blank.svg";
import BookingLogo from "../../../assets/img/logo-booking-affiliate.svg";
import ReactGA from "react-ga4";

const TripListItem = ({ trip }: { trip: Trip }): JSX.Element => {
  const { t } = useTranslation(["trips_results"]);

  const objectUrl = useFileAsObjectURL({
    url: trip.destinationPicture,
  });

  return (
    <div className={"bg-white rounded-xl overflow-hidden shadow-sm p-4"}>
      <Image
        alt={"Image destination"}
        className={"w-full h-48 object-cover rounded-xl mr-auto ml-auto "}
        height={50}
        src={
          trip.destinationPicture
            ? objectUrl?.url || BlankImage
            : tripImageBasic
        }
        width={100}
      />
      <div className={"pt-2"}>
        <h2 className={"text-2xl font-bold mb-2"}>{trip.destinationName}</h2>
        <ul className={"list-disc pl-6 pb-1"}>
          <li className={"text-sm mb-1"}>
            {`${t("trips_results:accomodation_budget")} : `}
            <span className={"whitespace-nowrap"}>
              <strong>{trip.Accomodation.averagePricePerNight} $</strong> /{" "}
              {t("trips_results:night")}
            </span>
          </li>
          <li className={"text-sm mb-1"}>
            {`${t("trips_results:transportation_budget")} : `}{" "}
            <strong className={"whitespace-nowrap"}>
              {trip.Transportation.price} $
            </strong>
          </li>
          <li className={"text-sm mb-1"}>
            {`${t("trips_results:other_budget")} : `}
            <strong className={"whitespace-nowrap"}>
              {trip.otherSpentPrice}$
            </strong>
          </li>
        </ul>
        <div className={"flex flex-col gap-3 my-3"}>
          <div
            className={
              "flex flex-row flex-wrap justify-between items-center gap-y-2"
            }
          >
            <p className={"font-bold"}>{`${(
              trip.totalPrice / trip.travelersNumber
            ).toFixed()}$ / ${t("trips_results:person")}`}</p>
            <p className={"font-bold"}>Total : {`${trip.totalPrice}$`}</p>
            <Link
              className={
                "p-2 px-3 mt-2 bg-green rounded-xl text-white uppercase text-xs font-medium w-full text-center"
              }
              href={`https://www.kiwi.com/deep?affilid=cyrildeschampsorgatripsorgatrips&booking_token=${trip.Transportation.bookingToken}`}
              onClick={() => {
                ReactGA.event({
                  category: "Trip Result",
                  action: "Redirect to Kiwi",
                  label: "Button",
                });
                ReactGA.event({
                  category: "Trip Result",
                  action: "Redirect to affiliation",
                  label: "Button",
                });
              }}
              rel={"noopener noreferrer"}
              target={"_blank"}
            >
              {t("trips_results:transport_details")}
            </Link>
          </div>
          <Link
            className={
              "p-2 px-3 bg-booking-blue rounded-xl text-white uppercase text-xs font-medium flex flex-col items-center gap-1 text-center"
            }
            href={`https://www.booking.com/searchresults.en.html?aid=${
              process.env.REACT_APP_BOOKING_AFFILIATE_ID
            }&ss=${encodeURIComponent(trip.destinationName)}&checkin=${format(
              trip.Transportation.departureDate,
              "yyyy-MM-dd",
            )}&checkout=${format(
              trip.Transportation.returnDate,
              "yyyy-MM-dd",
            )}&group_adults=${trip.travelersNumber}&nflt=price%3DUSD-min-${
              trip.Accomodation.averagePricePerNight
            }-1`}
            onClick={() => {
              ReactGA.event({
                category: "Trip Result",
                action: "Redirect to Booking",
                label: "Button",
              });
              ReactGA.event({
                category: "Trip Result",
                action: "Redirect to affiliation",
                label: "Button",
              });
            }}
            rel={"noopener noreferrer"}
            target={"_blank"}
          >
            {t("trips_results:search_accomodation")}
            <Image
              alt={"logo booking"}
              className={"mix-blend-plus-lighter object-none object-top h-6"}
              src={BookingLogo}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TripListItem;
