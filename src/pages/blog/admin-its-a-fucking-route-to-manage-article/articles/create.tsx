import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetServerSideProps } from "next";
import router from "next/router";
import nextI18nextConfig from "../../../../../next-i18next.config";
import { ADMIN_ARTICLES_LINK } from "../../../../routes/blog";
import ArticleForm from "../../../../services/articles/components/ArticleForm";
import { useArticle } from "../../../../services/articles/useArticle";
import BaseSeo from "../../../../services/seo/BaseSeo";
import Card from "../../../../services/ui/Card";
import CardHeader from "../../../../services/ui/CardHeader";
import AppLayout from "../../../../services/ui/Layout/AppLayout";

const NewArticle = (): JSX.Element => {
  const { createArticle } = useArticle();

  return (
    <AppLayout>
      <BaseSeo title={"Créer un article"} translated={false} noIndex />
      <Card>
        <CardHeader goBack>
          <h1 className={"text-2xl font-medium text-gray-900"}>
            Créer un article
          </h1>
        </CardHeader>

        <ArticleForm
          onSubmit={(values) =>
            createArticle(values).then(
              async () => {
                router.push(ADMIN_ARTICLES_LINK);
              },
              () => {
                /* Handle error */
              },
            )
          }
        />
      </Card>
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale ?? "en",
      ["website", "validations"],
      nextI18nextConfig,
    )),
  },
});

export default NewArticle;
