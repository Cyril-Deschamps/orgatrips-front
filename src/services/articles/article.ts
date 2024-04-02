import { parseISO } from "date-fns";

export interface Article {
  slug: string;
  description: string;
  title: string;
  image: string;
  thumbnail: string;
  readingTime: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ArticleRaw extends Omit<Article, "createdAt" | "updatedAt"> {
  createdAt: string;
  updatedAt: string;
}

export interface ArticleForm {
  title: string;
  description: string;
  image: string;
  content: string;
  readingTime: number;
}

export function mapArticleRawToArticle(articleRaw: ArticleRaw): Article {
  return {
    ...articleRaw,
    createdAt: parseISO(articleRaw.createdAt),
    updatedAt: parseISO(articleRaw.updatedAt),
  };
}
