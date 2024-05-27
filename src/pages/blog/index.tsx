import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import nextI18nextConfig from "../../../next-i18next.config";
import AppLayout from "../../services/ui/Layout/AppLayout";
import BaseSeo from "../../services/seo/BaseSeo";
import ArticleItem from "../../services/articles/components/ArticleItem";
import { useLoadArticles } from "../../services/articles/articleHooks";
import { prefetchAllArticles } from "../../services/articles/prerenderingHelper";
import { dehydrate } from "@tanstack/react-query";
import Title1 from "../../services/ui/Title1";
import FeedTripItem from "../../services/trip/components/FeedTripItem";
import { Prefetched } from "../../services/api";
import { getQueryClient } from "../../services/api/config";
import { useLoadFeedTrips } from "../../services/trip/tripHooks";
import useWebSocketTripFeed from "../../services/trip/useWebSocketTripFeed";

const BlogDashboard = (): JSX.Element => {
  const { data: articles, isLoading: articlesIsLoading } =
    useLoadArticles<Prefetched>();
  const { data: trips, isLoading: tripsIsLoading } = useLoadFeedTrips();
  const { t } = useTranslation(["website", "pages_content"]);
  const feedTripWs = useWebSocketTripFeed();

  return (
    <AppLayout>
      <BaseSeo
        description={t("pages_content:blog.page_description")}
        title={t("pages_content:blog.page_title")}
      />
      <section
        className={
          "my-xl grid grid-cols-3 gap-x-3xl gap-y-3xl px-m md:px-2xl w-full max-w-[1700px]"
        }
      >
        <div className={"col-start-1 xl:col-end-3 col-end-4"}>
          <Title1 className={"italic"} big>
            {t("pages_content:blog.blog_title")}
          </Title1>
          <div className={"mt-2xl"}>
            {!articlesIsLoading && <ArticleItem article={articles[0]} />}
          </div>
        </div>
        <div className={"xl:col-start-3 xl:col-end-4 col-start-1 col-end-4"}>
          <span className={"bg-white p-xs rounded-xl font-bold"}>
            {t("pages_content:blog.last_share_title")}
          </span>
          <div className={"gap-s pt-xl grid content-start"}>
            {!tripsIsLoading &&
              trips &&
              trips
                .slice(0, 3)
                .map((trip) => (
                  <FeedTripItem
                    key={
                      trip.id ?? trip.totalBudget + trip.DepartureAirport.city
                    }
                    feedTripWs={feedTripWs}
                    imageClassname={"aspect-auto h-[208px]"}
                    trip={trip}
                  />
                ))}
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = getQueryClient();
  await prefetchAllArticles(queryClient);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(
        locale ?? "en",
        ["website", "pages_content", "trip"],
        nextI18nextConfig,
      )),
    },
  };
};

export default BlogDashboard;
