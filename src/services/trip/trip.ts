import { formatISO, parseISO } from "date-fns";
import { DateRange } from "../forms/DateRangeField";
import { searchTrips } from "./api";

export const budgetMax = 25000 as const;

export const TRIPS_STORAGE_KEY = "trips" as const;

export interface SearchTripsForm {
  departureIataCode: string;
  dateRange: DateRange;
  budgetMax: number;
  adultsNumber: number;
  childrenNumber: number;
  locale: string;
}

export interface Trip {
  id?: number;
  DepartureAirport: Airport;
  DestinationCity: City;
  nightsNumber: number;
  travelersNumber: number;
  otherSpentBudget: number;
  totalBudget: number;
  accomodationAveragePricePerNight: number;
  transportationPrice: number;
  transportationBookingToken: string;
  transportationInboundDuration: number;
  transportationOutboundDuration: number;
  transportationStopOverInbound: number;
  transportationStopOverOutbound: number;
  transportationDepartureDate: Date;
  transportationReturnDate: Date;
  transportationArrivalLocalDate: Date;
  transportationLeavingLocalDate: Date;
  createdAt: Date;
}

export interface FeedTrip extends Omit<Trip, "id"> {
  id: number;
  likesCount: number;
  hasAlreadyLike: boolean;
}

export interface FeedTripRaw extends Omit<TripRaw, "id"> {
  id: number;
  likesCount: number;
  hasAlreadyLike: boolean;
}

export interface TripRaw
  extends Omit<
    Trip,
    | "transportationDepartureDate"
    | "transportationReturnDate"
    | "transportationArrivalLocalDate"
    | "transportationLeavingLocalDate"
    | "createdAt"
  > {
  transportationDepartureDate: string;
  transportationReturnDate: string;
  transportationArrivalLocalDate: string;
  transportationLeavingLocalDate: string;
  createdAt: string;
}

export interface City {
  id: number;
  name: string;
  countryCode: string;
  slug: string;
  code: string;
  kiwiDstPopularityScore: number;
  lat: number;
  lon: number;
  soloPricePerPersonMin: number;
  soloPricePerPersonMax: number;
  multiplePricePerPersonMin: number;
  multiplePricePerPersonMax: number;
  cityPic: string | null;
}

export interface Airport {
  iataCode: string;
  name: string;
  city: string;
  countryCode: string;
  lat: number;
  lon: number;
  type: AirportType;
}

export enum AirportType {
  SMALL_AIRPORT,
  MEDIUM_AIRPORT,
  LARGE_AIRPORT,
}

export enum SortingOption {
  "POPULARITY" = "POPULARITY",
  "CHEAPER" = "CHEAPER",
}

export enum LiveFeedWebSocketRequestType {
  LIKE,
  UNLIKE,
}

export interface LiveFeedWebSocketRequest {
  type: LiveFeedWebSocketRequestType;
  params: Record<string, unknown>;
}

export enum LiveFeedWebSocketResponseType {
  ERROR = -1,
  REFRESH_DATA,
}

export interface LiveFeedWebSocketResponse {
  type: LiveFeedWebSocketResponseType;
  params: Record<string, unknown>;
}

export async function searchAndSaveTrips(form: SearchTripsForm): Promise<void> {
  try {
    const { data: trips } = await searchTrips(form);
    localStorage.setItem(TRIPS_STORAGE_KEY, JSON.stringify(trips));
  } catch (e) {
    throw e;
  }
}

export function getAirportTypeKey(airportTypeValue: AirportType): string {
  const keys = Object.keys(AirportType).filter(
    (key) => AirportType[key as keyof typeof AirportType] === airportTypeValue,
  );

  return keys[0] || "";
}

export function mapFeedTripRawToFeedTrip(tripRaw: FeedTripRaw): FeedTrip {
  return {
    ...tripRaw,
    transportationDepartureDate: parseISO(tripRaw.transportationDepartureDate),
    transportationReturnDate: parseISO(tripRaw.transportationReturnDate),
    transportationArrivalLocalDate: parseISO(
      tripRaw.transportationArrivalLocalDate,
    ),
    transportationLeavingLocalDate: parseISO(
      tripRaw.transportationLeavingLocalDate,
    ),
    createdAt: parseISO(tripRaw.createdAt),
  };
}

export function mapTripRawToTrip(tripRaw: TripRaw): Trip {
  return {
    ...tripRaw,
    transportationDepartureDate: parseISO(tripRaw.transportationDepartureDate),
    transportationReturnDate: parseISO(tripRaw.transportationReturnDate),
    transportationArrivalLocalDate: parseISO(
      tripRaw.transportationArrivalLocalDate,
    ),
    transportationLeavingLocalDate: parseISO(
      tripRaw.transportationLeavingLocalDate,
    ),
    createdAt: parseISO(tripRaw.createdAt),
  };
}

export function mapTripToTripRaw(tripRaw: Trip): TripRaw {
  return {
    ...tripRaw,
    transportationDepartureDate: formatISO(tripRaw.transportationDepartureDate),
    transportationReturnDate: formatISO(tripRaw.transportationReturnDate),
    transportationArrivalLocalDate: formatISO(
      tripRaw.transportationArrivalLocalDate,
    ),
    transportationLeavingLocalDate: formatISO(
      tripRaw.transportationLeavingLocalDate,
    ),
    createdAt: formatISO(tripRaw.createdAt),
  };
}
