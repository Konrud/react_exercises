import { ThemeContext } from "../contexts/ThemeContext";
import { useCallback, useMemo, useState } from "react";
import type { Theme } from "../types/Theme";

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      return prevTheme === "light" ? "dark" : "light";
    });
  }, []);

  const contextValue = useMemo(() => {
    return { theme, toggleTheme };
  }, [toggleTheme, theme]);

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};
