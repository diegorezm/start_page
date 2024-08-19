<script setup lang="ts">
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { openAddBookmarkSheet } from "@/lib/context/bookmark-sheet-context";
import BookmarkFormComponent from "./bookmark-form-component.vue";
import useBookmarks from "@/lib/hooks/use-bookmarks";
import Bookmark from "@/lib/interfaces/bookmark";
import uniqueID from "@/lib/helpers/unique-id-helper";
const { createBookmark } = useBookmarks();
</script>

<template>
  <Sheet
    :open="openAddBookmarkSheet.isOpen"
    @update:open="openAddBookmarkSheet.onClose"
  >
    <SheetContent>
      <SheetHeader>
        <SheetTitle>New bookmark</SheetTitle>
        <SheetDescription>
          You are about to create a bookmark.
        </SheetDescription>
      </SheetHeader>
      <BookmarkFormComponent
        :onSubmit="
          (values) => {
            const bookmark: Bookmark = {
              ...values,
              id: uniqueID(),
            };
            createBookmark(values.section, bookmark);
            openAddBookmarkSheet.onClose();
          }
        "
      />
    </SheetContent>
  </Sheet>
</template>
