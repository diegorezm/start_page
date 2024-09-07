import { defineStore } from "pinia";
import { ref } from "vue";
import Section from "../interfaces/section";

export const defaultSectionFormMetaData: Section = {
  id: "",
  icon: "",
  label: "",
  bookmarks: [],
};

export const useOpenEditSectionSheet = defineStore("open-edit-section-state", {
  state: () => {
    return {
      isOpen: false,
      editFormMetadata: ref<Section | null>(null),
    };
  },
  actions: {
    onOpen(meta: Section) {
      this.isOpen = true;
      this.editFormMetadata = meta;
    },
    onClose() {
      this.isOpen = false;
      this.editFormMetadata = null;
    },
  },
});
