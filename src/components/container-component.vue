<script setup lang="ts">
import userWallpaper from "@/lib/context/wallpaper-context";
import { ref, watch } from "vue";

const container = ref<HTMLDivElement | null>(null);
const wallpaperExists = ref(false);

const updateBackground = (wallpaper: string | null) => {
  wallpaperExists.value = !!wallpaper;
  console.log(wallpaperExists.value);
  if (container.value) {
    container.value.style.backgroundImage = wallpaper
      ? `url(${wallpaper})`
      : "var(--gradient)";
  }
};

watch(
  () => userWallpaper.value,
  (newWallpaper) => {
    updateBackground(newWallpaper);
  },
  { immediate: true },
);
</script>

<template>
  <div
    class="img_container bg-background relative flex flex-col items-center justify-center w-full h-screen overflow-hidden"
    ref="container"
  >
    <div
      class="absolute inset-0 bg-black/60 backdrop-blur-sm"
      v-if="wallpaperExists"
    />
    <div class="relative z-10 w-full h-full space-y-5 lg:space-y-20">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.img_container {
  background-position: center;
  background-size: cover;
}
</style>
