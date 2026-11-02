import { useEffect, useState } from "react";
import { LuSun, LuMoon } from "react-icons/lu";
import { useIsMobile, MOBILE_QUERY } from "../hooks/useMediaQuery";

type Theme = "dark" | "light";
const STORAGE_KEY = "theme";

function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "dark" || saved === "light") return saved;
  } catch {
    // storage unavailable — fall through to the default
  }
  return window.matchMedia(MOBILE_QUERY).matches ? "light" : "dark";
}

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const isMobile = useIsMobile();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function toggleTheme() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // private mode — toggle still works for this visit
    }
  }

  const label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button onClick={toggleTheme} className="theme-toggle" aria-label={label}>
      {isMobile
        ? theme === "dark" ? <LuSun size={18} /> : <LuMoon size={18} />
        : theme === "dark" ? "Light mode" : "Dark mode"}
    </button>
  );
}

export default ThemeToggle;