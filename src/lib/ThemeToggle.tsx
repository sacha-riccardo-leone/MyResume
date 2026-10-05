import { Moon, Sun } from "lucide-react";
import type { Theme } from "./theme";

/* One control, used by the gate, the portfolio and the CV, so switching theme
   feels like the same action wherever the visitor is. It inherits colour from
   its parent (currentColor) so each surface can style it in its own palette
   rather than having two definitions drift apart. */
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
  return (
    <button
      onClick={toggle}
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
