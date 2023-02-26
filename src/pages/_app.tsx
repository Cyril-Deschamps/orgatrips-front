import { AppProps } from "next/app";
import React from "react";
import { appWithTranslation } from "next-i18next";

import "../assets/styles/global.css";

const App = ({ Component, router }: AppProps) => (
  <React.StrictMode>
    <Component {...router} />
  </React.StrictMode>
);

export default appWithTranslation(App);
