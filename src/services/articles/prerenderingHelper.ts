import { QueryClient } from "@tanstack/query-core";
import { getAllArticles, getArticleBySlug } from "./api";
import { Article } from "./article";
import { GET_ARTICLES_KEY, GET_ARTICLE_BY_SLUG_KEY } from "./articleHooks";

export const prefetchAllArticles = (queryClient: QueryClient): Promise<void> =>
  queryClient.prefetchQuery({
    queryKey: GET_ARTICLES_KEY(),
    queryFn: () => getAllArticles().then(({ data }) => data),
  });

export const prefetchArticleBySlug = (
  queryClient: QueryClient,
  articleSlug: Article["slug"],
): Promise<void> =>
  queryClient.prefetchQuery({
    queryKey: GET_ARTICLE_BY_SLUG_KEY(articleSlug),
    queryFn: () => getArticleBySlug(articleSlug).then(({ data }) => data),
  });
