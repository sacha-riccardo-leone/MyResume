import { useEffect } from "react";
import { KineticText } from "../components/ui/kinetic-text";
import { InteractiveHoverButton } from "../components/ui/interactive-hover-button";
import { ui, type PfLang } from "./content";
import ThemeToggle from "../lib/ThemeToggle";
import type { Theme } from "../lib/theme";

/* The gate's furniture, reused: same header, same single pill, same footer, so
   a wrong URL still lands somewhere that is recognisably this site rather than
   a dead end. Colours come from the .pf tokens, which are already themed, so
   this follows light and dark without a second definition.

   The site loads Satoshi 300 and 400 only. The kinetic hover runs 300 -> 900,
   which would barely show on two weights, so this page asks for the heavier
   ones when it mounts — a request no ordinary visitor ever pays for. */
const HEAVY_WEIGHTS = "https://api.fontshare.com/v2/css?f[]=satoshi@500,700,900&display=swap";

export default function NotFound({
  lang,
  setLang,
  onHome,
  theme,
  toggleTheme,
}: {
  lang: PfLang;
  setLang: (l: PfLang) => void;
  onHome: () => void;
  theme: Theme;
  toggleTheme: () => void;
}) {
  const t = ui[lang];

  useEffect(() => {
    if (document.querySelector(`link[href="${HEAVY_WEIGHTS}"]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = HEAVY_WEIGHTS;
    document.head.appendChild(link);
  }, []);

  return (
    <div className="pf min-h-screen flex flex-col">
      {/* Same header as the gate: theme first, then language. */}
      <div className="flex justify-end px-6 sm:px-10 pt-6">
        <div className="flex items-center gap-1">
          <ThemeToggle theme={theme} toggle={toggleTheme}
            className="mr-1 h-7 w-7 text-[var(--pf-mute)] hover:text-[var(--pf-ink)]" />
          {(["fr", "en", "de", "it"] as PfLang[]).map(l => (
            <button
              key={l}
              onClick={() => setLang(l)}
              aria-label={l.toUpperCase()}
              aria-current={l === lang}
              className={`px-2.5 py-1 text-[11px] font-mono uppercase tracking-widest rounded-full transition-colors ${
                l === lang ? "text-[var(--pf-ink)] bg-white/10" : "text-[var(--pf-mute)] hover:text-[var(--pf-ink)]"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        {/* Letters thicken and gain an outline under the cursor, their
            neighbours less so — the one playful thing on an otherwise quiet
            page. Hidden from assistive tech by the component, which keeps the
            readable "404" in a visually-hidden span. */}
        <KineticText
          text="404"
          className="justify-center text-[clamp(5rem,22vw,13rem)] leading-none tracking-[-0.04em] text-[var(--pf-ink)] select-none"
        />

        <p className="mt-6 text-sm sm:text-base text-[var(--pf-mute)]">{t.notFound}</p>

        <div className="mt-12 flex justify-center">
          <InteractiveHoverButton
            onClick={onHome}
            /* Same token remap as the gate's door, so the two buttons are the
               same object rather than two that merely look alike. */
            style={{
              ["--background" as string]: "var(--pf-ink)",
              ["--primary" as string]: "var(--pf-ground)",
              ["--primary-foreground" as string]: "var(--pf-ink)",
            } as React.CSSProperties}
            className="min-w-[14rem] font-light border-transparent text-[var(--pf-ground)] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pf-ink)]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--pf-ground)]"
          >
            {t.notFoundHome}
          </InteractiveHoverButton>
        </div>
      </main>

      <footer className="px-6 sm:px-10 pb-6 text-center">
        <p className="text-[10px] font-mono tracking-widest text-[var(--pf-mute)]/50">
          LA CHAUX-DE-FONDS · CH
        </p>
      </footer>
    </div>
  );
}
