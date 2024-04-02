import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next-translate-routes";
import nextI18nextConfig from "../../../../../next-i18next.config";
import { ADMIN_ARTICLES_LINK } from "../../../../routes/blog";
import ArticleForm from "../../../../services/articles/components/ArticleForm";
import {
  useArticle,
  LoadedArticleAPI,
} from "../../../../services/articles/useArticle";
import { withUseQuery } from "../../../../services/routing/useLoader";
import BaseSeo from "../../../../services/seo/BaseSeo";
import Card from "../../../../services/ui/Card";
import CardHeader from "../../../../services/ui/CardHeader";
import AppLayout from "../../../../services/ui/Layout/AppLayout";

interface Props {
  referenceId: string;
}

const EditArticle = ({ referenceId }: Props): JSX.Element => {
  const { useLoadArticleBySlug, updateArticle } =
    useArticle() as LoadedArticleAPI;
  const { data: article } = useLoadArticleBySlug(referenceId);
  const router = useRouter();

  return (
    <AppLayout>
      <BaseSeo title={"Modifier un article"} translated={false} noIndex />
      <Card>
        <CardHeader goBack>
          <h1 className={"text-2xl font-medium text-gray-900"}>
            Modifier un article
          </h1>
        </CardHeader>
        <ArticleForm
          initialArticle={article}
          onSubmit={(values) =>
            updateArticle(article.slug, values).then(
              () => {
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

const useQueryLoaders = ({ referenceId }: Props) => {
  const { useLoadArticleBySlug } = useArticle();
  return [useLoadArticleBySlug(referenceId)];
};

export default withUseQuery<Props>(EditArticle, useQueryLoaders);
