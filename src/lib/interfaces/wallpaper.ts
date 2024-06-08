import type { Writable } from "svelte/store";

export interface Wallpaper {
  wallpaper: Writable<string>;
  setWallpaper: (url: string) => void;
}
