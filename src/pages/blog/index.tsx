import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import nextI18nextConfig from "../../../next-i18next.config";
import AppLayout from "../../services/ui/Layout/AppLayout";
import BaseSeo from "../../services/seo/BaseSeo";
import ArticleItem from "../../services/articles/components/ArticleItem";
import {
  LoadedArticleAPI,
  useArticle,
} from "../../services/articles/useArticle";
import { prefetchAllArticles } from "../../services/articles/prerenderingHelper";
import { dehydrate } from "@tanstack/react-query";
import { withUseQuery } from "../../services/routing/useLoader";
import Title1 from "../../services/ui/Title1";
import TripItem from "../../services/articles/components/TripItem";

const BlogDashboard = (): JSX.Element => {
  const { useLoadArticles } = useArticle() as LoadedArticleAPI;
  const { data: articles } = useLoadArticles();
  const { t } = useTranslation(["website", "pages_content"]);

  return (
    <AppLayout>
      <BaseSeo
        description={t("pages_content:blog.page_description")}
        title={t("pages_content:blog.page_title")}
      />
      <section
        className={
          "my-xl grid grid-cols-3 gap-x-3xl px-m md:px-2xl w-full max-w-[1700px]"
        }
      >
        <div className={"col-start-1 xl:col-end-3 col-end-4"}>
          <Title1 className={"italic"} big>
            Sélection de la rédaction
          </Title1>
          <div className={"mt-2xl"}>
            <ArticleItem article={articles[0]} />
          </div>
        </div>
        <div>
          <span className={"bg-white p-xs rounded-xl font-bold"}>
            Dernières génération partagée ...
          </span>
          <div
            className={
              "xl:col-start-3 xl:col-end-4 gap-2xl xl:gap-s col-start-1 col-end-4 pt-xl grid content-start"
            }
          >
            {articles.slice(1, 3).map((article) => (
              <TripItem
                key={article.slug}
                article={article}
                imageClassname={"aspect-auto h-[208px]"}
              />
            ))}
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = await prefetchAllArticles();
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(
        locale ?? "en",
        ["website", "pages_content"],
        nextI18nextConfig,
      )),
    },
  };
};

const useQueryLoaders = () => {
  const { useLoadArticles } = useArticle();
  return [useLoadArticles()];
};

export default withUseQuery(BlogDashboard, useQueryLoaders);
