import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {THEMES, useTheme} from '@/hooks/use-theme'
import {Theme} from "@/interfaces/theme";

export const ThemeSelector = () => {
  const {getTheme, setTheme} = useTheme();
  const theme = getTheme();

  return (
    <Select defaultValue={theme.id} onValueChange={(value) => {
      setTheme(THEMES.find((t) => t.id === value) as Theme);
    }}>
      <SelectTrigger>
        <SelectValue placeholder={theme.label} />
      </SelectTrigger>
      <SelectContent>
        {THEMES.map((theme) => (
          <SelectItem key={theme.id} value={theme.id}>
            {theme.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
