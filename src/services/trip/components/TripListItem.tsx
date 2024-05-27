import { Trans, useTranslation } from "next-i18next";
import Image from "next/image";
import React, { useState } from "react";
import { Trip } from "../trip";
import tripImageBasic from "../../../assets/img/trip-image-basic.jpg";
import useFileAsObjectURL from "../../files/useFileAsObjectURL";
import Link from "next/link";
import { format } from "date-fns";
import BlankImage from "../../../assets/img/blank.svg";
import BookingLogo from "../../../assets/img/logo-booking-affiliate.svg";
import { event } from "nextjs-google-analytics";
import { TFuncKey } from "react-i18next";
import coffeeIcon from "../../../assets/img/icons/icon-coffee.svg";
import hotelIcon from "../../../assets/img/icons/icon-hotel.svg";
import planeIcon from "../../../assets/img/icons/icon-plane.svg";
import { useCountry } from "../../countries/CountryContext";
import Button from "../../ui/Button";
import { useAuthContext } from "../../auth/apiProvider";
import { REGISTER_LINK } from "../../../routes";
import { useRouter } from "next/router";
import { useSaveTrip, useUnsaveTrip } from "../tripHooks";
import { twJoin, twMerge } from "tailwind-merge";
import generatePath from "../../routing/generatePath";

type Props = {
  trip: Trip;
  canBeSaved?: boolean;
  isSavedInitially?: boolean;
  isCard?: boolean;
  showDeparture?: boolean;
};

