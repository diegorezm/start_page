<!-- eslint-disable vue/first-attribute-linebreak -->
<script setup lang="ts">
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
import useSections from "@/lib/hooks/use-sections";
import { Icon, listIcons } from "@iconify/vue";

type DefaultValues = {
  id?: number;
  label: string;
  url: string;
  icon: string;
  section: string;
};

const props = defineProps<{
  initialValues?: DefaultValues;
  onSubmit: (values: DefaultValues) => void;
}>();

const { getAllSections, getSectionKeys } = useSections();
const sectionList = getAllSections();
const sectionKeys = getSectionKeys();
const iconNames = listIcons();
const selectedIcon = ref(props.initialValues?.icon ?? "");
const searchIcon = ref("");
const open = ref(false);

const formSchema = toTypedSchema(
  z.object({
    id: z.number().optional(),
    label: z.string().min(3),
    url: z.string().url(),
    icon: z.string().min(1),
    section: z.string().refine((e) => sectionKeys.includes(e), {
      message: "The section must be one of the available section IDs.",
    }),
  }),
);

const filteredIcons = computed(() =>
  searchIcon.value === ""
    ? iconNames
    : iconNames.filter((icon) => {
        return icon.toLowerCase().includes(searchIcon.value.toLowerCase());
      }),
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

const defaultValues: DefaultValues = {
  id: undefined,
  label: "",
  url: "",
  icon: "",
  section: sectionKeys[0] || "",
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
  props.onSubmit(values);
});
</script>

<template>
  <form class="space-y-2 p-2" @submit="onSubmit">
    <FormField v-slot="{ componentField, value }" name="id">
      <FormItem>
        <FormControl>
          <Input
            type="hidden"
            placeholder="Your label..."
            v-bind="componentField"
            :value="value"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField, value }" name="label">
      <FormItem>
        <FormLabel>Label</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Your label..."
            v-bind="componentField"
            :value="value"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField, value }" name="url">
      <FormItem>
        <FormLabel>URL</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Bookmark url..."
            v-bind="componentField"
            :value="value"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ errorMessage }" name="icon">
      <FormItem class="flex flex-col">
        <FormLabel>Icon</FormLabel>
        <Popover v-model:open="open">
          <PopoverTrigger as-child>
            <Button
              variant="outline"
              role="combobox"
              :aria-expanded="open"
              class="w-full justify-start gap-2"
            >
              <Icon :icon="selectedIcon" />
              {{ selectedIcon ? selectedIcon : "Select icon..." }}
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-full p-0">
            <Command v-model="selectedIcon" v-model:search-term="searchIcon">
              <CommandInput
                placeholder="Search icon..."
                @keydown.enter="handleIconInput"
              />
              <CommandEmpty class="px-2">
                No icon found. Press enter to use this icon.
              </CommandEmpty>
              <CommandList>
                <CommandGroup>
                  <CommandItem
                    v-for="icon in filteredIcons"
                    :key="icon"
                    :value="icon"
                    @select="selectIcon(icon)"
                  >
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
          Get more icons at:
          <a href="https://icon-sets.iconify.design/" class="text-primary"
            >iconify</a
          >
        </FormDescription>
      </FormItem>
    </FormField>

    <FormField v-slot="{ field, errorMessage }" name="section">
      <FormItem>
        <FormLabel>Section</FormLabel>
        <FormControl>
          <Select v-bind="field" :default-value="formValues.section">
            <SelectTrigger>
              <SelectValue placeholder="Select a section" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sections</SelectLabel>
                <SelectItem
                  v-for="section in sectionList"
                  :key="section.id"
                  :value="section.id"
                >
                  {{ section.label }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage :message="errorMessage" />
      </FormItem>
    </FormField>

    <Button type="submit"> Submit </Button>
  </form>
</template>
