export interface EntryItem {
  userId: string;
  entryId: string;
  createdAt: string;
  updatedAt?: string;
  title: string;
  description: string;
  repeatingTimes?: number;
  link?: string;
  done: boolean;
}
