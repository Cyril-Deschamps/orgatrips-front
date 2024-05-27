
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: "default",
    locales: ["default", "fr", "en"],
    localeDetection: false,
  },
  trailingSlash: true,
  interpolation: {
    escapeValue: false,
  },
  serializeConfig: false,
  localePath: (locale, namespace) => {
    switch (namespace) {
      case "website":
        return `./src/services/i18n/website/${locale}.json`;
      case "validations":
        return `./src/services/validations/i18n/${locale}.json`;
      case "pages_content":
        return `./src/services/i18n/pages_content/${locale}.json`;
      default:
        return namespace !== "common" ?
          `./src/services/${namespace}/i18n/${locale}.json` : path.resolve(`./src/services/i18n/website/${locale}.json`);
    }
  },
  reloadOnPrerender: process.env.NODE_ENV === "development",
  ns: ["validations", "trip", "website", "pages_content", "auth"],
};
