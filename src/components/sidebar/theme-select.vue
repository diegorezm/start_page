<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useTheme, { THEMES, Theme } from "@/lib/hooks/use-theme";
import { ref, watch } from "vue";
const { getTheme, setTheme } = useTheme();
const theme = getTheme();
const selectedTheme = ref<Theme>(theme);
watch(selectedTheme, (newTheme) => {
  setTheme(newTheme);
});
</script>

<template>
  <Select class="w-full" v-model="selectedTheme">
    <SelectTrigger class="w-full">
      <SelectValue placeholder="Select a theme" />
    </SelectTrigger>
    <SelectContent v-model="selectedTheme">
      <SelectGroup>
        <SelectLabel>Themes</SelectLabel>
        <SelectItem v-for="theme in THEMES" :value="theme">
          {{ theme }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
