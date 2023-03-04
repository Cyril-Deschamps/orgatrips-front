import { DateRange } from "../forms/DateRangeField";

export const budgetMinMax = { min: 0, max: 25000 } as const;

export interface SearchDestinationForm {
  dateRange: DateRange;
  budget: { min: number; max: number };
  numberOfAdults: number;
  numberOfChildren: number;
}

export interface Destination {
  name: string;
}
