import sections from "../context/section-context";
import sectionStorageHelper from "../helpers/section-storage-helper";
import type Bookmark from "../interfaces/bookmark";

const useBookmarks = () => {
  const { saveToStorage } = sectionStorageHelper();
  const createBookmarks = (section: string, bookmarks: Bookmark[]) => {
    const sectionValue = sections.value;
    if (section in sectionValue) {
      const sec = sectionValue[section];
      sec.bookmarks = [...sec.bookmarks, ...bookmarks];
      sections.value = sectionValue;
      saveToStorage();
    }
  };
  const createBookmark = (section: string, bookmark: Bookmark) => {
    const sectionValue = sections.value;
    if (section in sectionValue) {
      const sec = sectionValue[section];
      sec.bookmarks = [...sec.bookmarks, bookmark];
      sections.value = sectionValue;
      saveToStorage();
    }
  };
  const updateBookmark = (
    section: string,
    bookmarkId: number,
    bookmark: Bookmark,
  ) => {
    const sectionValue = sections.value;
    if (section in sectionValue) {
      const sec = sectionValue[section];
      const bookmarkIdx = sec.bookmarks.findIndex((e) => e.id === bookmarkId);
      if (bookmarkIdx >= 0) {
        sec.bookmarks[bookmarkIdx] = bookmark;
        sections.value = sectionValue;
        saveToStorage();
      }
    }
  };

  const deleteBookmark = (section: string, bookmarkId: number) => {
    const sectionValue = sections.value;
    if (section in sectionValue) {
      const sec = sectionValue[section];
      sec.bookmarks = sec.bookmarks.filter((e) => e.id !== bookmarkId);
      sections.value = sectionValue;
      saveToStorage();
    }
  };

  return {
    createBookmarks,
    createBookmark,
    updateBookmark,
    deleteBookmark,
  };
};

export default useBookmarks;
