import React from "react";
import { Article } from "../article";
import Image from "next/image";
import { useDate } from "../../date/DateContext";

import dynamic from "next/dynamic";
import { twMerge } from "tailwind-merge";
const SmoothText = dynamic(() => import("../../ui/SmoothText"), {
  ssr: false,
});

const TripItem = ({
  article,
  imageClassname,
}: {
  article: Article;
  imageClassname?: string;
}): JSX.Element => {
  const { formatDate } = useDate();
  return (
    <div className={"w-full relative"}>
      <Image
        alt={"Image article"}
        className={twMerge(
          "top-0 left-0 z-0 w-full rounded-3xl aspect-video object-cover",
          imageClassname,
        )}
        height={200}
        src={article.image}
        width={400}
      />
      <div className={"absolute top-0 z-50 grid grid-cols-2 p-m w-full"}>
        <div className={"flex flex-col gap-xs"}>
          <div>
            <span
              className={"bg-white text-xs font-bold px-xs py-xxs rounded-full"}
            >
              {formatDate(article.createdAt, "PP")}
            </span>
          </div>
          <div>
            <span
              className={
                "border-white border text-white text-xs font-bold px-xs py-xxs rounded-full"
              }
            >
              &#x2022;&nbsp; Blog
            </span>
          </div>
        </div>
        <div className={"pr-s sm:mt-3 sm:text-2xl sm:leading-xl relative"}>
          <SmoothText className={"text-xxs leading-6 mt-[-4px] font-bold"}>
            &#x2022;&nbsp; ARTICLE
            <br />
            *********************
          </SmoothText>
          <SmoothText className={"text-3xl absolute top-[19px] font-bold"}>
            {article.title}
          </SmoothText>
        </div>
      </div>
    </div>
  );
};

export default TripItem;
