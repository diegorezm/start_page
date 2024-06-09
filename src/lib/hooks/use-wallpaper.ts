import userWallpaper from "$lib/context/wallpaper-context";
import { get } from "svelte/store";

const STORAGE_KEY = "wallpaper";
export default function useWallpaper() {
  const saveWallpaper = () => {
    const currentWallpaper = get(userWallpaper);
    if (currentWallpaper) {
      localStorage.setItem(STORAGE_KEY, currentWallpaper);
    }
  };

  const loadWallpaper = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      userWallpaper.set(data);
    }
    else {
      userWallpaper.set(null);
    }
    return get(userWallpaper);
  };

  const setWallpaper = (url: string) => {
    userWallpaper.set(url);
    saveWallpaper();
  };
  const removeWallpaper = () => {
    userWallpaper.set(null);
    localStorage.removeItem(STORAGE_KEY);
  };
  return {
    loadWallpaper,
    saveWallpaper,
    setWallpaper,
    removeWallpaper
  };
}
