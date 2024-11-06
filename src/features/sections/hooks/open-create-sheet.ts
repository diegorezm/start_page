import {create} from "zustand";

type OpenCreateSectionState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const openCreateSection = create<OpenCreateSectionState>((set) => ({
  isOpen: false,
  onOpen: () => set({isOpen: true}),
  onClose: () => set({isOpen: false}),
}));
