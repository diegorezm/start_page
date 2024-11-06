import {create} from "zustand";

type OpenCreateBookmarkState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const openCreateBookmark = create<OpenCreateBookmarkState>((set) => ({
  isOpen: false,
  onOpen: () => set({isOpen: true}),
  onClose: () => set({isOpen: false}),
}));
