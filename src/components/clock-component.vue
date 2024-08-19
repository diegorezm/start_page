<script setup lang="ts">
import { Clock } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';

  const getCurrentTime = () => {
    const lang = () => {
      if (typeof navigator !== "undefined") {
        return navigator.language;
      } else {
        return "pt-BR";
      }
    };
    const date = new Date();
    return date.toLocaleTimeString(lang(), {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  let currentTime = ref(getCurrentTime());

  onMounted(() => {
    const interval = setInterval(() => {
      currentTime.value = getCurrentTime();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<template>
  <div class="flex items-center gap-2 text-2xl">
    <Clock/>
    {{currentTime}}
  </div>
</template>
