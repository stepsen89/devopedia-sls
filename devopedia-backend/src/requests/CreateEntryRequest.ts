export interface CreateEntryRequest {
  title: string;
  description: string;
  link?: string;
  done?: boolean;
  repeated?: number;
  repeatingTimes?: number;
}
