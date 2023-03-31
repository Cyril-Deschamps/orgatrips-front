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
      case "validations":
        return `./src/services/validations/i18n/${locale}.json`;
      case "trip":
        return `./src/services/trip/i18n/${locale}.json`;
      default:
        return namespace !== "common" ?
          `./src/services/i18n/pages/${namespace}/${locale}.json` : `./src/services/i18n/pages/website/${locale}.json`;
    }
  },
  reloadOnPrerender: process.env.NODE_ENV === "development",
  ns: ["validations", "trip", "home", "website", "legal_notice", "privacy_policy", "trips_results"],
};
