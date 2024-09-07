<script setup lang="ts">
import { onMounted } from "vue";

import SectionComponent from "@/components/sections/section-component.vue";
import IconContainer from "./components/icon-container.vue";
import ClockComponent from "./components/clock-component.vue";
import ContainerComponent from "./components/container-component.vue";
import AddBookmarkSheetComponent from "@/components/bookmarks/add-bookmark-sheet-component.vue";
import EditBookmarkSheetComponent from "@/components/bookmarks/edit-bookmark-sheet-component.vue";
import AddSectionComponent from "./components/sections/add-section-component.vue";
import EditSectionComponent from "./components/sections/edit-section-component.vue";
import Sidebar from "./components/sidebar/sidebar-component.vue";


import useTheme from "./lib/hooks/use-theme";
import useWallpaper from "./lib/hooks/use-wallpaper";
import useSections from "./lib/hooks/use-sections";
import { openSidebarContext } from "./lib/context/sidebar-context";
import sections from "./lib/context/section-context";
import { Settings } from "lucide-vue-next";

const { loadSections } = useSections();
const { loadWallpaper } = useWallpaper();
const { loadTheme } = useTheme();

onMounted(() => {
  loadSections();
  loadWallpaper();
  loadTheme();
});
</script>

<template>
  <ContainerComponent>
    <AddSectionComponent />
    <EditSectionComponent />
    <AddBookmarkSheetComponent />
    <EditBookmarkSheetComponent />
    <Sidebar />

    <nav class="flex justify-between items-center w-full p-2">
      <div />
      <ClockComponent />
      <div class="mt-1 hover:cursor-pointer" @click="openSidebarContext.onOpen()">
        <Settings />
      </div>
    </nav>

    <section class="flex flex-col items-center justify-center w-full overflow-y-scroll">
      <IconContainer />
      <div class="w-2/3 md:w-fit p-6 md:p-2 border border-primary rounded-lg space-y-2 2xl:space-y-4 bg-background">
        <SectionComponent v-for="section in sections" :key="section.label" :section="section" />
      </div>
    </section>
    <div />
  </ContainerComponent>
</template>
