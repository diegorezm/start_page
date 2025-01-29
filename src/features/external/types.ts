import {SectionRecord} from "@/interfaces/section"
import {Theme} from "@/interfaces/theme"

export type Config = {
  theme: Theme,
  sections: SectionRecord
  wallpaper: string | null
}

export function isValidConfig(config: any): config is Config {
  return (
    typeof config === 'object' &&
    config !== null &&
    // Validate theme
    (typeof config.theme === 'string' || typeof config.theme === 'object') && // Adjust based on Theme type
    // Validate sections
    typeof config.sections === 'object' &&
    config.sections !== null &&
    // Validate wallpaper
    (typeof config.wallpaper === 'string' || config.wallpaper === null)
  );
}
