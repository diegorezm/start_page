import {type Theme} from "@/interfaces/theme";

export const THEMES: Theme[] = [
  {
    id: "default",
    label: "Default",
  },
  {
    id: "catppuccin-mocha",
    label: "Catppuccin Mocha",
  },
  {
    id: "ayu-dark",
    label: "Ayu Dark",
  },
  {
    id: "green",
    label: "Green",
  },
  {
    id: "purple",
    label: "Purple",
  },
  {
    id: "gruvbox-dark",
    label: "Gruvbox Dark",
  },
  {
    id: "gruvbox-light-hard",
    label: "Gruvbox Light Hard",
  },
] as const;


export const THEME_STORAGE_KEY = "theme";

export const useTheme = () => {
  const getTheme = (): Theme => {
    const storedThemeId = localStorage.getItem(THEME_STORAGE_KEY);
    const theme = THEMES.find((t) => t.id === storedThemeId);
    return theme || THEMES[0];
  };

  const loadTheme = () => {
    const theme = getTheme();
    saveTheme(theme);
    setTheme(theme);
  };

  const saveTheme = (theme: Theme) => {
    localStorage.setItem(THEME_STORAGE_KEY, theme.id);
  };

  const setTheme = (theme: Theme) => {
    // Remove all theme IDs from the body
    document.body.classList.remove(...THEMES.map((t) => t.id));
    // Add the new theme's ID as a class
    document.body.classList.add(theme.id);
    saveTheme(theme);
  };

  return {
    getTheme,
    loadTheme,
    saveTheme,
    setTheme,
  };
};
