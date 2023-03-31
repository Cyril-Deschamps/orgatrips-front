import { fileUrlToUrl, useRouter } from "next-translate-routes";
import Head from "next/head";
import React, { ReactNode } from "react";
import { jsonLdScriptProps } from "react-schemaorg";
import { WebPage } from "schema-dts";
import { hostBaseURL } from "../auth/config";
import { AppConfig } from "../utils/AppConfig";

interface BaseSeoProps {
  title: string;
  description: string;
  children?: ReactNode;
}

const BaseSeo = ({
  title,
  description,
  children,
}: BaseSeoProps): JSX.Element => {
  const { pathname, query, locales, locale, defaultLocale } = useRouter();

  return (
    <>
      <Head>
        {locales?.map(
          (l) =>
            l !== defaultLocale && (
              <link
                key={l}
                href={`${hostBaseURL}${fileUrlToUrl({ pathname, query }, l)}`}
                hrefLang={l}
                rel={"alternate"}
              />
            ),
        )}
        <title>{`${AppConfig.siteName} - ${title}`}</title>
        <meta content={description} name={"description"} />
        <meta content={"website"} property={"og:type"} />
        <meta
          content={`${AppConfig.siteName} - ${title}`}
          property={"og:title"}
        />
        <meta content={description} property={"og:description"} />
        <meta
          content={`${hostBaseURL}/assets/logo.png`}
          property={"og:image"}
        />
        <meta
          content={`${hostBaseURL}${fileUrlToUrl(
            { pathname, query },
            locale!,
          )}`}
          property={"og:url"}
        />
        <script
          {...jsonLdScriptProps<WebPage>({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${hostBaseURL}${fileUrlToUrl(
              { pathname, query },
              locale!,
            )}/#webpage`,
            url: `${hostBaseURL}${fileUrlToUrl({ pathname, query }, locale!)}`,
            name: "orgatrips",
          })}
        />
        {children}
      </Head>
    </>
  );
};

export default BaseSeo;
