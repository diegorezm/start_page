<script setup lang="ts">
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import Input from "@/components/ui/input/Input.vue";
import Button from "@/components/ui/button/Button.vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { computed, ref, watch } from "vue";
import { SectionDTO } from "@/lib/interfaces/section";
import { editMode } from "@/lib/context/edit-context";
import useSections from "@/lib/hooks/use-sections";
import { useOpenEditSectionSheet } from "@/lib/hooks/use-open-edit-section";
import { Icon, listIcons } from "@iconify/vue";

const { deleteSection } = useSections();
const { onClose } = useOpenEditSectionSheet();

const props = defineProps<{
  initialValues?: SectionDTO;
  onSubmit: (values: SectionDTO) => void;
}>();

const iconNames = listIcons();
const open = ref(false);
const selectedIcon = ref(props.initialValues?.icon ?? "");

const formSchema = toTypedSchema(
  z.object({
    id: z.string().optional(),
    label: z.string().min(1),
    icon: z.string().min(1),
  }),
);

const defaultValues = {
  id: undefined,
  label: "",
  icon: "",
  Bookmarks: [],
};

const formValues = computed(() => {
  if (props.initialValues !== undefined) {
    return props.initialValues;
  }
  return defaultValues;
});

const form = useForm({
  validationSchema: formSchema,
  initialValues: formValues.value,
});

watch(selectedIcon, (newIcon) => {
  form.setValues({ ...form.values, icon: newIcon });
});

form.resetForm({
  values: formValues.value,
});

const onSubmit = form.handleSubmit((values) => {
  const payload = {
    ...values,
    bookmarks: [],
  };
  props.onSubmit(payload);
});
</script>

<template>
  <form class="space-y-2 p-2" @submit="onSubmit">
    <FormField v-slot="{ componentField, value }" name="label">
      <FormItem>
        <FormLabel>Label</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Your label..." v-bind="componentField" :value="value" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ errorMessage }" name="icon">
      <FormItem class="flex flex-col">
        <FormLabel>Icon</FormLabel>
        <Popover v-model:open="open">
          <PopoverTrigger as-child>
            <Button variant="outline" role="combobox" :aria-expanded="open" class="w-full justify-start gap-2">
              <Icon :icon="selectedIcon" />
              {{ selectedIcon ? selectedIcon : "Select icon..." }}
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-full p-0">
            <Command v-model="selectedIcon">
              <CommandInput placeholder="Search icon..." />
              <CommandEmpty>No icon found.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  <CommandItem v-for="icon in iconNames" :key="icon" :value="icon" @select="open = false">
                    <Icon :icon="icon" class="mr-2" />
                    {{ icon }}
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <FormMessage :message="errorMessage" />
      </FormItem>
    </FormField>

    <div class="space-x-2">
      <Button type="submit">
        Submit
      </Button>
      <Button v-if="editMode" type="button" variant="destructive" @click="() => {
        deleteSection(initialValues?.id!);
        onClose();
      }
        ">
        Delete
      </Button>
    </div>
  </form>
</template>
