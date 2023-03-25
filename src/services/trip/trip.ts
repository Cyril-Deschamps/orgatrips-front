import { DateRange } from "../forms/DateRangeField";

export const budgetMax = 25000 as const;

export interface SearchTripForm {
  departureCity: string;
  dateRange: DateRange;
  budgetMax: number;
  adultsNumber: number;
  childrenNumber: number;
  locale: Locale["code"];
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
