import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetServerSideProps } from "next";
import router from "next/router";
import nextI18nextConfig from "../../../../../next-i18next.config";
import { ADMIN_ARTICLES_LINK } from "../../../../routes/blog";
import ArticleForm from "../../../../services/articles/components/ArticleForm";
import BaseSeo from "../../../../services/seo/BaseSeo";
import Card from "../../../../services/ui/Card";
import CardHeader from "../../../../services/ui/CardHeader";
import AppLayout from "../../../../services/ui/Layout/AppLayout";
import { useCreateArticle } from "../../../../services/articles/articleHooks";
import { useAuthContext } from "../../../../services/auth/apiProvider";
import { BASE_LINK } from "../../../../routes";

const NewArticle = (): JSX.Element => {
  const { mutateAsync: createArticle } = useCreateArticle();

  const { user } = useAuthContext();
  if (!user || !user.admin) {
    router.push(BASE_LINK);
    return <></>;
  }

  return (
    <AppLayout>
      <BaseSeo title={"Créer un article"} noIndex />
      <Card>
        <CardHeader goBack>
          <h1 className={"text-2xl font-medium text-gray-900"}>
            Créer un article
          </h1>
        </CardHeader>

        <ArticleForm
          onSubmit={(values) =>
            createArticle({ articleForm: values }).then(
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
