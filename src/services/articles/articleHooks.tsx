import {
  DefinedUseQueryResult,
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useCallback } from "react";
import { ConditionalReactQuery } from "../api";
import {
  getAllArticles,
  getArticleBySlug,
  deleteArticle as apiDeleteArticle,
  updateArticle as apiUpdateArticle,
  createArticle as apiCreateArticle,
} from "./api";
import {
  Article,
  ArticleForm,
  ArticleRaw,
  mapArticleRawToArticle,
} from "./article";

export const GET_ARTICLES_KEY = () => ["article"];
export const GET_ARTICLE_BY_SLUG_KEY = (slug: Article["slug"]) => [
  "article",
  slug,
];

export interface ArticleAPI {
  useLoadArticles: ConditionalReactQuery<Article[], Error>;

  useLoadArticleBySlug: ConditionalReactQuery<
    Article,
    Error,
    { articleSlug: Article["slug"] }
  >;

  useCreateArticle: () => UseMutationResult<
    Article,
    Error,
    { articleForm: ArticleForm }
  >;

  useUpdateArticle: () => UseMutationResult<
    Article,
    Error,
    { articleSlug: Article["slug"]; articleForm: ArticleForm }
  >;

  useDeleteArticle: () => UseMutationResult<
    void,
    Error,
    { articleSlug: Article["slug"] }
  >;
}

const useLoadArticles: ArticleAPI["useLoadArticles"] = () =>
  useQuery({
    queryKey: GET_ARTICLES_KEY(),
    queryFn: () => getAllArticles().then(({ data }) => data),
    select: useCallback(
      (articles: ArticleRaw[]) => articles.map(mapArticleRawToArticle),
      [],
    ),
  }) as DefinedUseQueryResult<Article[], Error>;

const useLoadArticleBySlug: ArticleAPI["useLoadArticleBySlug"] = ({
  articleSlug,
}) =>
  useQuery({
    queryKey: GET_ARTICLE_BY_SLUG_KEY(articleSlug),
    queryFn: () => getArticleBySlug(articleSlug).then(({ data }) => data),
    select: useCallback(
      (article: ArticleRaw) => mapArticleRawToArticle(article),
      [],
    ),
  }) as DefinedUseQueryResult<Article, Error>;

const useCreateArticle: ArticleAPI["useCreateArticle"] = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ articleForm }) =>
      apiCreateArticle(articleForm).then(({ data }) =>
        mapArticleRawToArticle(data),
      ),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: GET_ARTICLES_KEY() });
    },
  });
};

const useUpdateArticle: ArticleAPI["useUpdateArticle"] = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ articleSlug, articleForm }) =>
      apiUpdateArticle(articleSlug, articleForm).then(async ({ data }) =>
        mapArticleRawToArticle(data),
      ),
    onSuccess(_data, { articleSlug }) {
      queryClient.invalidateQueries({ queryKey: GET_ARTICLES_KEY() });
      queryClient.invalidateQueries({
        queryKey: GET_ARTICLE_BY_SLUG_KEY(articleSlug),
      });
    },
  });
};

const useDeleteArticle: ArticleAPI["useDeleteArticle"] = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ articleSlug }) => {
      await apiDeleteArticle(articleSlug);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: GET_ARTICLES_KEY() });
    },
  });
};

export {
  useLoadArticles,
  useLoadArticleBySlug,
  useCreateArticle,
  useUpdateArticle,
  useDeleteArticle,
};
