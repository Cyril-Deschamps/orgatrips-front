import { createContext, useCallback, useContext, useState } from "react";
import { Airport, SearchTripsForm, Trip } from "./trip";
import {
  searchTrips as apiSearchTrips,
  findAirports as apiFindAirports,
} from "./api";

export interface TripAPI {
  trips: Trip[];

  searchTrips: (searchTripsForm: SearchTripsForm) => Promise<void>;

  findAirports: (searchTerms: string) => Promise<Airport[]>;
}

export const TripContext = createContext<TripAPI | null>(null);

export function ProvideTrip({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const [trips, setTrips] = useState<Trip[]>([]);

  const searchTrips: TripAPI["searchTrips"] = useCallback(
    (searchTripsForm) =>
      apiSearchTrips(searchTripsForm).then(({ data }) => setTrips(data)),
    [],
  );

  const findAirports: TripAPI["findAirports"] = useCallback(
    (searchTerms) => apiFindAirports(searchTerms).then(({ data }) => data),
    [],
  );

  return (
    <TripContext.Provider value={{ trips, searchTrips, findAirports }}>
      {children}
    </TripContext.Provider>
  );
}

export function useTrip(): TripAPI {
  return useContext(TripContext) as TripAPI;
}
