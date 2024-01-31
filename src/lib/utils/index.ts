import { Tag, type Bookmarks, type Links } from "$lib/interfaces";
import { browser } from "$app/environment";

type CreateJsonData = (data: Bookmarks) => Bookmarks | []
export const createJsonData: CreateJsonData = (data: Bookmarks) => {
  if (browser) {
    localStorage.setItem("bookmarks", JSON.stringify(data));
    return data;
  } else {
    return [];
  }
};

type LoadJsonData = () => boolean | Bookmarks
export const loadJsonData: LoadJsonData = () => {
  if (browser) {
    const data = localStorage.getItem("bookmarks");
    if (data) {
      const bookmarks: Bookmarks = JSON.parse(data);
      return bookmarks;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

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
};

export const updateBookmark = (link: Links) => {
  const bookmarks = loadBookmark();
  const tag = link.tag;
  const section = bookmarks[tag];

  const updatedSection = section.map(el => {
    if (el.id === link.id) {
      return link;
    }
    return el;
  });
  bookmarks[tag] = updatedSection;
  return bookmarks;
};

export const deleteBookmark = (link: Links) => {
  const bookmarks = loadBookmark();
  const tag = link.tag;
  const section = bookmarks[tag];
  const updatedSection = section.filter((el) => el.id !== link.id);
  bookmarks[tag] = updatedSection;
  return bookmarks;
};

export const createBookMark = (link: Links) => {
  const bookmarks = loadBookmark();
  const tag = link.tag;
  const section = bookmarks[tag];
  const updatedSection = [...section, link];
  bookmarks[tag] = updatedSection;
  return bookmarks;
};

export const uniqueID = () => {
  return Math.floor(Math.random() * Date.now());
};

