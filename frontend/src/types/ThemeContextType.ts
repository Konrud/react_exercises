import type { Theme } from "./Theme";

export type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};
