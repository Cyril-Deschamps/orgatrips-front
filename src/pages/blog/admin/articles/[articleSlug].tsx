import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import nextI18nextConfig from "../../../../../next-i18next.config";
import { ADMIN_ARTICLES_LINK } from "../../../../routes/blog";
import { Prefetched } from "../../../../services/api";
import ArticleForm from "../../../../services/articles/components/ArticleForm";
import {
  useLoadArticleBySlug,
  useUpdateArticle,
} from "../../../../services/articles/articleHooks";
import BaseSeo from "../../../../services/seo/BaseSeo";
import Card from "../../../../services/ui/Card";
import CardHeader from "../../../../services/ui/CardHeader";
import AppLayout from "../../../../services/ui/Layout/AppLayout";
import { useAuthContext } from "../../../../services/auth/apiProvider";
import { BASE_LINK } from "../../../../routes";

interface Props {
  referenceId: string;
}

const EditArticle = ({ referenceId }: Props): JSX.Element => {
  const { data: article } = useLoadArticleBySlug<Prefetched>({
    articleSlug: referenceId,
  });
  const { mutateAsync: updateArticle } = useUpdateArticle();
  const router = useRouter();

  const { user } = useAuthContext();
  if (!user || !user.admin) {
    router.push(BASE_LINK);
    return <></>;
  }

  return (
    <AppLayout>
      <BaseSeo title={"Modifier un article"} noIndex />
      <Card>
        <CardHeader goBack>
          <h1 className={"text-2xl font-medium text-gray-900"}>
            Modifier un article
          </h1>
        </CardHeader>
        {article && (
          <ArticleForm
            initialArticle={article}
            onSubmit={(values) =>
              updateArticle({
                articleSlug: article.slug,
                articleForm: values,
              }).then(
                () => {
                  router.push(ADMIN_ARTICLES_LINK);
                },
                () => {
                  /* Handle error */
                },
              )
            }
          />
        )}
      </Card>
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  params,
}) => {
  return {
    props: {
      referenceId: params!.articleSlug as string,
      ...(await serverSideTranslations(
        locale ?? "en",
        ["website", "validations"],
        nextI18nextConfig,
      )),
    },
  };
};

export default EditArticle;
