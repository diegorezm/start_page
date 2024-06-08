import { writable, type Writable } from "svelte/store";

const userWallpaper: Writable<string | null> = writable(null);
export default userWallpaper;