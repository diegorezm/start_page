export default interface Bookmark {
  id: number;
  label: string;
  url: string;
  icon: string;
}
export type BookmarkDTO = {
  label: string;
  url: string;
  icon: string;
};
