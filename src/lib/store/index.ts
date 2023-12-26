import type { Bookmarks } from "$lib/interfaces";
import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

export const bookmarks: Writable<Bookmarks> = writable();
