"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import SelectIcon from "@/components/select-icon";

import {Section, sectionSchema} from "@/interfaces/section";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {lucideIcons} from "@/interfaces/icon";

export type SectionFormProps = {
  fields?: Section;
  onSubmit: (fields: Section) => void;
  isLoading?: boolean;
  onDelete?: () => void;
};

export const SectionForm = ({fields, onSubmit, onDelete, isLoading = false}: SectionFormProps) => {
  const icons = Object.keys(lucideIcons);

  const form = useForm<Section>({
    resolver: zodResolver(sectionSchema),
    defaultValues: {
      bookmarks: fields?.bookmarks ?? [],
      label: fields?.label ?? "",
      icon: fields?.icon ?? icons[0],
      id: fields?.id ?? "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <FormField control={form.control} name="label" render={({field}) => (
          <FormItem>
            <FormLabel>Label</FormLabel>
            <FormControl>
              <Input {...field} type="text" placeholder="Label" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <br />
        <FormField control={form.control} name="icon" render={({field}) => (
          <FormItem className="flex flex-col">
            <FormLabel>Icon</FormLabel>
            <FormControl>
              <SelectIcon
                icon={field.value}
                onSelect={(icon) => form.setValue("icon", icon)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <br />

        <div className="flex justify-end gap-4">
          <Button type="submit" className="w-full" disabled={isLoading}>Save</Button>
          {onDelete && (
            <Button variant="destructive" onClick={onDelete} className="w-full" disabled={isLoading}>
              Delete
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};
