import type { Writable } from "svelte/store";

export enum Tag {
  mydia = "mydia",
  com = "com"
}

export interface Wallpaper {
  wallpaper: Writable<string>,
  setWallpaper: (url: string) => void
}

export interface Links {
  id: number,
  title: string,
  link: string,
  icon: string,
  tag: Tag
}

export type Bookmarks = { 
  [tags in Tag]: Links[]
}
