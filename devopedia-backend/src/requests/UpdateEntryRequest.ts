export interface UpdateEntryRequest {
  title?: string;
  repeated?: number;
  description?: string;
  link?: string;
  done?: boolean;
  repeatingTimes?: number;
}
