<script setup lang="ts">
import { Plus } from "lucide-vue-next";
import Button from "../ui/button/Button.vue";
import { openAddSectionSheet } from "@/lib/context/section-sheet-context";
import { openSidebarContext } from "@/lib/context/sidebar-context";
const handleClick = () => {
  openSidebarContext.value.onClose();
  openAddSectionSheet.value.onOpen();
};
</script>

<template>
  <Button @click="handleClick" class="w-full" size="xs">
    <Plus class="size-4 mr-2" />
    Add section
  </Button>
</template>
