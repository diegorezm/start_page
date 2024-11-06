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

import {Bookmark, bookmarkSchema} from "@/interfaces/bookmark";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {lucideIcons} from "@/interfaces/icon";

import {z} from "zod";
import SelectSection from "@/components/select-section";
import {useSectionsStore} from "@/features/sections/sections-store";


export type BookmarkFormProps = {
  section?: string;
  fields?: Bookmark;
  onSubmit: (section: string, fields: Bookmark) => void;
  isLoading?: boolean;
  onDelete?: () => void;
};

export const BookmarkForm = ({fields, section, onSubmit, onDelete, isLoading = false}: BookmarkFormProps) => {
  const {sections} = useSectionsStore();
  const iconKeys = Object.keys(lucideIcons);
  const sectionKeys = Object.keys(sections);

  const form = useForm<z.infer<typeof bookmarkSchema>>({
    resolver: zodResolver(bookmarkSchema),
    defaultValues: {
      label: fields?.label ?? "",
      url: fields?.url ?? "",
      icon: fields?.icon ?? iconKeys[0],
      section: section ?? sectionKeys[0],
    },
  });

  const handleSubmit = (data: z.infer<typeof bookmarkSchema>) => {
    onSubmit(data.section, data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full">
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

        <FormField control={form.control} name="url" render={({field}) => (
          <FormItem>
            <FormLabel>URL</FormLabel>
            <FormControl>
              <Input {...field} type="text" placeholder="URL" />
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

        <FormField control={form.control} name="section" render={({field}) => (
          <FormItem className="flex flex-col">
            <FormLabel>Section</FormLabel>
            <FormControl>
              <SelectSection
                section={field.value}
                onSelect={(section) => form.setValue("section", section)}
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

