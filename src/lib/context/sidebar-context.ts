import { ref } from "vue";

type OpenSidebarContext = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const openSidebarContext = ref<OpenSidebarContext>({
  isOpen: false,
  onOpen: () => {
    openSidebarContext.value.isOpen = true;
  },
  onClose: () => {
    openSidebarContext.value.isOpen = false;
  },
});
