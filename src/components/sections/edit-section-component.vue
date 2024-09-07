<script setup lang="ts">
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ref, watch } from "vue";
import SectionFormComponent from "./section-form-component.vue";
import {
  useOpenEditSectionSheet,
  defaultSectionFormMetaData,
} from "@/lib/hooks/use-open-edit-section";
import Bookmark from "@/lib/interfaces/bookmark";
import useSections from "@/lib/hooks/use-sections";

const openEditSectionSheet = useOpenEditSectionSheet();

const { updateSection } = useSections();

const defaultValues = ref({
  ...defaultSectionFormMetaData,
});

const onSubmit = (data: {
  id?: string;
  label: string;
  icon: string;
  bookmarks: Bookmark[];
}) => {
  console.log(data);
  if (data.id !== undefined) {
    // @ts-expect-error: i just check if its undefined dumbass
    updateSection(data);
    openEditSectionSheet.onClose();
  }
};

watch(
  () => openEditSectionSheet.editFormMetadata,
  (newMeta) => {
    if (newMeta) {
      defaultValues.value = {
        ...newMeta,
      };
    }
  },
  { immediate: true },
);
</script>

<template>
  <Sheet
    :open="openEditSectionSheet.isOpen"
    @update:open="openEditSectionSheet.onClose"
  >
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Editing section</SheetTitle>
        <SheetDescription> You are about to edit a sction. </SheetDescription>
      </SheetHeader>
      <SectionFormComponent
        :initialValues="defaultValues"
        :onSubmit="onSubmit"
      />
    </SheetContent>
  </Sheet>
</template>
