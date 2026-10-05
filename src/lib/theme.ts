import { useCallback, useEffect, useRef, useState } from "react";

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

export function applyTheme(theme: Theme, persist = false) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  root.style.colorScheme = theme;
  /* The boot script paints <html> light inline to avoid a flash on load. That
     inline value outranks the stylesheet, so once the app is running it must
     go — otherwise switching light -> dark kept the light ground under the
     now-white text. */
  root.style.removeProperty("background");
  /* Only a real choice is remembered. Saving on every load used to pin the
     first-visit OS preference forever, so the site never followed the OS. */
  if (persist) {
    try { localStorage.setItem(KEY, theme); } catch { /* ignore */ }
  }
  // Let non-React listeners (the wave canvas) repaint on change.
  window.dispatchEvent(new CustomEvent("themechange", { detail: theme }));
}

export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(readTheme);
  const chosen = useRef(false);  // set by the toggle, never by the OS

  useEffect(() => { applyTheme(theme, chosen.current); }, [theme]);

  // Follow the OS only until the visitor states a preference of their own.
  useEffect(() => {
    let stored = false;
    try { stored = !!localStorage.getItem(KEY); } catch { /* ignore */ }
    if (stored) return;
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (e: MediaQueryListEvent) => {
      if (!chosen.current) setTheme(e.matches ? "light" : "dark");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /* Applies the new theme to the DOM synchronously, then updates React.
     The animated toggle runs this inside a view transition, and the browser
     snapshots the "after" state as soon as the callback returns — so the
     attribute has to change right here, not in an effect a frame later. */
  const toggle = useCallback(() => {
    chosen.current = true;
    const next: Theme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next, true);
    setTheme(next);
  }, []);
  return [theme, toggle];
}
