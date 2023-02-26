import "react-i18next";

import auth from "../auth/i18n/fr.json";
import validations from "../validations/i18n/fr.json";

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: "auth";
    resources: {
      auth: typeof auth;
      validations: typeof validations;
    };
  }
}
