import { AxiosPromise, AxiosResponse } from "axios";
import baseAPI from "../auth/api";
import { Article, ArticleForm, ArticleRaw } from "./article";

export function getAllArticles(): AxiosPromise<ArticleRaw[]> {
  return baseAPI.get(`/articles`);
}

export function createArticle(
  articleForm: ArticleForm,
): AxiosPromise<ArticleRaw> {
  return baseAPI.post(`/articles`, articleForm);
}

export function updateArticle(
  articleSlug: Article["slug"],
  articleForm: ArticleForm,
): AxiosPromise<ArticleRaw> {
  return baseAPI.put(`/articles/${articleSlug}`, articleForm);
}

export function deleteArticle(
  articleSlug: Article["slug"],
): AxiosPromise<AxiosResponse> {
  return baseAPI.delete(`/articles/${articleSlug}`);
}

export function getArticleBySlug(
  articleSlug: Article["slug"],
): AxiosPromise<ArticleRaw> {
  return baseAPI.get(`/articles/${articleSlug}`);
}
