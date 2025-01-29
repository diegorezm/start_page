
import {useSectionsStore} from "@/features/sections/sections-store"
import {useWallpaperStore} from "@/features/wallpaper/wallpaper-store"
import {useTheme} from "@/hooks/use-theme"
import {Config} from "@/features/external/types"

export const useSetConfig = () => {
  const {setSections} = useSectionsStore()
  const {setWallpaper} = useWallpaperStore()
  const {setTheme, saveTheme} = useTheme()

  const setConfig = (config: Config) => {
    setSections(config.sections)
    setTheme(config.theme)
    saveTheme(config.theme)
    if (config.wallpaper) setWallpaper(config.wallpaper)
  }
  return {
    setConfig
  }
}
