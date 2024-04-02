import React from "react";
import { Article } from "../article";
import Image from "next/image";
import iconCalendarGray from "../../../assets/img/icons/icon-calendar-gray.svg";
import iconTimeGray from "../../../assets/img/icons/icon-time-gray.svg";
import { useDate } from "../../date/DateContext";
import { formatDuration } from "date-fns";

const ArticleItem = ({ article }: { article: Article }): JSX.Element => {
  const { formatDate } = useDate();
  return (
    <div>
      <Image
        alt={"Image article"}
        height={200}
        src={article.image}
        width={400}
      />
      <div>
        <div className={"flex flex-row"}>
          <Image
            alt={"Calendar icon"}
            className={"w-s sm:w-m"}
            src={iconCalendarGray}
          />
          <span className={"text-gray-500 font-light pl-2"}>
            {`le ${formatDate(article.createdAt, "PPPp")} `}
          </span>
        </div>
        <div className={"flex flex-row"}>
          <Image
            alt={"Clock icon"}
            className={"w-s sm:w-m"}
            src={iconTimeGray}
          />
          <span className={"text-gray-500 font-light pl-2"}>
            {`${formatDuration({ minutes: article.readingTime })}`} de lecture
          </span>
        </div>
      </div>
      <div>
        <div className={"h-auto w-xxs rounded-xl bg-blue hidden md:block"} />
        <h2>{article.thumbnail}</h2>
      </div>
      <p>{article.description}</p>
    </div>
  );
};

export default ArticleItem;
