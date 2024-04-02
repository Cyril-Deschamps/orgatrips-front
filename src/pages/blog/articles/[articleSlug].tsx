import React, { useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next";
import AppLayout from "../../../services/ui/Layout/AppLayout";
import SizedSection from "../../../services/ui/SizedSection";
import nextI18nextConfig from "../../../../next-i18next.config";
import {
  getAllArticlesPaths,
  prefetchArticleBySlug,
} from "../../../services/articles/prerenderingHelper";
import {
  LoadedArticleAPI,
  useArticle,
} from "../../../services/articles/useArticle";
import { withUseQuery } from "../../../services/routing/useLoader";
import BaseSeo from "../../../services/seo/BaseSeo";
import { dehydrate } from "@tanstack/react-query";
import Image from "next/image";
import { useDate } from "../../../services/date/DateContext";
import iconCalendarGray from "../../../assets/img/icons/icon-calendar-gray.svg";
import iconTimeGray from "../../../assets/img/icons/icon-time-gray.svg";
import { formatDuration } from "date-fns";
import { Article } from "../../../services/articles/article";
import ScrollToTopButton from "../../../services/ui/ScrollToTopButton";

interface Props {
  referenceId: Article["slug"];
}

const ArticleDetails = ({ referenceId }: Props): JSX.Element => {
  const { useLoadArticleBySlug } = useArticle() as LoadedArticleAPI;
  const { data: article } = useLoadArticleBySlug(referenceId);
  const { formatDate } = useDate();

  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);

  useEffect(() => {
    const regex = /<(h[1-6])\s+id="(.+?)">(.*?)<\/\1>/g;
    const headers = [...article.content.matchAll(regex)].map((match) => {
      return { id: match[2], text: match[3] };
    });
    setHeadings(headers);
  }, [article]);

  const smoothScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element)
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
  };

  return (
    <AppLayout>
      <BaseSeo title={article.title} translated={false} noBaseTitle />
      <ScrollToTopButton />
      <SizedSection
        className={
          "flex flex-row z-10 min-h-[28rem] items-start sm:min-h-[26rem] justify-center lg:justify-between pb-3xl"
        }
      >
        <article className={"flex flex-col"}>
          <div className={"flex flex-col md:flex-row"}>
            <div
              className={"h-auto w-xxs rounded-xl bg-blue hidden md:block"}
            />
            <h1
              className={
                "text-2xl sm:text-[2.4rem] leading-tight pt-1 pb-s md:pb-1 md:pl-s font-bold tracking-[0.01rem]"
              }
              id={"title"}
            >
              {article.title}
            </h1>
            <div className={"h-xxs w-4xl rounded-xl bg-blue md:hidden"} />
          </div>
          <p className={"pt-l text-xl tracking-[0.01rem] sm:leading-relaxed"}>
            {article.description}
          </p>
          <div
            className={
              "flex flex-row gap-x-3xl gap-y-xs flex-wrap mt-xs mb-l text-sm sm:text-base"
            }
          >
            <div className={"flex flex-row min-w-[20rem]"}>
              <Image
                alt={"Calendar icon"}
                className={"w-s sm:w-m"}
                src={iconCalendarGray}
              />
              <span className={"text-gray-500 font-light pl-2"}>
                <span>{`le ${formatDate(article.createdAt, "PPPp")} `}</span>
                <span>
                  {`(Modifié le ${formatDate(article.updatedAt, "PPPp")})`}
                </span>
              </span>
            </div>
            <div className={"flex flex-row"}>
              <Image
                alt={"Clock icon"}
                className={"w-s sm:w-m"}
                src={iconTimeGray}
              />
              <span className={"text-gray-500 font-light pl-2"}>
                {`${formatDuration({ minutes: article.readingTime })}`} de
                lecture
              </span>
            </div>
          </div>

          <Image
            alt={"Article Image"}
            className={
              "w-full aspect-article-image h-auto rounded-xl object-cover max-w-screen-lg -indent-80 overflow-hidden my-s border border-white"
            }
            height={400}
            src={`${article.image}`}
            width={800}
          />

          <div className={"w-full max-w-full bg-blue p-s rounded-lg mt-l"}>
            <h2 className={"font-medium text-gray-300 pb-xs"}>Sommaire</h2>
            <ul>
              {headings.map((heading, index) => (
                <li key={index}>
                  <button
                    className={"text-gray-100 font-medium"}
                    onClick={() => smoothScroll(heading.id)}
                  >
                    {`${index + 1} - `}
                    <span className={"text-lg"}>{`${heading.text}`}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div
            dangerouslySetInnerHTML={{ __html: article.content }}
            className={"article-content"}
          />
          <div className={"my-xl rounded w-4xl self-center bg-blue h-1"} />
          <div>
            <p>D'autres articles sur le voyage</p>
            <span>
              Le site qui explique tout de A à Z sur le Bitcoin, la blockchain
              et les crypto-monnaies. Des actualités et des articles explicatifs
              pour découvrir et progresser dans ces secteurs !
            </span>
          </div>
        </article>
        <aside className={"article-aside"}>
          <div className={"window"}>
            <div className={"flex flex-row items-center gap-l"}>
              <div className={"tools"}>
                <div className={"circle"}>
                  <span className={"red box"} />
                </div>
                <div className={"circle"}>
                  <span className={"yellow box"} />
                </div>
                <div className={"circle"}>
                  <span className={"green box"} />
                </div>
              </div>
              <span className={"uppercase font-bold text-xs text-gray-700"}>
                Orgatrips
              </span>
            </div>
            <div className={"pt-s"}>
              <span>
                Our solution powered by artificial intelligence suggests
                destinations according to your desires and your budget. It will
                suggest you transportation and accommodation reservations,
                through Booking and Kiwi, that match your budget.
              </span>
            </div>
          </div>
          <div className={"window"}>
            <div className={"flex flex-row items-center gap-l"}>
              <div className={"tools"}>
                <div className={"circle"}>
                  <span className={"red box"} />
                </div>
                <div className={"circle"}>
                  <span className={"yellow box"} />
                </div>
                <div className={"circle"}>
                  <span className={"green box"} />
                </div>
              </div>
              <span className={"uppercase font-bold text-xs text-gray-700"}>
                Les articles les plus lus
              </span>
            </div>
            <div className={"pt-s"}>
              <span>
                Le site qui explique tout de A à Z sur le Bitcoin, la blockchain
                et les crypto-monnaies. Des actualités et des articles
                explicatifs pour découvrir et progresser dans ces secteurs !
              </span>
            </div>
          </div>
        </aside>
      </SizedSection>
    </AppLayout>
  );
};

export async function getStaticPaths() {
  return {
    paths: await getAllArticlesPaths(),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  const articleSlug = params!.articleSlug as string;
  const queryClient = await prefetchArticleBySlug(articleSlug);
  return {
    props: {
      referenceId: articleSlug,
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(
        locale ?? "en",
        ["website"],
        nextI18nextConfig,
      )),
    },
  };
};

const useQueryLoaders = ({ referenceId }: Props) => {
  const { useLoadArticleBySlug } = useArticle();
  return [useLoadArticleBySlug(referenceId)];
};

export default withUseQuery<Props>(ArticleDetails, useQueryLoaders);
