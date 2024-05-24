import { AxiosPromise } from "axios";
import baseAPI from "../auth/api";
import { Airport, FeedTripRaw, SearchTripsForm, Trip, TripRaw } from "./trip";

export function searchTrips(
  searchTripsForm: SearchTripsForm,
): AxiosPromise<TripRaw[]> {
  return baseAPI.post(`/trips/search`, searchTripsForm, {
    timeout: 30000,
  });
}

export function saveTrip(trip: Trip): AxiosPromise<Trip> {
  return baseAPI.post(`/trips`, trip);
}

export function unsaveTrip(
  tripId: NonNullable<Trip["id"]>,
): AxiosPromise<Trip> {
  return baseAPI.delete(`/trips/${tripId}`);
}

export function findAirports(searchTerms: string): AxiosPromise<Airport[]> {
  return baseAPI.get(`/airports`, {
    params: { query: searchTerms },
  });
}

export function getTrips(): AxiosPromise<TripRaw[]> {
  return baseAPI.get(`/trips`);
}

export function getTripsFeed(): AxiosPromise<FeedTripRaw[]> {
  return baseAPI.get(`/trips/feed`);
}
