import {create} from "zustand";

type OpenUpdateBookmarkState = {
  isOpen: boolean;
  bookmarkId: string | null;
  section: string | null;
  onOpen: (bookmarkId: string, section: string) => void;
  onClose: () => void;
}

export const openUpdateBookmark = create<OpenUpdateBookmarkState>((set) => ({
  isOpen: false,
  bookmarkId: null,
  section: null,
  onOpen: (bookmarkId, section) => set({isOpen: true, bookmarkId, section}),
  onClose: () => set({isOpen: false, bookmarkId: null, section: null}),
}));
