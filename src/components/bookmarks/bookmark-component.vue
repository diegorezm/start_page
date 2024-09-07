<script setup lang="ts">
import { Icon } from "@iconify/vue";
import Bookmark from "@/lib/interfaces/bookmark";
import Button from "@/components/ui/button/Button.vue";
import { editMode } from "@/lib/context/edit-context";
import useBookmarks from "@/lib/hooks/use-bookmarks";
import { useOpenEditBookmarkSheet } from "@/lib/hooks/use-open-edit-bookmarks";

const { deleteBookmark } = useBookmarks();

const { bookmark, section } = defineProps<{
  bookmark: Bookmark;
  section: string;
}>();

const openEditBookmarkSheet = useOpenEditBookmarkSheet();

const handleEditClick = () => {
  openEditBookmarkSheet.onOpen({
    section: section,
    bookmark: bookmark,
  });
};
const handleClickDelete = () => {
  deleteBookmark(section, bookmark.id);
};
</script>

<template>
  <div>
    <Button variant="ghost" size="sm">
      <a
        class="flex items-center gap-1 text-3xl 2xl:text-4xl w-full h-full"
        :href="bookmark.url"
        target="_blank"
      >
        <Icon :icon="bookmark.icon" />
        {{ bookmark.label }}
      </a>
    </Button>
    <div class="flex items-center justify-center gap-2 w-full" v-if="editMode">
      <Button size="sm" variant="outline" @click="handleClickDelete">
        <Icon icon="ion:trash-outline" class="size-5" />
      </Button>
      <Button size="sm" variant="secondary" @click="handleEditClick">
        <Icon icon="ion:pencil-outline" class="size-5" />
      </Button>
    </div>
  </div>
</template>
