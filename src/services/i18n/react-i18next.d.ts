import "react-i18next";

import validations from "../validations/i18n/en.json";
import trip from "../trip/i18n/en.json";
import website from "./website/en.json";
import pages_content from "./pages_content/en.json";

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: "website";
    resources: {
      validations: typeof validations;
      trip: typeof trip;
      website: typeof website;
      pages_content: typeof pages_content;
    };
  }
}
