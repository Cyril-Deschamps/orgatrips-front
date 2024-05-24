import React, { useState } from "react";
import Image from "next/image";
import { useDate } from "../../date/DateContext";
import ArrowUpRightIcon from "../../../assets/img/icons/icon-arrow-up-right.svg";
import HeartIcon from "../../../assets/img/icons/icon-heart.svg";
import HeartOutlineIcon from "../../../assets/img/icons/icon-heart-outline.svg";
import { Modal } from "react-responsive-modal";
import dynamic from "next/dynamic";
import { twMerge } from "tailwind-merge";
import { FeedTrip } from "../trip";
import TripListItem from "./TripListItem";
import Title2 from "../../ui/Title2";
import useFileAsObjectURL from "../../files/useFileAsObjectURL";
import BlankImage from "../../../assets/img/blank.svg";
import tripImageBasic from "../../../assets/img/trip-image-basic.jpg";
import { fillMinLenght } from "../../articles/article";
import { WebSocketTripFeed } from "../useWebSocketTripFeed";
const SmoothText = dynamic(() => import("../../ui/SmoothText"), {
  ssr: false,
});

const FeedTripItem = ({
  trip,
  imageClassname,
  feedTripWs,
}: {
  trip: FeedTrip;
  imageClassname?: string;
  feedTripWs: WebSocketTripFeed;
}): JSX.Element => {
  const { formatDate } = useDate();
  const [toggleModal, setToggleModal] = useState(false);

  const handleLike = () => {
    if (trip.hasAlreadyLike) {
      feedTripWs.removeLike({ tripId: trip.id });
    } else {
      feedTripWs.addLike({ tripId: trip.id });
    }
  };

  const objectUrl = useFileAsObjectURL({
    url: trip.DestinationCity.cityPic,
  });

  return (
    <div className={"w-full relative"}>
      <Image
        alt={"Image article"}
        className={twMerge(
          "top-0 left-0 z-0 w-full rounded-3xl aspect-video object-cover",
          imageClassname,
        )}
        height={200}
        src={
          trip.DestinationCity.cityPic
            ? objectUrl?.url || BlankImage
            : tripImageBasic
        }
        width={400}
      />
      <div className={"absolute top-0 z-50 grid grid-cols-2 p-m w-full h-full"}>
        <div className={"flex flex-col gap-xs"}>
          <div>
            <span
              className={"bg-white text-xs font-bold px-xs py-xxs rounded-full"}
            >
              {trip.totalBudget} $ - {trip.nightsNumber + 1} jours
            </span>
          </div>
          <div>
            <span
              className={
                "border-white border text-white text-xs font-bold px-xs py-xxs rounded-full bg-black bg-opacity-20"
              }
            >
              &#x2022;&nbsp;{" "}
              {formatDate(trip.transportationDepartureDate, "PP")} /{" "}
              {formatDate(trip.transportationReturnDate, "PP")}
            </span>
          </div>
        </div>
        <div className={"pr-s sm:mt-3 sm:text-2xl sm:leading-xl relative"}>
          <SmoothText className={"text-xxs leading-6 mt-[-4px] font-bold"}>
            &#x2022;&nbsp; VOYAGE
            <br />
            ************
          </SmoothText>
          <SmoothText className={"text-3xl absolute top-[19px] font-bold"}>
            {fillMinLenght(trip.DestinationCity.name, 5)}
          </SmoothText>
        </div>
        <div className={"absolute bottom-xs right-s gap-s flex"}>
          {feedTripWs.ws ? (
            feedTripWs.isWsConnected ? (
              <button
                className={"p-xs bg-white rounded-full flex gap-xxs"}
                onClick={() => handleLike()}
              >
                <span>{trip.likesCount} </span>
                <Image
                  alt={"toogle-like"}
                  src={trip.hasAlreadyLike ? HeartIcon : HeartOutlineIcon}
                />
              </button>
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
          <button
            className={"p-xs bg-white rounded-full"}
            onClick={() => setToggleModal(true)}
          >
            <Image alt={"arrow"} src={ArrowUpRightIcon} />
          </button>
        </div>
      </div>
      <Modal
        classNames={{ modal: "rounded-3xl", closeButton: "mt-2" }}
        onClose={() => setToggleModal(false)}
        open={toggleModal}
        center
      >
        <>
          <Title2>Détails du voyage</Title2>
          <TripListItem isCard={false} trip={trip} />
        </>
      </Modal>
    </div>
  );
};

export default FeedTripItem;
