import { formatISO, parseISO } from "date-fns";
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
  destinationPicture: string;
  Accomodation: Accommodation;
  Transportation: Transportation;
  budgetMax: number;
}

export interface TripRaw extends Omit<Trip, "Transportation"> {
  Transportation: TransportationRaw;
}

export interface Transportation {
  price: number;
  bookingToken: string;
  inboundDuration: number;
  outboundDuration: number;
  stopOverInbound: number;
  stopOverOutbound: number;
  departureDate: Date;
  returnDate: Date;
}

export interface TransportationRaw
  extends Omit<Transportation, "departureDate" | "returnDate"> {
  departureDate: string;
  returnDate: string;
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

export function mapTripRawToTrip(tripRaw: TripRaw): Trip {
  return {
    ...tripRaw,
    Transportation: {
      ...tripRaw.Transportation,
      departureDate: parseISO(tripRaw.Transportation.departureDate),
      returnDate: parseISO(tripRaw.Transportation.returnDate),
    },
  };
}

export function mapTripToTripRaw(tripRaw: Trip): TripRaw {
  return {
    ...tripRaw,
    Transportation: {
      ...tripRaw.Transportation,
      departureDate: formatISO(tripRaw.Transportation.departureDate),
      returnDate: formatISO(tripRaw.Transportation.returnDate),
    },
  };
}
