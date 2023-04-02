import { AppProps } from "next/app";
import React from "react";
import { appWithTranslation } from "next-i18next";
import localFont from "next/font/local";
import classNames from "classnames";
import Head from "next/head";
import "../assets/styles/global.css";
import { Roboto } from "next/font/google";
import nextI18NextConfig from "../../next-i18next.config";
import { withTranslateRoutes } from "next-translate-routes";
import "../services/validations/yup-init";
import "../services/i18n";
import { ProvideToast } from "../services/toast-notifications";
import { ProvideTrip } from "../services/trip/tripProvider";
import { ProvideTransition } from "../services/transition/TransitionContext";
import { GoogleAnalytics } from "nextjs-google-analytics";

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
  return (
    <React.StrictMode>
      <Head>
        <meta
          content={"width=device-width, initial-scale=1"}
          name={"viewport"}
        />
      </Head>
      <div
        className={classNames(
          varsityTeamFont.variable,
          robotoFont.className,
          "flex flex-col w-full min-h-screen p-0 m-0 bg-appBgColor font-Roboto",
        )}
      >
        <ProvideToast>
          <ProvideTrip>
            <ProvideTransition>
              <GoogleAnalytics
                gaMeasurementId={GA_MEASUREMENT_ID}
                strategy={"afterInteractive"}
                trackPageViews
              />
              <Component {...pageProps} />
            </ProvideTransition>
          </ProvideTrip>
        </ProvideToast>
      </div>
    </React.StrictMode>
  );
};

export default appWithTranslation(withTranslateRoutes(App), nextI18NextConfig);
