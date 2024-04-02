import {
  DefinedUseQueryResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { useCallback } from "react";
import {
  getAllArticles,
  getArticleBySlug,
  deleteArticle as apiDeleteArticle,
  updateArticle as apiUpdateArticle,
  createArticle as apiCreateArticle,
  GET_ARTICLES_KEY,
  GET_ARTICLE_BY_SLUG_KEY,
} from "./api";
import {
  Article,
  ArticleForm,
  ArticleRaw,
  mapArticleRawToArticle,
} from "./article";

export interface ArticleAPI {
  useLoadArticles: () => UseQueryResult<Article[]>;
  useLoadArticleBySlug: (
    articleSlug: Article["slug"],
  ) => UseQueryResult<Article>;

  createArticle: (articleForm: ArticleForm) => Promise<Article>;
  updateArticle: (
    articleSlug: Article["slug"],
    articleForm: ArticleForm,
  ) => Promise<Article>;
  deleteArticle: (articleSlug: Article["slug"]) => Promise<void>;
}

export interface LoadedArticleAPI extends ArticleAPI {
  useLoadArticles: () => DefinedUseQueryResult<Article[]>;
  useLoadArticleBySlug: (
    articleSlug: Article["slug"],
  ) => DefinedUseQueryResult<Article>;
}

export function useArticle(): ArticleAPI {
  const queryClient = useQueryClient();

  const useLoadArticles: ArticleAPI["useLoadArticles"] = () =>
    useQuery(
      GET_ARTICLES_KEY(),
      () => getAllArticles().then(({ data }) => data),
      {
        select: useCallback(
          (articles: ArticleRaw[]) => articles.map(mapArticleRawToArticle),
          [],
        ),
      },
    );

  const useLoadArticleBySlug: ArticleAPI["useLoadArticleBySlug"] = (
    articleSlug,
  ) =>
    useQuery(
      GET_ARTICLE_BY_SLUG_KEY(articleSlug),
      () => getArticleBySlug(articleSlug).then(({ data }) => data),
      {
        select: useCallback(
          (article: ArticleRaw) => mapArticleRawToArticle(article),
          [],
        ),
      },
    );

  const createArticle: ArticleAPI["createArticle"] = useCallback(
    (articleForm) =>
      apiCreateArticle(articleForm).then(async ({ data }) => {
        await queryClient.invalidateQueries(GET_ARTICLES_KEY());
        return mapArticleRawToArticle(data);
      }),
    [queryClient],
  );

  const updateArticle: ArticleAPI["updateArticle"] = useCallback(
    (articleSlug, articleForm) =>
      apiUpdateArticle(articleSlug, articleForm).then(async ({ data }) => {
        await queryClient.invalidateQueries(GET_ARTICLES_KEY());
        await queryClient.invalidateQueries(GET_ARTICLE_BY_SLUG_KEY(data.slug));
        return mapArticleRawToArticle(data);
      }),
    [queryClient],
  );

  const deleteArticle: ArticleAPI["deleteArticle"] = useCallback(
    (articleSlug) =>
      apiDeleteArticle(articleSlug).then(() =>
        queryClient.invalidateQueries(GET_ARTICLES_KEY()),
      ),
    [queryClient],
  );

  return {
    useLoadArticles,
    useLoadArticleBySlug,
    createArticle,
    updateArticle,
    deleteArticle,
  };
}
