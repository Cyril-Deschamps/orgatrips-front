import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetServerSideProps } from "next";
import AppLayout from "../../../services/ui/Layout/AppLayout";
import nextI18nextConfig from "../../../../next-i18next.config";
import generatePath from "../../../services/routing/generatePath";
import {
  ADMIN_EDIT_ARTICLE_LINK,
  ADMIN_NEW_ARTICLE_LINK,
} from "../../../routes/blog/admin";
import Image from "next/image";
import iconPencil from "../../../assets/img/icons/icon-pencil.svg";
import iconTrash from "../../../assets/img/icons/icon-trash.svg";
import { twMerge } from "tailwind-merge";
import BaseSeo from "../../../services/seo/BaseSeo";
import Card from "../../../services/ui/Card";
import CardHeader from "../../../services/ui/CardHeader";
import Button from "../../../services/ui/Button";
import { ARTICLE_DETAIL_LINK } from "../../../routes/blog/articles";
import { Prefetched } from "../../../services/api";
import {
  useDeleteArticle,
  useLoadArticles,
} from "../../../services/articles/articleHooks";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuthContext } from "../../../services/auth/apiProvider";
import { BASE_LINK } from "../../../routes";

const AdminBlogDashboard = (): JSX.Element => {
  const { data: articles, isLoading } = useLoadArticles<Prefetched>();
  const { mutate: deleteArticle } = useDeleteArticle();
  const router = useRouter();

  const { user } = useAuthContext();
  if (!user || !user.admin) {
    router.push(BASE_LINK);
    return <></>;
  }

  return (
    <AppLayout>
      <BaseSeo title={"Articles"} noIndex />
      <Card>
        <CardHeader>
          <div className={"flex flex-row justify-between w-full"}>
            <h1 className={"text-2xl font-medium text-gray-900"}>
              Liste des articles
            </h1>
            <Button
              className={
                "text-sm font-medium uppercase bg-light-blue text-white px-xs rounded hover:bg-blue"
              }
              onClick={() => router.push(ADMIN_NEW_ARTICLE_LINK)}
            >
              Créer
            </Button>
          </div>
        </CardHeader>
        <div className={"overflow-x-auto sm:-mx-6 lg:-mx-8"}>
          <div className={"inline-block min-w-full py-2 sm:px-6 lg:px-8"}>
            <div className={"overflow-hidden"}>
              <table className={"min-w-full text-left text-sm font-light"}>
                <thead className={"border-b bg-white font-medium"}>
                  <tr>
                    <th className={"px-6 py-4"} scope={"col"}>
                      Titre
                    </th>
                    <th className={"px-6 py-4"} scope={"col"}>
                      Description
                    </th>
                    <th className={"px-6 py-4"} scope={"col"} />
                  </tr>
                </thead>
                <tbody>
                  {!isLoading &&
                    articles.map((article, index) => (
                      <tr
                        key={article.slug}
                        className={twMerge(
                          "border-b",
                          index % 2 !== 0 ? "bg-white" : "bg-neutral-100",
                        )}
                      >
                        <td className={"whitespace-nowrap px-6 py-4"}>
                          <Link
                            href={`${generatePath(ARTICLE_DETAIL_LINK, {
                              articleSlug: article.slug,
                            })}`}
                          >
                            {article.title}
                          </Link>
                        </td>
                        <td className={"whitespace-nowrap px-6 py-4"}>
                          {`${
                            article.description.length > 40
                              ? `${article.description
                                  .replace(/<[^>]*>/g, " ")
                                  .substring(0, 40)}...`
                              : article.description
                          }`}
                        </td>
                        <td
                          className={
                            "whitespace-nowrap px-6 py-4 flex flex-row gap-s mt-1"
                          }
                        >
                          <Link
                            href={generatePath(ADMIN_EDIT_ARTICLE_LINK, {
                              articleSlug: article.slug,
                            })}
                          >
                            <Image
                              alt={"edit"}
                              className={"w-s max-w-none"}
                              src={iconPencil}
                            />
                          </Link>
                          <button
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Êtes-vous sur de le supprimer ?",
                                )
                              ) {
                                deleteArticle({ articleSlug: article.slug });
                              }
                            }}
                          >
                            <Image
                              alt={"trash"}
                              className={"w-s max-w-none"}
                              src={iconTrash}
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale ?? "en",
        ["website"],
        nextI18nextConfig,
      )),
    },
  };
};

export default AdminBlogDashboard;
