<script setup lang="ts">
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import SectionFormComponent from "./section-form-component.vue";
import useSections from "@/lib/hooks/use-sections";
import { openAddSectionSheet } from "@/lib/context/section-sheet-context";
import Section from "@/lib/interfaces/section";
import uniqueID from "@/lib/helpers/unique-id-helper";
const { createSection } = useSections();
</script>

<template>
  <Sheet
    :open="openAddSectionSheet.isOpen"
    @update:open="openAddSectionSheet.onClose"
  >
    <SheetContent>
      <SheetHeader>
        <SheetTitle>New section</SheetTitle>
        <SheetDescription>
          You are about to create a Section.
        </SheetDescription>
      </SheetHeader>
      <SectionFormComponent
        :onSubmit="
          (values) => {
            const section: Section = {
              id: uniqueID().toString(),
              icon: values.icon,
              label: values.label,
              bookmarks: [],
            };
            createSection(section);
            openAddSectionSheet.onClose();
          }
        "
      />
    </SheetContent>
  </Sheet>
</template>
