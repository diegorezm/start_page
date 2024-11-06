import {create} from "zustand";

type OpenSidebarState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const openSidebar = create<OpenSidebarState>((set) => ({
  isOpen: false,
  onOpen: () => set({isOpen: true}),
  onClose: () => set({isOpen: false}),
}));
