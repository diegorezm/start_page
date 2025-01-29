import { create } from "zustand";

type OpenImportDialogState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const openImportDialog = create<OpenImportDialogState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
