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
import FormDescription from "../ui/form/FormDescription.vue";

const { deleteSection } = useSections();
const { onClose } = useOpenEditSectionSheet();

const props = defineProps<{
  initialValues?: SectionDTO;
  onSubmit: (values: SectionDTO) => void;
}>();

const iconNames = listIcons();
const open = ref(false);
const selectedIcon = ref(props.initialValues?.icon ?? "");
const searchIcon = ref("");

const defaultValues = {
  id: undefined,
  label: "",
  icon: "",
  Bookmarks: [],
};

const formSchema = toTypedSchema(
  z.object({
    id: z.string().optional(),
    label: z.string().min(1),
    icon: z.string().min(1),
  }),
);

const filteredIcons = computed(() =>
  searchIcon.value === '' ?
    iconNames :
    iconNames.filter((icon) => {
      return icon.toLowerCase().includes(searchIcon.value.toLowerCase())
    })
);

const handleIconInput = () => {
  if (!filteredIcons.value.length) {
    selectedIcon.value = searchIcon.value;
    open.value = false;
  }
};

const selectIcon = (icon: string) => {
  selectedIcon.value = icon;
  open.value = false;
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
            <Command v-model="selectedIcon" v-model:search-term="searchIcon">
              <CommandInput placeholder="Search icon..." @keydown.enter="handleIconInput" />
              <CommandEmpty class="px-2">
                No icon found. Press enter to use this icon.
              </CommandEmpty>
              <CommandList>
                <CommandGroup>
                  <CommandItem v-for="icon in filteredIcons" :key="icon" :value="icon" @select="selectIcon(icon)">
                    <Icon :icon="icon" class="mr-2" />
                    {{ icon }}
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <FormMessage :message="errorMessage" />
        <FormDescription>
          Get more icons at: <a href="https://icon-sets.iconify.design/" class="text-blue-600">iconify</a>
        </FormDescription>
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
