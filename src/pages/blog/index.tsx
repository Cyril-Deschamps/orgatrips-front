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
import blogHero from "../../assets/img/blog-hero.png";
import blogHeroMobile from "../../assets/img/blog-hero-mobile.png";
import Image from "next/image";
import Title1 from "../../services/ui/Title1";

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
      <div className={"relative w-full min-h-[275px] flex items-center"}>
        <picture
          className={
            "absolute w-full h-full z-10 bg-gradient-to-r from-[#11224a] to-[#164373]"
          }
        >
          <source media={"(max-width: 900px)"} srcSet={blogHeroMobile.src} />
          <Image
            alt={"Hero"}
            className={
              "w-full h-full object-cover object-center md:object-right"
            }
            quality={100}
            src={blogHero}
          />
        </picture>
        <SizedSection little>
          <div
            className={"z-20 relative text-gray-100 flex flex-col gap-s py-xl"}
          >
            <Title1>Le site n°1 du voyage pas cher !</Title1>
            <p>
              Retrouvez nos astuces voyages et notre simulateur de destination
            </p>
            <ul
              className={
                "grid grid-cols-1 xl:grid-cols-2 bg-gray-100 rounded xl:divide-x divide-y xl:divide-y-0 text-black md:mt-xl"
              }
            >
              <div className={"grid grid-cols-2 divide-x border-gray-300"}>
                <li
                  className={
                    "p-s flex flex-row justify-center items-center gap-xs border-gray-300"
                  }
                >
                  <span
                    className={
                      "bg-green bg-opacity-20 flex justify-center items-center rounded-full w-10 h-10"
                    }
                  >
                    A
                  </span>
                  <p>Simulateur de destination</p>
                </li>
                <li
                  className={
                    "p-s flex flex-row justify-center items-center gap-xs border-gray-300"
                  }
                >
                  <span
                    className={
                      "bg-green bg-opacity-20 flex justify-center items-center rounded-full w-10 h-10"
                    }
                  >
                    B
                  </span>
                  <p>Simulateur de destination</p>
                </li>
              </div>
              <div className={"grid grid-cols-2 divide-x border-gray-300"}>
                <li
                  className={
                    "p-s flex flex-row justify-center items-center gap-xs border-gray-300"
                  }
                >
                  <span
                    className={
                      "bg-green bg-opacity-20 flex justify-center items-center rounded-full w-10 h-10"
                    }
                  >
                    C
                  </span>
                  <p>Simulateur de destination</p>
                </li>
                <li
                  className={
                    "p-s flex flex-row justify-center items-center gap-xs border-gray-300"
                  }
                >
                  <span
                    className={
                      "bg-green bg-opacity-20 flex justify-center items-center rounded-full w-10 h-10"
                    }
                  >
                    D
                  </span>
                  <p>Simulateur de destination</p>
                </li>
              </div>
            </ul>
          </div>
        </SizedSection>
      </div>
      <div className={"bg-white w-full p-s"}>
        <p className={"text-center uppercase font-bold text-gray-500 text-sm"}>
          À la recherche d'une destination ?
        </p>
      </div>
      <SizedSection className={"mt-xl"} little>
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
