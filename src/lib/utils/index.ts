import { Tag, type Bookmarks } from "$lib/interfaces"
import { browser } from "$app/environment"

type CreateJsonData = (data: Bookmarks) => Bookmarks | []
export const createJsonData: CreateJsonData = (data: Bookmarks) => {
  if (browser) {
    localStorage.setItem("bookmarks", JSON.stringify(data));
    return data
  } else {
    return []
  }
}

type LoadJsonData = () => boolean | Bookmarks
export const loadJsonData: LoadJsonData = () => {
  if (browser) {
    const data = localStorage.getItem("bookmarks");
    if (data) {
      const bookmarks: Bookmarks = JSON.parse(data);
      return bookmarks;
    } else {
      return false
    }
  } else {
    return false
  }
}

type LoadBookmarks = (data?: Bookmarks) => Bookmarks
export const loadBookmark: LoadBookmarks = (data) => {
  const jsonData = loadJsonData();
  if (jsonData instanceof Object) {
    return jsonData;
  } else {
    if (data) {
      createJsonData(data);
      return data;
    }
    const emptyBookmarks: Bookmarks = Object.keys(Tag).reduce((acc, tag) => {
      acc[tag as Tag] = [];
      return acc;
    }, {} as Bookmarks);
    return emptyBookmarks;
  }
}
