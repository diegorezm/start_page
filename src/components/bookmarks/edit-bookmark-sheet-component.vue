<script setup lang="ts">
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import BookmarkFormComponent from "./bookmark-form-component.vue";
import useBookmarks from "@/lib/hooks/use-bookmarks";
import { ref, watch } from "vue";
import {
  defaultFormMetaData,
  useOpenEditBookmarkSheet,
} from "@/lib/hooks/use-open-edit-bookmarks";

const openEditBookmarkSheet = useOpenEditBookmarkSheet();

const { updateBookmark } = useBookmarks();

type DefaultValues = {
  id: number;
  url: string;
  icon: string;
  label: string;
  section: string;
};

const defaultValues = ref<DefaultValues>({
  id: defaultFormMetaData.bookmark.id ?? 0,
  url: defaultFormMetaData.bookmark.url,
  icon: defaultFormMetaData.bookmark.icon,
  label: defaultFormMetaData.bookmark.label,
  section: defaultFormMetaData.section,
});

const onSubmit = (data: {
  label: string;
  url: string;
  icon: string;
  section: string;
  id?: number;
}) => {
  console.log("submit: ", data);
  if (data.id === undefined) {
    return;
  }
  updateBookmark(data.section, data.id, {
    ...data,
    id: data.id,
  });
  openEditBookmarkSheet.onClose();
};

watch(
  () => openEditBookmarkSheet.editFormMetadata,
  (newMeta) => {
    if (newMeta) {
      defaultValues.value = {
        id: newMeta.bookmark.id as number,
        url: newMeta.bookmark.url as string,
        icon: newMeta.bookmark.icon as string,
        label: newMeta.bookmark.label as string,
        section: newMeta.section as string,
      };
    }
  },
  { immediate: true },
);
</script>

<template>
  <Sheet
    :open="openEditBookmarkSheet.isOpen"
    @update:open="openEditBookmarkSheet.onClose"
  >
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Editing bookmark</SheetTitle>
        <SheetDescription> You are about to edit a bookmark. </SheetDescription>
      </SheetHeader>
      <BookmarkFormComponent
        :initialValues="defaultValues"
        :onSubmit="onSubmit"
      />
    </SheetContent>
  </Sheet>
</template>
