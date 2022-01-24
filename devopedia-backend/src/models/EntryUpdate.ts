export interface EntryUpdate {
  entryId: string;
  done?: boolean;
  repeated?: number;
  repeatingTimes?: number;
  required?: boolean;
  title?: string;
  description?: string;
  link?: string;
  updatedAt: string;
}
