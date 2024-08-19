<script setup lang="ts">
import { ref } from "vue";
import Button from "../ui/button/Button.vue";
import Input from "../ui/input/Input.vue";
import useWallpaper from "@/lib/hooks/use-wallpaper";
const { setWallpaper, removeWallpaper } = useWallpaper();

const wallpaperUrl = ref<string | undefined>(undefined);
const onSubmit = () => {
  if (wallpaperUrl.value !== undefined) {
    setWallpaper(wallpaperUrl.value);
  }
  wallpaperUrl.value = undefined;
};
</script>

<template>
  <form class="space-y-3" @submit.prevent="onSubmit">
    <Input
      id="wallpaper-input"
      placeholder="Your wallpaper link here..."
      v-model="wallpaperUrl"
    />
    <div class="space-x-2">
      <Button variant="default" size="sm"> Save </Button>
      <Button
        variant="outline"
        size="sm"
        type="submit"
        @click="removeWallpaper()"
      >
        Remove
      </Button>
    </div>
  </form>
</template>
