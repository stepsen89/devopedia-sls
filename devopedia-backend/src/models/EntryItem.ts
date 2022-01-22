export interface EntryItem {
  userId: string;
  entryId: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  links?: string;
  done: boolean;
  repeated: number;
}
