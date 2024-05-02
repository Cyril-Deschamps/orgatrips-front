import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import nextI18nextConfig from "../../../next-i18next.config";
import AppLayout from "../../services/ui/Layout/AppLayout";
import SizedSection from "../../services/ui/SizedSection";
import BaseSeo from "../../services/seo/BaseSeo";
import ArticleItem from "../../services/articles/components/ArticleItem";
import {
  LoadedArticleAPI,
  useArticle,
} from "../../services/articles/useArticle";
import { prefetchAllArticles } from "../../services/articles/prerenderingHelper";
import { dehydrate } from "@tanstack/react-query";
import { withUseQuery } from "../../services/routing/useLoader";
import Card from "../../services/ui/Card";
import InfoIcon from "../../assets/img/icons/icon-info-white.svg";
import InfoCard from "../../services/ui/InfoCard";

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
      <div
        className={
          "flex flex-col items-center w-full p-xl bg-gradient-to-b from-appBgColor from-50% to-white to-50%"
        }
      >
        <Card className={"border-0 w-full bg-white"}>
          <div className={"grid grid-cols-2 gap-8"}>
            <InfoCard icon={InfoIcon} title={"Test"}>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English.
            </InfoCard>
            <InfoCard
              className={"bg-green opacity-100"}
              icon={InfoIcon}
              title={"Test"}
            >
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters.
            </InfoCard>
          </div>
        </Card>
      </div>

      <div className={"bg-white w-full"}>
        <SizedSection>
          <h2>Sélection de la rédaction</h2>
          <div>
            <ArticleItem article={articles[0]} />
            <div>
              {articles.slice(1, 3).map((article) => (
                <ArticleItem key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </SizedSection>
      </div>
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