const TripListItem = ({
  trip,
  canBeSaved,
  isSavedInitially,
  isCard = true,
  showDeparture = false,
}: Props): JSX.Element => {
  const { user } = useAuthContext();
  const { t } = useTranslation(["pages_content"]);
  const { countriesList } = useCountry();
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(isSavedInitially);
  const { mutate: saveTrip } = useSaveTrip();
  const { mutate: unsaveTrip } = useUnsaveTrip();

  const objectUrl = useFileAsObjectURL({
    url: trip.DestinationCity.cityPic,
  });

  return (
    <div
      className={twJoin(
        "bg-white",
        isCard ? "rounded-xl overflow-hidden shadow-sm p-4" : "",
      )}
    >
      <Image
        alt={"Image destination"}
        className={"w-full h-48 object-cover rounded-xl mr-auto ml-auto "}
        height={50}
        src={
          trip.DestinationCity.cityPic
            ? objectUrl?.url || BlankImage
            : tripImageBasic
        }
        width={100}
      />
      <div className={"pt-2"}>
        <div className={"flex justify-between"}>
          <div className={"flex flex-col"}>
            <h2 className={"text-2xl font-bold mb-2"}>
              {(showDeparture
                ? `${trip.DepartureAirport.city}
               -> `
                : "") + trip.DestinationCity.name}
            </h2>
            <span
              className={
                "relative text-sm text-gray-500 font-medium top-[-0.85rem]"
              }
            >
              {countriesList[trip.DestinationCity.countryCode]}
            </span>
          </div>
          <span className={"text-sm font-medium pt-[0.65rem] pl-1"}>
            <Trans
              count={trip.travelersNumber}
              i18nKey={"pages_content:trips_results.nights_number" as TFuncKey}
              values={{
                count: trip.nightsNumber,
              }}
            />
          </span>
        </div>

        <ul className={"pl-2 py-2 flex flex-col gap-2"}>
          <li
            className={
              "leading-tight text-sm mb-1 flex flex-row gap-3 items-center"
            }
          >
            <Image alt={"coffee"} className={"w-5"} src={hotelIcon} />
            {t("pages_content:trips_results.accomodation_budget")}&nbsp;:
            <span className={"whitespace-nowrap"}>
              <strong>{trip.accomodationAveragePricePerNight} $</strong> /{" "}
              {t("pages_content:trips_results.night")}
            </span>
          </li>
          <li className={"text-sm mb-1 flex flex-row gap-3 items-center"}>
            <Image alt={"coffee"} className={"w-5"} src={planeIcon} />
            {t("pages_content:trips_results.transportation_budget")}&nbsp;:
            <strong className={"whitespace-nowrap"}>
              {trip.transportationPrice}&nbsp;$
            </strong>
          </li>
          <li className={"text-sm mb-1 flex flex-row gap-3 items-center"}>
            <Image alt={"coffee"} className={"pt-[3px] w-5"} src={coffeeIcon} />
            {t("pages_content:trips_results.other_budget")}&nbsp;:
            <strong className={"whitespace-nowrap"}>
              {trip.otherSpentBudget}
              &nbsp;$
            </strong>
          </li>
        </ul>
        <div className={"flex flex-col gap-3 my-3"}>
          <div
            className={
              "flex flex-row flex-wrap justify-between items-center gap-y-2"
            }
          >
            <p className={"font-bold text-xs pt-1"}>{`${(
              trip.totalBudget / trip.travelersNumber
            ).toFixed()} $ / ${t("pages_content:trips_results.person")}`}</p>
            <p className={"font-bold"}>
              {t("pages_content:trips_results.total")} :{" "}
              <span className={"text-blue text-xl"}>
                {trip.totalBudget}&nbsp;$
              </span>
            </p>
            <Link
              className={
                "p-2 px-3 mt-2 bg-green rounded-xl text-white uppercase text-xs font-medium w-full text-center"
              }
              href={`https://www.kiwi.com/deep?affilid=cyrildeschampsorgatripsorgatrips&booking_token=${trip.transportationBookingToken}`}
              onClick={() => {
                event("Redirect to Kiwi", {
                  category: "Trip Result",
                  label: "Button",
                });
                event("Redirect to affiliation", {
                  category: "Trip Result",
                  label: "Button",
                });
              }}
              rel={"noopener noreferrer"}
              target={"_blank"}
            >
              {t("pages_content:trips_results.transport_details")}
            </Link>
          </div>
          <Link
            className={
              "p-2 px-3 bg-booking-blue rounded-xl text-white uppercase text-xs font-medium flex flex-col items-center gap-1 text-center"
            }
            href={`https://www.booking.com/searchresults.en.html?aid=${
              process.env.REACT_APP_BOOKING_AFFILIATE_ID
            }&ss=${encodeURIComponent(
              trip.DestinationCity.name,
            )}&checkin=${format(
              trip.transportationArrivalLocalDate,
              "yyyy-MM-dd",
            )}&checkout=${format(
              trip.transportationLeavingLocalDate,
              "yyyy-MM-dd",
            )}&group_adults=${trip.travelersNumber}&nflt=price%3DUSD-min-${
              trip.accomodationAveragePricePerNight
            }-1`}
            onClick={() => {
              event("Redirect to Booking", {
                category: "Trip Result",
                label: "Button",
              });
              event("Redirect to affiliation", {
                category: "Trip Result",
                label: "Button",
              });
            }}
            rel={"noopener noreferrer"}
            target={"_blank"}
          >
            {t("pages_content:trips_results.search_accomodation")}
            <Image
              alt={"logo booking"}
              className={"mix-blend-plus-lighter object-none object-top h-6"}
              src={BookingLogo}
            />
          </Link>
          {canBeSaved && (
            <>
              <span className={"font-bold mx-auto"}>ou</span>
              <Button
                className={twMerge(
                  "p-2 px-3 bg-red-400 rounded-xl text-white uppercase text-xs font-medium w-full text-center",
                )}
                disabled={isSaved && trip.id === undefined}
                onClick={() => {
                  if (user) {
                    if (isSaved && trip.id) {
                      unsaveTrip({ tripId: trip.id });
                    } else {
                      saveTrip({ trip }, { onSuccess: () => setIsSaved(true) });
                    }
                  } else {
                    router.push(
                      generatePath(REGISTER_LINK, undefined, {
                        redirect: router.pathname,
                      }),
                    );
                  }
                }}
              >
                {user
                  ? isSaved
                    ? trip.id
                      ? "Retirer ce voyage"
                      : "Voyage sauvegardé !"
                    : "Sauvegarder ce voyage"
                  : "S'inscrire pour sauvegarder"}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripListItem;
