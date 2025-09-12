import { useTheme } from "./useTheme";

export const ThemeToggler = () => {
  const ctx = useTheme();

  const oppositeTheme = ctx?.theme === "light" ? "dark" : "light";

  return (
    <div className="c-theme-toggler">
      <button className="c-theme-toggler__button" onClick={ctx.toggleTheme}>
        Toggle theme to {oppositeTheme}
      </button>
    </div>
  );
};

export default ThemeToggler;
