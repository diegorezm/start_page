<script setup lang="ts">
import { onMounted, ref } from "vue";

const icon1 = "/assets/icons/icon.png";
const icon2 = "/assets/icons/icon2.png";
const icon3 = "/assets/icons/icon3.png";

const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomIcon = (index: number) => {
  const icons = [icon1, icon2, icon3];
  return icons[index];
};

const icon = ref("");
onMounted(() => {
  const iconIndex = random(0, 2);
  icon.value = getRandomIcon(iconIndex);
  console.log(icon.value);
});
</script>

<template>
  <div
    class="flex items-center justify-center h-fit w-36 hover:rotate-180 hover:cursor-pointer delay-200 transition-all"
  >
    <img :src="icon" class="bg-primary rounded-full" />
  </div>
</template>
