import Bookmark from "./bookmark";

export default interface Section {
  label: string;
  icon: string;
  bookmarks: Bookmark[];
}

export type SectionRecord = Record<string, Section>;
