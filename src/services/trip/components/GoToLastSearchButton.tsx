import Link from "next/link";
import React from "react";
import { TRIP_LINK } from "../../../routes";
import Button from "../../ui/Button";
import { useLoadLocalTrips } from "../tripHooks";

const GoToLastSearchButton = ({
  className,
}: {
  className?: string;
}): JSX.Element => {
  const trips = useLoadLocalTrips();

  return (
    <>
      {trips.length > 0 && (
        <Link href={TRIP_LINK}>
          <Button className={className}>Revoir dernière recherche</Button>
        </Link>
      )}
    </>
  );
};

export default GoToLastSearchButton;
