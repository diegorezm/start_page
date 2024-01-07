import { Tag, type Bookmarks, type Links } from "$lib/interfaces";
import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

export const bookmarks: Writable<Bookmarks> = writable();
export const editMode: Writable<boolean> = writable(false);
export const editFormMetadata: Writable<Links> = writable({
  id: 0,
  title: "",
  link: "",
  icon: "",
  tag: Tag.com,
});
export const userWallpaper: Writable<string | null>  = writable(null);
