import Bookmark from "./bookmark";

export default interface Section {
  id: string;
  label: string;
  icon: string;
  bookmarks: Bookmark[];
}

export interface SectionDTO {
  id?: string;
  label: string;
  icon: string;
  bookmarks: Bookmark[];
}

export type SectionRecord = Record<string, Section>;
