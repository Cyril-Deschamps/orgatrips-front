module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["fr", "en"],
  },
  fallbackLng: {
    default: ["en"],
  },
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
      case "trip":
        return `./src/services/trip/i18n/${locale}.json`;
      case "pages_content":
        return `./src/services/i18n/pages_content/${locale}.json`;
      default:
        return namespace !== "common" ?
          `./src/services/i18n/pages/${namespace}/${locale}.json` : `./src/services/i18n/pages/website/${locale}.json`;
    }
  },
  reloadOnPrerender: process.env.NODE_ENV === "development",
  ns: ["validations", "trip", "website", "pages_content"],
};
