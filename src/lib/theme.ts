import { useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light";

const KEY = "srl.theme";

/* The theme is applied to <html data-theme> by an inline script in index.html
   before first paint, so there is never a flash of the wrong theme. This module
   only has to stay in step with whatever that script already decided. */
export function readTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "light" || attr === "dark") return attr;
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch { /* private mode / blocked storage */ }
  return window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;
  try { localStorage.setItem(KEY, theme); } catch { /* ignore */ }
  // Let non-React listeners (the wave canvas) repaint on change.
  window.dispatchEvent(new CustomEvent("themechange", { detail: theme }));
}

export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(readTheme);

  useEffect(() => { applyTheme(theme); }, [theme]);

  // Follow the OS only until the visitor states a preference of their own.
  useEffect(() => {
    let stored = false;
    try { stored = !!localStorage.getItem(KEY); } catch { /* ignore */ }
    if (stored) return;
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (e: MediaQueryListEvent) => setTheme(e.matches ? "light" : "dark");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = useCallback(() => setTheme(t => (t === "dark" ? "light" : "dark")), []);
  return [theme, toggle];
}
