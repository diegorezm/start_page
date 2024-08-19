<script setup lang="ts">
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { editMode } from "@/lib/context/edit-context";
import { ref, watch } from "vue";
const shouldEditMode = ref(editMode.value);
watch(shouldEditMode, (value) => {
  editMode.value = value;
});
</script>
<template>
  <div class="flex items-center space-x-2">
    <Switch id="edit-mode" v-model:checked="shouldEditMode" />
    <Label for="edit-mode">Edit mode</Label>
  </div>
</template>
