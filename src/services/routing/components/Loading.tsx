import { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  debounce?: boolean;
}

const Loading: FunctionComponent<Props> = ({ debounce = true }) => {
  const { t } = useTranslation(["validations"]);
  const [showLoading, setShowLoading] = useState(!debounce);
  useEffect(() => {
    if (debounce) {
      const handler = setTimeout(() => setShowLoading(true), 200);

      return () => {
        clearTimeout(handler);
      };
    }
  });

  if (!showLoading) return null;
  return <div>{t("validations:loading")}</div>;
};

export default Loading;
