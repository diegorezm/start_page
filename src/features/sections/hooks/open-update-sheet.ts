import {create} from "zustand";

type OpenUpdateSectionState = {
  isOpen: boolean;
  section: string | null;
  onOpen: (section: string) => void;
  onClose: () => void;
}

export const openUpdateSection = create<OpenUpdateSectionState>((set) => ({
  isOpen: false,
  section: null,
  onOpen: (section) => set({isOpen: true, section}),
  onClose: () => set({isOpen: false, section: null}),
}));

