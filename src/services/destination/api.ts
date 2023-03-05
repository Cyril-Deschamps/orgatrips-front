import { AxiosPromise } from "axios";
import baseAPI from "../auth/api";
import { Destination, SearchDestinationForm } from "./destination";

export function getFormOptionsBrand(
  SearchDestinationForm: SearchDestinationForm,
): AxiosPromise<Destination[]> {
  return baseAPI.post(`/searchDestination`, { SearchDestinationForm });
}
