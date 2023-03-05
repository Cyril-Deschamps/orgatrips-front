import "react-i18next";

import validations from "../validations/i18n/en.json";
import destination from "../destination/i18n/en.json";

// PAGES
import website from "./pages/website/en.json";
import home from "./pages/home/en.json";
import legal_notice from "./pages/legal_notice/en.json";
import privacy_policy from "./pages/privacy_policy/en.json";

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: "destination";
    resources: {
      validations: typeof validations;
      destination: typeof destination;
      home: typeof home;
      website: typeof website;
      legal_notice: typeof legal_notice;
      privacy_policy: typeof privacy_policy;
    };
  }
}
