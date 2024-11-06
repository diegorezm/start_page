import {create} from "zustand";
import {persist} from "zustand/middleware";

type WallpaperStore = {
  url: string | null;
  setWallpaper: (url: string) => void;
  removeWallpaper: () => void;
}


export const useWallpaperStore = create<WallpaperStore>()(
  persist(
    (set) => ({
      url: null,
      setWallpaper: (url) => set({url}),
      removeWallpaper: () => set({url: null}),
    }),
    {
      name: "wallpaper-store",
    }
  )
);
