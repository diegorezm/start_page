import type Link from "$lib/interfaces/link";
import { writable, type Writable } from "svelte/store";
export type EditFormMetadata = {
  section: string;
  link: Link;
};
export const defaultFormMetaData: EditFormMetadata = {
  section: "",
  link: {
    id: 0,
    title: "",
    link: "",
    icon: "",
  },
};
export const editMode: Writable<boolean> = writable(false);
export const editFormMetadata: Writable<EditFormMetadata> = writable();

