import { TextAnimate } from "../components/ui/text-animate";
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
        <div className="grid w-full max-w-[640px] gap-3 sm:grid-cols-2">
          <GateDoor
            label={t.cvLabel}
            meta={t.cvMeta}
            onClick={() => onChoose("cv")}
            variant="document"
          />
          <GateDoor
            label={t.workLabel}
            meta={t.workMeta}
            onClick={() => onChoose("work")}
            variant="experience"
          />
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

function GateDoor({
  label,
  meta,
  onClick,
  variant,
}: {
  label: string;
  meta: string;
  onClick: () => void;
  variant: "document" | "experience";
}) {
  const isExp = variant === "experience";
  return (
    <button
      onClick={onClick}
      className={[
        "group relative overflow-hidden rounded-xl border px-6 py-7 text-left",
        "transition-[transform,border-color,background-color] duration-500 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2f2f0]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]",
        "border-[#26262a] bg-[#141416]/60 hover:border-[#f2f2f0]/35",
        isExp ? "hover:-translate-y-0.5" : "",
      ].join(" ")}
    >
      {/* Preview of what's behind the door. The document side settles into
          still ruled lines; the experience side stirs. Both are pure CSS. */}
      <span aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        {isExp ? (
          <span className="absolute inset-0 bg-[radial-gradient(120%_90%_at_20%_110%,rgba(242,242,240,0.14),transparent_60%)]" />
        ) : (
          <span className="absolute inset-0 [background-image:repeating-linear-gradient(to_bottom,rgba(242,242,240,0.085)_0px,rgba(242,242,240,0.085)_1px,transparent_1px,transparent_9px)]" />
        )}
      </span>

      <span className="relative block text-lg sm:text-xl font-medium tracking-tight text-[#f2f2f0]">
        {label}
      </span>
      <span className="relative mt-1.5 block text-[11px] font-mono tracking-wider text-[#7c7f86]">
        {meta}
      </span>
    </button>
  );
}
