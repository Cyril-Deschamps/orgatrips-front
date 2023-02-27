module.exports = {
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },
  fallbackLng: {
    default: "fr",
  },
  interpolation: {
    escapeValue: false,
  },
  localePath: (locale, namespace) => {
    switch (namespace) {
      case "auth":
        return `./src/services/auth/i18n/${locale}.json`
      case "validations":
        return `./src/services/validations/i18n/${locale}.json`
      default:
        return `./src/services/auth/i18n/${locale}.json`
    }
  }
}
