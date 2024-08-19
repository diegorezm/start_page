<script setup lang="ts">
import { onMounted } from "vue";
import useSections from "./lib/hooks/use-sections";
import sections from "./lib/context/section-context";
import SectionComponent from "./components/section-component.vue";
import IconContainer from "./components/icon-container.vue";
import ClockComponent from "./components/clock-component.vue";
import Sidebar from "./components/sidebar/sidebar.vue";
import useWallpaper from "./lib/hooks/use-wallpaper";
import ContainerComponent from "./components/container-component.vue";
import AddBookmarkSheetComponent from "./components/add-bookmark-sheet-component.vue";
import EditBookmarkSheetComponent from "./components/edit-bookmark-sheet-component.vue";
import useTheme from "./lib/hooks/use-theme";

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
    <nav class="flex justify-between items-center w-full p-2">
      <div />
      <ClockComponent />
      <Sidebar />
    </nav>
    <AddBookmarkSheetComponent />
    <EditBookmarkSheetComponent />
    <section
      class="flex flex-col items-center justify-center w-full overflow-y-scroll"
    >
      <IconContainer />
      <div
        class="w-2/3 md:w-fit p-6 md:p-2 border border-primary rounded-lg space-y-2 2xl:space-y-4 bg-background"
      >
        <SectionComponent
          v-for="section in sections"
          :key="section.label"
          :section="section"
        />
      </div>
    </section>
    <div />
  </ContainerComponent>
</template>
