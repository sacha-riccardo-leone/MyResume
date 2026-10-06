import { TextAnimate } from "../components/ui/text-animate";
import { InteractiveHoverButton } from "../components/ui/interactive-hover-button";
import { contact, ui, type PfLang } from "./content";
import { translations } from "../imports/MainComponentNameCv";
import ThemeToggle from "../lib/ThemeToggle";
import { SHARED } from "../lib/pageTransition";
import type { Theme } from "../lib/theme";

const FULL_NAME = "Sacha Riccardo LEONE";
const NAME_CLASS = "text-[clamp(1.75rem,5vw,3.25rem)] font-light tracking-[-0.03em]";
const TITLE_CLASS = "mt-3 text-sm sm:text-base text-[var(--pf-mute)]";

/* The landing choice. Two doors, each honest about what it costs the visitor:
   a document, or an experience. Hovering a door previews what is behind it —
   the CV side goes still and typographic, the experience side comes alive —
   so the choice is demonstrated rather than promised. */
export default function Gate({
  lang,
  setLang,
  onChoose,
  theme,
  toggleTheme,
  intro = true,
}: {
  lang: PfLang;
  setLang: (l: PfLang) => void;
  onChoose: (v: "cv" | "work") => void;
  /* false when arriving back from the CV: the name is already on screen,
     gliding in, so it is rendered still instead of re-animated. */
  intro?: boolean;
  theme: Theme;
  toggleTheme: () => void;
}) {
  const t = ui[lang];
  const cv = translations[lang];

  return (
    <div className="pf min-h-screen flex flex-col">
      {/* language — small, out of the way, but reachable before choosing */}
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
        {intro ? (
          <TextAnimate key={`t1-${lang}`}
            as="h1"
            animation="blurInUp"
            by="character"
            duration={0.45}
            once
            style={SHARED.name}
            className={NAME_CLASS}
          >
            {FULL_NAME}
          </TextAnimate>
        ) : (
          <h1 style={SHARED.name} className={NAME_CLASS}>{FULL_NAME}</h1>
        )}

        {intro ? (
          <TextAnimate key={`t2-${lang}`}
            as="p"
            animation="fadeIn"
            by="word"
            delay={0.35}
            once
            style={SHARED.title}
            className={TITLE_CLASS}
          >
            {cv.title}
          </TextAnimate>
        ) : (
          <p style={SHARED.title} className={TITLE_CLASS}>{cv.title}</p>
        )}

        {/* One door for now. The "Full experience" view is parked: it still
            answers on /work, but the gate no longer offers it. */}
        <div className="mt-14 flex justify-center">
          <GateDoor label={t.cvLabel} onClick={() => onChoose("cv")} />
        </div>

        {/* The places a recruiter goes next, as plain text links: quiet next
            to the one real button, but each a real, clickable destination. */}
        <nav aria-label={t.linksLabel} className="mt-10">
          <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm">
            {[
              { label: "LinkedIn", href: contact.linkedin, external: true },
              { label: "GitHub", href: contact.github, external: true },
              { label: t.emailLabel, href: `mailto:${cv.contact.email}`, external: false },
            ].map(l => (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group inline-flex items-center gap-1.5 rounded-sm text-[var(--pf-mute)] transition-colors hover:text-[var(--pf-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pf-ink)]/50 focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--pf-ground)]"
                >
                  {l.label}
                  <span aria-hidden className="text-[0.8em] transition-transform group-hover:-translate-y-px group-hover:translate-x-px">
                    {l.external ? "↗" : "→"}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </main>

      <footer className="px-6 sm:px-10 pb-6 text-center">
        <p className="text-[10px] font-mono tracking-widest text-[var(--pf-mute)]/50">
          LA CHAUX-DE-FONDS · CH
        </p>
      </footer>
    </div>
  );
}

/* Both doors use the same pill as the portfolio's email CTA, so the one
   interactive gesture on the site reads the same everywhere. The meta line
   stays underneath rather than inside: it tells the visitor what the choice
   costs them, which is the point of offering a choice at all, and the pill
   only has room for one line. */
function GateDoor({
  label,
  meta,
  onClick,
}: {
  label: string;
  meta?: string;
  onClick: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <InteractiveHoverButton
        onClick={onClick}
        /* The component styles itself from shadcn tokens that are not themed
           for this page; remap them here rather than edit the vendored file. */
        style={{
          ["--background" as string]: "var(--pf-ink)",
          ["--primary" as string]: "var(--pf-ground)",
          ["--primary-foreground" as string]: "var(--pf-ink)",
        } as React.CSSProperties}
        className="min-w-[14rem] font-light border-transparent text-[var(--pf-ground)] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pf-ink)]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--pf-ground)]"
      >
        {label}
      </InteractiveHoverButton>
      {meta && <span className="text-[11px] font-mono tracking-wider text-[var(--pf-mute)]">{meta}</span>}
    </div>
  );
}
