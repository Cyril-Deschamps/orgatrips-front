import { AppProps } from "next/app";
import React from "react";
import { appWithTranslation } from "next-i18next";
import localFont from "next/font/local";
import classNames from "classnames";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Head from "next/head";
import "../assets/styles/global.css";
import { Roboto } from "next/font/google";

const varsityTeamFont = localFont({
  src: "../assets/fonts/VarsityTeam.otf",
  variable: "--font-varsity-team",
});
const robotoFont = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const App = ({ Component, router }: AppProps) => (
  <React.StrictMode>
    <Head>
      <meta content={"width=device-width, initial-scale=1"} name={"viewport"} />
    </Head>
    <div
      className={classNames(
        varsityTeamFont.variable,
        robotoFont.className,
        "flex flex-col w-full min-h-screen p-0 m-0 bg-appBgColor font-Roboto",
      )}
    >
      <Header />
      <Component {...router} />
      <Footer />
    </div>
  </React.StrictMode>
);

export default appWithTranslation(App);
