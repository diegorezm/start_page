<script setup lang="ts">
import { Plus } from "lucide-vue-next";
import Button from "../ui/button/Button.vue";
import { openAddBookmarkSheet } from "@/lib/context/bookmark-sheet-context";
import { openSidebarContext } from "@/lib/context/sidebar-context";
const handleClick = () => {
  openSidebarContext.value.onClose();
  openAddBookmarkSheet.value.onOpen();
};
</script>

<template>
  <Button @click="handleClick">
    <Plus class="size-4 mr-2" />
    Add bookmark
  </Button>
</template>
