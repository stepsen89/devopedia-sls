export interface EntryUpdate {
  entryId: string;
  done?: boolean;
  repeated?: number;
  required?: boolean;
  title?: string;
  description?: string;
  links?: string;
}
