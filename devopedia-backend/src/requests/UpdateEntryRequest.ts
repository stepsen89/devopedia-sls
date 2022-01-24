/**
 * Fields in a request to update a single TODO item.
 */
export interface UpdateEntryRequest {
  title?: string;
  repeated?: number;
  description?: string;
  link?: string;
  done?: boolean;
  repeatingTimes?: number;
}
