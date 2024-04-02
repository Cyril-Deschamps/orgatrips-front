import { AxiosPromise, AxiosResponse } from "axios";
import baseAPI from "../auth/api";
import { Article, ArticleForm, ArticleRaw } from "./article";

export const GET_ARTICLES_KEY = () => ["article", "all"];
export const GET_ARTICLE_BY_SLUG_KEY = (slug: Article["slug"]) => [
  "article",
  slug,
];

export function createArticle(
  articleForm: ArticleForm,
): AxiosPromise<ArticleRaw> {
  return baseAPI.post(
    `/articles/its-a-fucking-route-to-manage-article`,
    articleForm,
  );
}

export function updateArticle(
  articleSlug: Article["slug"],
  articleForm: ArticleForm,
): AxiosPromise<ArticleRaw> {
  return baseAPI.put(
    `/articles/its-a-fucking-route-to-manage-article/${articleSlug}`,
    articleForm,
  );
}

export function deleteArticle(
  articleSlug: Article["slug"],
): AxiosPromise<AxiosResponse> {
  return baseAPI.delete(
    `/articles/its-a-fucking-route-to-manage-article/${articleSlug}`,
  );
}

export function getAllArticles(): AxiosPromise<ArticleRaw[]> {
  return baseAPI.get(`/articles`);
}

export function getArticleBySlug(
  articleSlug: Article["slug"],
): AxiosPromise<ArticleRaw> {
  return baseAPI.get(`/articles/${articleSlug}`);
}
