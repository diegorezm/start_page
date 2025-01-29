import { create } from "zustand";

type OpenExportDialogState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const openExportDialog = create<OpenExportDialogState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
