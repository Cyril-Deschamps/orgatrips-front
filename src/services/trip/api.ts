import { AxiosPromise } from "axios";
import baseAPI from "../auth/api";
import { SearchTripForm, Trip } from "./trip";

export function getFormOptionsBrand(
  searchTripForm: SearchTripForm,
): AxiosPromise<Trip[]> {
  return baseAPI.post(`/searchTrip`, { searchTripForm });
}
