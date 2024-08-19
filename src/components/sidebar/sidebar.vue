<script setup lang="ts">
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Settings } from "lucide-vue-next";
import WallpaperInput from "./wallpaper-input.vue";
import EditModeComponent from "./edit-mode-component.vue";
import { Separator } from "@/components/ui/separator";
import AddBookmarkComponent from "./add-bookmark-component.vue";
import ThemeSelect from "./theme-select.vue";
</script>

<template>
  <Sheet>
    <SheetTrigger class="mb-1">
      <Settings />
    </SheetTrigger>
    <SheetContent class="space-y-4">
      <SheetHeader>
        <SheetTitle class="text-3xl">Configuration</SheetTitle>
      </SheetHeader>

      <div>
        <SheetTitle class="text-lg">Wallpapers</SheetTitle>
        <WallpaperInput />
      </div>

      <div>
        <SheetTitle class="text-lg">Themes</SheetTitle>
        <ThemeSelect />
      </div>

      <Separator />

      <div class="flex flex-col items-center justify-center w-full gap-2">
        <SheetTitle class="text-left w-full text-2xl">Bookmarks</SheetTitle>

        <SheetTitle class="text-left w-full text-lg">Edit</SheetTitle>
        <EditModeComponent />

        <SheetTitle class="text-left w-full text-lg">Add</SheetTitle>
        <AddBookmarkComponent />
      </div>
    </SheetContent>
  </Sheet>
</template>
