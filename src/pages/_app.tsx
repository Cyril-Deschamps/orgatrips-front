import "../assets/styles/global.scss";
import "react-responsive-modal/styles.css";
import "../services/validations/yup-init";
import "../services/i18n/yupConfig";
import { AppProps } from "next/app";
import React, { useState } from "react";
import { appWithTranslation } from "next-i18next";
import localFont from "next/font/local";
import { twMerge } from "tailwind-merge";
import Head from "next/head";
import { Roboto } from "next/font/google";
import nextI18NextConfig from "../../next-i18next.config";
import { ProvideToast } from "../services/toast-notifications";
import { ProvideTransition } from "../services/transition/TransitionContext";
import { GoogleAnalytics } from "nextjs-google-analytics";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AppConfig } from "../services/utils/AppConfig";
import dynamic from "next/dynamic";
const ProvideAuth = dynamic(
  () => import("../services/auth/apiProvider").then((file) => file.ProvideAuth),
  {
    ssr: false,
  },
);

const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID || "";

const varsityTeamFont = localFont({
  src: "../assets/fonts/VarsityTeam.otf",
  variable: "--font-varsity-team",
});
const robotoFont = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
});

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { staleTime: 1000 * 60 } },
      }),
  );

  return (
    <React.StrictMode>
      <Head>
        <meta
          content={"width=device-width, initial-scale=1"}
          name={"viewport"}
        />
        <title key={"title"}>{`${AppConfig.siteName}`}</title>
      </Head>
      <div
        className={twMerge(
          varsityTeamFont.variable,
          robotoFont.variable,
          "flex flex-col w-full min-h-screen p-0 m-0 bg-appBgColor font-Roboto",
        )}
      >
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={pageProps.dehydratedState}>
            <ProvideToast>
              <ProvideTransition>
                <ProvideAuth>
                  <GoogleAnalytics
                    gaMeasurementId={GA_MEASUREMENT_ID}
                    strategy={"afterInteractive"}
                    trackPageViews
                  />
                  <Component {...pageProps} />
                </ProvideAuth>
              </ProvideTransition>
            </ProvideToast>
          </HydrationBoundary>
        </QueryClientProvider>
      </div>
    </React.StrictMode>
  );
};

export default appWithTranslation(App, nextI18NextConfig);
