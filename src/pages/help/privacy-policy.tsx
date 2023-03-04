import React from "react";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next";
import nextI18NextConfig from "../../../next-i18next.config";
import { AppConfig } from "../../services/utils/AppConfig";
import { useTranslation } from "next-i18next";
import AppLayout from "../../services/ui/Layout/AppLayout";

const PrivacyPolicy = (): JSX.Element => {
  const { t } = useTranslation(["destination", "home", "website"]);

  return (
    <AppLayout>
      <Head>
        <title>{`${AppConfig.siteName} - ${t("website:description")}`}</title>
      </Head>
      <main className={"flex flex-col items-center"}>
        <h1>{t("website:pages.privacy_policy")}</h1>
      </main>
    </AppLayout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale ?? "en",
      ["website"],
      nextI18NextConfig,
    )),
  },
});

export default PrivacyPolicy;
