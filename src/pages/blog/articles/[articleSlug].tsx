import React, { useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticPaths, GetStaticProps } from "next";
import AppLayout from "../../../services/ui/Layout/AppLayout";
import SizedSection from "../../../services/ui/SizedSection";
import nextI18nextConfig from "../../../../next-i18next.config";
import { prefetchArticleBySlug } from "../../../services/articles/prerenderingHelper";
import BaseSeo from "../../../services/seo/BaseSeo";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useDate } from "../../../services/date/DateContext";
import iconCalendarGray from "../../../assets/img/icons/icon-calendar-gray.svg";
import iconTimeGray from "../../../assets/img/icons/icon-time-gray.svg";
import { formatDuration } from "date-fns";
import { Article } from "../../../services/articles/article";
import ScrollToTopButton from "../../../services/ui/ScrollToTopButton";
import { getAllArticles } from "../../../services/articles/api";
import { useLoadArticleBySlug } from "../../../services/articles/articleHooks";
import { Prefetched } from "../../../services/api";
import { Trans, useTranslation } from "react-i18next";

interface Props {
  referenceId: Article["slug"];
}

const ArticleDetails = ({ referenceId }: Props): JSX.Element => {
  const { data: article, isLoading } = useLoadArticleBySlug<Prefetched>({
    articleSlug: referenceId,
  });
  const { formatDate } = useDate();
  const { t } = useTranslation(["pages_content"]);

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
      <BaseSeo title={article.title} noBaseTitle />
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
              {isLoading ? "..." : ""}
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
            <Trans>{t("pages_content:home.main_description")}</Trans>
          </div>
        </article>
      </SizedSection>
    </AppLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const articlesParams = await getAllArticles().then(({ data }) =>
    data.flatMap((article) => {
      if (!locales) {
        return { params: { articleSlug: article.slug } };
      }
      return locales.map((locale) => ({
        params: { articleSlug: article.slug },
        locale,
      }));
    }),
  );

  return {
    paths: articlesParams,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  const queryClient = new QueryClient();
  const articleSlug = params!.articleSlug as string;
  await prefetchArticleBySlug(queryClient, articleSlug);
  return {
    props: {
      referenceId: articleSlug,
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(
        locale ?? "en",
        ["website", "pages_content"],
        nextI18nextConfig,
      )),
    },
  };
};

export default ArticleDetails;
