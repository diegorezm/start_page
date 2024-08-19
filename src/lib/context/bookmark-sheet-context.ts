import { ref } from "vue";

type OpenAddBookmarkSheetState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const openAddBookmarkSheet = ref<OpenAddBookmarkSheetState>({
  isOpen: false,
  onOpen: () => {
    openAddBookmarkSheet.value.isOpen = true;
  },
  onClose: () => {
    openAddBookmarkSheet.value.isOpen = false;
  },
});
