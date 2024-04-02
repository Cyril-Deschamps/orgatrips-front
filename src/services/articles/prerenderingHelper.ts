import { QueryClient } from "@tanstack/query-core";
import {
  GET_ARTICLES_KEY,
  getAllArticles,
  GET_ARTICLE_BY_SLUG_KEY,
  getArticleBySlug,
} from "./api";
import { Article } from "./article";

export async function prefetchAllArticles(
  queryClient?: QueryClient,
): Promise<QueryClient> {
  const currentQueryClient = queryClient ? queryClient : new QueryClient();
  await currentQueryClient.fetchQuery(GET_ARTICLES_KEY(), () =>
    getAllArticles().then(({ data }) => data),
  );
  return currentQueryClient;
}

export async function prefetchArticleBySlug(
  articleSlug: Article["slug"],
  queryClient?: QueryClient,
): Promise<QueryClient> {
  const currentQueryClient = queryClient ? queryClient : new QueryClient();
  await currentQueryClient.fetchQuery(
    GET_ARTICLE_BY_SLUG_KEY(articleSlug),
    () => getArticleBySlug(articleSlug).then(({ data }) => data),
  );
  return currentQueryClient;
}

export async function getAllArticlesPaths(): Promise<
  { params: { articleSlug: string } }[]
> {
  return getAllArticles().then(({ data }) =>
    data.map((article) => ({
      params: { articleSlug: article.slug },
    })),
  );
}
