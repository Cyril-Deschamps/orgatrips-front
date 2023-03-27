import { AxiosPromise } from "axios";
import baseAPI from "../auth/api";
import { Airport, SearchTripsForm, Trip } from "./trip";

export function searchTrips(
  searchTripsForm: SearchTripsForm,
): AxiosPromise<Trip[]> {
  return baseAPI.post(`/cities/searchTrips`, searchTripsForm);
}

export function findAirports(searchTerms: string): AxiosPromise<Airport[]> {
  return baseAPI.get(`/airports`, {
    params: { query: searchTerms },
  });
}
