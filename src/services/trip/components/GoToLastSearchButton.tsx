import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import { TRIP_LINK } from "../../../routes";
import Button from "../../ui/Button";
import { useLoadLocalTrips } from "../tripHooks";

const GoToLastSearchButton = ({
  className,
}: {
  className?: string;
}): JSX.Element => {
  const trips = useLoadLocalTrips();
  const { t } = useTranslation(["trip"]);

  return (
    <>
      {trips.length > 0 && (
        <Link href={TRIP_LINK}>
          <Button className={className}>{t("trip:see_last_search")}</Button>
        </Link>
      )}
    </>
  );
};

export default GoToLastSearchButton;
