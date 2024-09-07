<script setup lang="ts">
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import WallpaperInput from "./wallpaper-input.vue";
import EditModeComponent from "./edit-mode-component.vue";
import AddBookmarkComponent from "./add-bookmark-component.vue";
import ThemeSelect from "./theme-select.vue";
import AddSectionComponent from "./add-section-component.vue";
import { openSidebarContext } from "@/lib/context/sidebar-context";
</script>

<template>
  <Sheet :open="openSidebarContext.isOpen" @update:open="openSidebarContext.onClose">
    <SheetContent class="space-y-4">
      <SheetHeader>
        <SheetTitle class="text-3xl">
          Configuration
        </SheetTitle>
        <SheetDescription>
          Here is where you configure your start page!
        </SheetDescription>
      </SheetHeader>

      <div>
        <SheetTitle class="text-lg">
          Wallpapers
        </SheetTitle>
        <WallpaperInput />
      </div>

      <div>
        <SheetTitle class="text-lg">
          Themes
        </SheetTitle>
        <ThemeSelect />
      </div>

      <div class="space-y-2">
        <SheetTitle class="text-left w-full text-lg">
          Edit mode
        </SheetTitle>
        <EditModeComponent />
      </div>

      <div>
        <SheetTitle class="text-left w-full text-lg">
          Sections
        </SheetTitle>
        <AddSectionComponent />
      </div>

      <div>
        <SheetTitle class="text-left w-full text-lg">
          Bookmarks
        </SheetTitle>
        <AddBookmarkComponent />
      </div>
    </SheetContent>
  </Sheet>
</template>
