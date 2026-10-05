import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";
import type { Theme } from "./theme";
import { COLLAPSE_EASE } from "./Collapse";

/* One control, used by the gate, the portfolio and the CV, so switching theme
   feels like the same action wherever the visitor is. It inherits colour from
   its parent (currentColor) so each surface can style it in its own palette
   rather than having two definitions drift apart.

   The switch is a circular reveal from the button (after Magic UI's
   AnimatedThemeToggler): the View Transitions API snapshots the page before
   and after, and the new snapshot is uncovered by a growing clip-path circle.
   Browsers without the API, and visitors who ask for reduced motion, get the
   plain instant switch. */

const DURATION_MS = 600;

export default function ThemeToggle({
  theme,
  toggle,
  className = "",
}: {
  theme: Theme;
  toggle: () => void;
  className?: string;
}) {
  const next = theme === "dark" ? "light" : "dark";

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void>; finished: Promise<void> };
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!doc.startViewTransition || reduce || root.dataset.themeVt) {
      toggle();
      return;
    }

    // Circle centre = the button; radius = distance to the farthest corner.
    const w = window.innerWidth, h = window.innerHeight;
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, w - x), Math.max(y, h - y));

    /* Percentages, not px: Chrome draws px clip-paths on the transition
       snapshot unscaled on fractional display scales (Windows at 150 %), so
       the circle would start in the wrong place. circle() % radii resolve
       against hypot(w, h) / sqrt 2. */
    const at = `at ${(x / w) * 100}% ${(y / h) * 100}%`;
    const from = `circle(0% ${at})`;
    const to = `circle(${(radius / (Math.hypot(w, h) / Math.SQRT2)) * 100}% ${at})`;

    // Pin the start shape in CSS too, so Firefox never paints the new theme
    // unclipped for a frame before the animation below takes over.
    root.dataset.themeVt = "active";
    root.style.setProperty("--theme-vt-from", from);

    const vt = doc.startViewTransition(() => { flushSync(toggle); });
    vt.ready.then(() => {
      root.animate(
        { clipPath: [from, to] },
        /* fill: the pinned CSS start shape must never show again in the
           last frame before the transition tears down */
        { duration: DURATION_MS, easing: COLLAPSE_EASE, fill: "forwards", pseudoElement: "::view-transition-new(root)" },
      );
    }).catch(() => {});
    vt.finished.finally(() => {
      delete root.dataset.themeVt;
      root.style.removeProperty("--theme-vt-from");
    }).catch(() => {});
  };

  return (
    <button
      onClick={onClick}
      /* The label states the outcome, not the current state — that is what a
         screen-reader user needs to decide whether to press it. */
      aria-label={next === "light" ? "Switch to light theme" : "Switch to dark theme"}
      title={next === "light" ? "Light" : "Dark"}
      className={`inline-flex items-center justify-center rounded-full transition-colors ${className}`}
      type="button"
    >
      {theme === "dark"
        ? <Sun className="h-3.5 w-3.5" aria-hidden />
        : <Moon className="h-3.5 w-3.5" aria-hidden />}
    </button>
  );
}
