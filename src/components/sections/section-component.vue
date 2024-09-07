<script setup lang="ts">
import { Icon } from "@iconify/vue";
import Section from "@/lib/interfaces/section";
import BookmarkComponent from "@/components/bookmarks/bookmark-component.vue";
import Button from "@/components/ui/button/Button.vue";
import { editMode } from "@/lib/context/edit-context";
import { useOpenEditSectionSheet } from "@/lib/hooks/use-open-edit-section";

const { section } = defineProps<{ section: Section }>();
const { onOpen } = useOpenEditSectionSheet();
const onOpenClick = () => {
  onOpen(section);
};
</script>

<template>
  <div class="space-y-1 md:space-y-4 w-full max-w-screen-2xl px-2 py-1">
    <nav
      class="flex flex-row items-center justify-center gap-1 2xl:gap-3 text-4xl 2xl:text-5xl font-bold text-primary"
    >
      <Icon :icon="section.icon" />
      <h1>{{ section.label }}</h1>
      <div class="ml-2" v-if="editMode">
        <Button size="sm" variant="secondary" @click="onOpenClick">
          <Icon icon="ion:pencil-outline" class="size-5" />
        </Button>
      </div>
    </nav>
    <div
      class="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-1"
    >
      <BookmarkComponent
        v-for="bookmark in section.bookmarks"
        :key="bookmark.id"
        :bookmark="bookmark"
        :section="section.id"
      />
    </div>
  </div>
</template>
