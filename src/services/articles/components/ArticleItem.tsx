import React from "react";
import { Article } from "../article";
import Image from "next/image";
import iconCalendarGray from "../../../assets/img/icons/icon-calendar-gray.svg";
import iconTimeGray from "../../../assets/img/icons/icon-time-gray.svg";
import { useDate } from "../../date/DateContext";
import { formatDuration } from "date-fns";
import TextWithIcon from "../../ui/TextWithIcon";

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
        <TextWithIcon
          alt={"Calendar icon"}
          iconSrc={iconCalendarGray}
        >{`le ${formatDate(article.createdAt, "PPPp")}`}</TextWithIcon>
        <TextWithIcon
          alt={"Clock icon"}
          iconSrc={iconTimeGray}
        >{`${formatDuration({
          minutes: article.readingTime,
        })} de lecture`}</TextWithIcon>
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
