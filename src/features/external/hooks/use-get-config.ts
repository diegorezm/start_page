"use client"

import {useSectionsStore} from "@/features/sections/sections-store"
import {useWallpaperStore} from "@/features/wallpaper/wallpaper-store"
import {useTheme} from "@/hooks/use-theme"
import {Config} from "@/features/external/types"

export const useGetConfig = () => {
  const {sections} = useSectionsStore()
  const {url} = useWallpaperStore()
  const {getTheme} = useTheme()
  const theme = getTheme()

  const config: Config = {
    sections,
    wallpaper: url,
    theme
  }
  return {config}
}
