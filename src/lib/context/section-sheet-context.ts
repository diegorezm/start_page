import { ref } from "vue";

type OpenAddSectionSheetState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const openAddSectionSheet = ref<OpenAddSectionSheetState>({
  isOpen: false,
  onOpen: () => {
    openAddSectionSheet.value.isOpen = true;
  },
  onClose: () => {
    openAddSectionSheet.value.isOpen = false;
  },
});
