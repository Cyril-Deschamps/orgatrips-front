import { DateRange } from "../forms/DateRangeField";

export const budgetMax = 25000 as const;

export interface SearchTripsForm {
  departureCity: string;
  dateRange: DateRange;
  budgetMax: number;
  adultsNumber: number;
  childrenNumber: number;
  locale: string;
}

export interface Trip {
  destinationName: string;
  destinationCityCode: string;
  destinationCountryCode: string;
  nightsNumber: number;
  travelersNumber: number;
  popularity: number;
  otherSpentPrice: number;
  totalPrice: number;
  Accomodation: Accommodation;
  Transportation: Transportation;
}

export interface Transportation {
  price: number;
  bookingToken: string;
  inboundDuration: number;
  outboundDuration: number;
  stopOverInbound: number;
  stopOverOutbound: number;
}

export interface Accommodation {
  averagePricePerNight: number;
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

export function getAirportTypeKey(airportTypeValue: AirportType): string {
  const keys = Object.keys(AirportType).filter(
    (key) => AirportType[key as keyof typeof AirportType] === airportTypeValue,
  );

  return keys[0] || "";
}
