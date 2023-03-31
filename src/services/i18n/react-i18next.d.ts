import "react-i18next";

import validations from "../validations/i18n/en.json";
import trip from "../trip/i18n/en.json";

// PAGES
import website from "./pages/website/en.json";
import home from "./pages/home/en.json";
import legal_notice from "./pages/legal_notice/en.json";
import privacy_policy from "./pages/privacy_policy/en.json";
import trips_results from "./pages/trips_results/en.json";

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: "trip";
    resources: {
      validations: typeof validations;
      trip: typeof trip;
      home: typeof home;
      website: typeof website;
      legal_notice: typeof legal_notice;
      privacy_policy: typeof privacy_policy;
      trips_results: typeof trips_results;
    };
  }
}
