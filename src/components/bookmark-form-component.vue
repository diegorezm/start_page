<script setup lang="ts">
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
import Input from "./ui/input/Input.vue";
import Button from "./ui/button/Button.vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { computed } from "vue";
import useSections from "@/lib/hooks/use-sections";

const { getSectionKeys } = useSections();
const sectionKeys = getSectionKeys();

const formSchema = toTypedSchema(
  z.object({
    id: z.number().optional(),
    label: z.string().min(3),
    url: z.string().url(),
    icon: z.string().min(1),
    section: z.enum(Object.values(sectionKeys) as [string, ...string[]], {
      message: "The section must be one of the available section keys.",
    }),
  }),
);

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

const defaultValues: DefaultValues = {
  id: undefined,
  label: "",
  url: "",
  icon: "",
  section: sectionKeys[0],
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

form.resetForm({
  values: formValues.value,
});

const onSubmit = form.handleSubmit((values) => {
  props.onSubmit(values);
});
</script>

<template>
  <form @submit="onSubmit" class="space-y-2 p-2">
    <FormField name="id" v-slot="{ componentField, value }">
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
    <FormField name="label" v-slot="{ componentField, value }">
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

    <FormField name="url" v-slot="{ componentField, value }">
      <FormItem>
        <FormLabel>URL</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Image URL..."
            v-bind="componentField"
            :value="value"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField name="icon" v-slot="{ componentField, value }">
      <FormItem>
        <FormLabel>Icon</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Icon..."
            v-bind="componentField"
            :value="value"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField name="section" v-slot="{ field, errorMessage }">
      <FormItem>
        <FormLabel>Section</FormLabel>
        <FormControl>
          <Select v-bind="field" :defaultValue="formValues.section">
            <SelectTrigger>
              <SelectValue placeholder="Select a section" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sections</SelectLabel>
                <SelectItem
                  v-for="sectionKey in sectionKeys"
                  :key="sectionKey"
                  :value="sectionKey"
                >
                  {{ sectionKey }}
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
