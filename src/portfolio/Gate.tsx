import { TextAnimate } from "../components/ui/text-animate";
import { InteractiveHoverButton } from "../components/ui/interactive-hover-button";
import { ui, type PfLang } from "./content";

const FULL_NAME = "Sacha Riccardo LEONE";

/* The landing choice. Two doors, each honest about what it costs the visitor:
   a document, or an experience. Hovering a door previews what is behind it —
   the CV side goes still and typographic, the experience side comes alive —
   so the choice is demonstrated rather than promised. */
export default function Gate({
  lang,
  setLang,
  onChoose,
}: {
  lang: PfLang;
  setLang: (l: PfLang) => void;
  onChoose: (v: "cv" | "work") => void;
}) {
  const t = ui[lang];

  return (
    <div className="pf min-h-screen flex flex-col">
      {/* language — small, out of the way, but reachable before choosing */}
      <div className="flex justify-end px-6 sm:px-10 pt-6">
        <div className="flex items-center gap-1">
          {(["fr", "en", "de", "it"] as PfLang[]).map(l => (
            <button
              key={l}
              onClick={() => setLang(l)}
              aria-label={l.toUpperCase()}
              aria-current={l === lang}
              className={`px-2.5 py-1 text-[11px] font-mono uppercase tracking-widest rounded-full transition-colors ${
                l === lang ? "text-[#f2f2f0] bg-white/10" : "text-[#7c7f86] hover:text-[#f2f2f0]"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <TextAnimate
          as="h1"
          animation="blurInUp"
          by="character"
          duration={0.45}
          once
          className="text-[clamp(1.75rem,5vw,3.25rem)] font-medium tracking-[-0.03em]"
        >
          {FULL_NAME}
        </TextAnimate>

        <TextAnimate
          as="p"
          animation="fadeIn"
          by="word"
          delay={0.35}
          once
          className="mt-3 text-sm sm:text-base text-[#7c7f86]"
        >
          {t.role}
        </TextAnimate>

        <p className="mt-14 mb-5 text-[10px] font-mono uppercase tracking-[0.25em] text-[#7c7f86]/70">
          {t.gateHint}
        </p>

        {/* The two doors */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-7 sm:gap-10">
          <GateDoor label={t.cvLabel} meta={t.cvMeta} onClick={() => onChoose("cv")} />
          <GateDoor label={t.workLabel} meta={t.workMeta} onClick={() => onChoose("work")} />
        </div>
      </main>

      <footer className="px-6 sm:px-10 pb-6 text-center">
        <p className="text-[10px] font-mono tracking-widest text-[#7c7f86]/50">
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
  meta: string;
  onClick: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <InteractiveHoverButton
        onClick={onClick}
        /* The component styles itself from shadcn tokens that are not themed
           for this page; remap them here rather than edit the vendored file. */
        style={{
          ["--background" as string]: "#f2f2f0",
          ["--primary" as string]: "#0a0a0b",
          ["--primary-foreground" as string]: "#f2f2f0",
        } as React.CSSProperties}
        className="min-w-[14rem] border-transparent text-[#0a0a0b] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2f2f0]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
      >
        {label}
      </InteractiveHoverButton>
      <span className="text-[11px] font-mono tracking-wider text-[#7c7f86]">{meta}</span>
    </div>
  );
}
