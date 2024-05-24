import { useCallback, useEffect, useState } from "react";
import {
  FeedTrip,
  FeedTripRaw,
  mapTripRawToTrip,
  Trip,
  TripRaw,
  TRIPS_STORAGE_KEY,
} from "./trip";
import {
  saveTrip as apiSaveTrip,
  getTrips as apiGetTrips,
  unsaveTrip as apiUnsaveTrip,
  getTripsFeed as apiGetTripsFeed,
} from "./api";
import { AxiosError } from "axios";
import {
  DefinedUseQueryResult,
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ConditionalReactQuery } from "../api";

export const GET_FEED_TRIPS_KEY = () => ["feedTrips"];
export const GET_SAVED_TRIPS_KEY = () => ["savedTrips"];

export interface TripAPI {
  useLoadFeedTrips: ConditionalReactQuery<FeedTrip[], Error>;
  useLoadSavedTrips: ConditionalReactQuery<Trip[], Error>;
  useLoadLocalTrips: () => Trip[];

  useSaveTrip: () => UseMutationResult<Trip, AxiosError, { trip: Trip }>;
  useUnsaveTrip: () => UseMutationResult<
    void,
    AxiosError,
    { tripId: NonNullable<Trip["id"]> }
  >;
}

const useLoadFeedTrips: TripAPI["useLoadFeedTrips"] = () =>
  useQuery({
    queryKey: GET_FEED_TRIPS_KEY(),
    queryFn: () => apiGetTripsFeed().then(({ data }) => data),
    select: useCallback(
      (trips: FeedTripRaw[]) => trips.map(mapTripRawToTrip),
      [],
    ),
  }) as DefinedUseQueryResult<FeedTrip[], Error>;

const useLoadSavedTrips: TripAPI["useLoadSavedTrips"] = () =>
  useQuery({
    queryKey: GET_SAVED_TRIPS_KEY(),
    queryFn: () => apiGetTrips().then(({ data }) => data),
    select: useCallback((trips: TripRaw[]) => trips.map(mapTripRawToTrip), []),
  }) as DefinedUseQueryResult<Trip[], Error>;

const useLoadLocalTrips: TripAPI["useLoadLocalTrips"] = () => {
  const [trips, setTrips] = useState([]);
  useEffect(() => {
    const trips = localStorage.getItem(TRIPS_STORAGE_KEY);
    if (trips) {
      setTrips(JSON.parse(trips).map(mapTripRawToTrip));
    }
  }, []);
  return trips;
};

const useSaveTrip: TripAPI["useSaveTrip"] = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ trip }) => apiSaveTrip(trip).then(({ data }) => data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: GET_SAVED_TRIPS_KEY() });
    },
  });
};

const useUnsaveTrip: TripAPI["useUnsaveTrip"] = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ tripId }) =>
      apiUnsaveTrip(tripId).then(() => Promise.resolve()),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: GET_SAVED_TRIPS_KEY() });
    },
  });
};

export {
  useLoadSavedTrips,
  useSaveTrip,
  useLoadLocalTrips,
  useUnsaveTrip,
  useLoadFeedTrips,
};
