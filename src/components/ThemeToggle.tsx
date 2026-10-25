import { useTheme } from "../hooks/useTheme";
import { MoonIcon, SunIcon } from "./icons";

/** Dark / light switch with an accessible label and pressed state. */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <span className="theme-toggle__track" aria-hidden="true">
        <span className="theme-toggle__thumb">
          {isDark ? <MoonIcon width={14} height={14} /> : <SunIcon width={14} height={14} />}
        </span>
      </span>
    </button>
  );
}