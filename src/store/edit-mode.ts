import {create} from "zustand";

type EditModeState = {
  isEditMode: boolean;
  toggleEditMode: () => void;
}

export const useEditModeStore = create<EditModeState>()((set, get) => ({
  isEditMode: false,
  toggleEditMode: () => set({isEditMode: !get().isEditMode}),
}));
