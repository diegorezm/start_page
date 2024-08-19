import { ref } from "vue";
import Bookmark from "../interfaces/bookmark";
import { defineStore } from "pinia";

type EditFormMetaData = {
  section: string;
  bookmark: Bookmark;
};

export const defaultFormMetaData: EditFormMetaData = {
  section: "",
  bookmark: {
    id: 0,
    label: "",
    url: "",
    icon: "",
  },
};
export const editMode = ref(false);

export const useOpenEditBookmarkSheet = defineStore(
  "open-edit-bookmark-state",
  {
    state: () => {
      return {
        isOpen: false,
        editFormMetadata: ref<EditFormMetaData | null>(null),
      };
    },
    actions: {
      onOpen(meta: EditFormMetaData) {
        this.isOpen = true;
        this.editFormMetadata = meta;
      },
      onClose() {
        this.isOpen = false;
        this.editFormMetadata = null;
      },
    },
  },
);
