import { useEffect, useRef, useState } from "react";
import { TextAnimate } from "../components/ui/text-animate";
import { SmoothCursor } from "../components/ui/smooth-cursor";
import { InteractiveHoverButton } from "../components/ui/interactive-hover-button";
import { contact, projects, ui, type PfLang, type Project } from "./content";
import ThemeToggle from "../lib/ThemeToggle";
import type { Theme } from "../lib/theme";

const FULL_NAME = "Sacha Riccardo LEONE";

/* The "Full experience". Type-led and monochrome: the typography is the
   artwork, the grain sits over everything, and the work is shown as real
   screenshots rather than described. */
export default function Portfolio({
  lang,
  setLang,
  onReadCv,
  onBack,
  theme,
  toggleTheme,
}: {
  lang: PfLang;
  setLang: (l: PfLang) => void;
  onReadCv: () => void;
  onBack: () => void;
  theme: Theme;
  toggleTheme: () => void;
}) {
  const t = ui[lang];
  const finePointer = useFinePointer();

  return (
    <div className={`pf ${finePointer ? "pf-cursor-none" : ""}`}>
      {finePointer && <SmoothCursor cursor={<SmallCursor />} />}

      {/* Persistent, quiet chrome — the visitor can always leave for the CV */}
      <header className="fixed inset-x-0 top-0 z-50">
        {/* Scrim: content scrolls under the chrome, so it needs to fall away
            rather than collide with it. Taller than the row and click-through,
            so it darkens without blocking anything beneath. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[var(--pf-ground)] via-[var(--pf-ground)]/85 to-transparent"
        />
        <div className="relative flex items-center justify-between px-5 sm:px-8 py-4">
        <button
          onClick={onBack}
          className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--pf-mute)] hover:text-[var(--pf-ink)] transition-colors"
        >
          ← {t.backToGate}
        </button>
        <div className="flex items-center gap-3">
          <ThemeToggle theme={theme} toggle={toggleTheme}
            className="h-7 w-7 text-[var(--pf-mute)] hover:text-[var(--pf-ink)]" />
          <div className="hidden sm:flex items-center gap-1">
            {(["fr", "en", "de", "it"] as PfLang[]).map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-current={l === lang}
                className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest rounded-full transition-colors ${
                  l === lang ? "text-[var(--pf-ink)] bg-white/10" : "text-[var(--pf-mute)] hover:text-[var(--pf-ink)]"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <button
            onClick={onReadCv}
            className="rounded-full border border-[var(--pf-hair)] px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-[0.15em] text-[var(--pf-ink)]/80 hover:border-[var(--pf-ink)]/40 hover:text-[var(--pf-ink)] transition-colors"
          >
            {t.readCv}
          </button>
        </div>
        </div>
      </header>

      {/* ── Hero: the thesis, in two lines of large type ── */}
      <section className="min-h-[88vh] flex flex-col justify-center px-5 sm:px-10 lg:px-16 pt-24">
        <div className="max-w-[1100px]">
          <TextAnimate key={`t1-${lang}`}
            as="h1"
            animation="blurInUp"
            by="word"
            duration={0.6}
            once
            className="text-[clamp(2.4rem,8.5vw,7rem)] font-medium leading-[0.95] tracking-[-0.045em]"
          >
            {t.heroA}
          </TextAnimate>
          <TextAnimate key={`t2-${lang}`}
            as="h1"
            animation="blurInUp"
            by="word"
            duration={0.6}
            delay={0.18}
            once
            className="text-[clamp(2.4rem,8.5vw,7rem)] font-medium leading-[0.95] tracking-[-0.045em] text-[var(--pf-mute)]"
          >
            {t.heroB}
          </TextAnimate>

          <TextAnimate key={`t3-${lang}`}
            as="p"
            animation="fadeIn"
            by="line"
            delay={0.6}
            once
            className="mt-10 max-w-[46ch] text-sm sm:text-base leading-relaxed text-[var(--pf-mute)]"
          >
            {t.heroSub}
          </TextAnimate>
        </div>
      </section>

      {/* ── Work ── */}
      <section className="px-5 sm:px-10 lg:px-16 pb-32">
        <div className="flex items-baseline gap-4 mb-14">
          <h2 className="text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--pf-mute)]">
            {t.workEyebrow}
          </h2>
          <hr className="pf-rule flex-1" />
          <span className="pf-num text-[10px] font-mono text-[var(--pf-mute)]">
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        <div className="space-y-28 sm:space-y-40">
          {projects.map((p, i) => (
            <ProjectBlock key={p.id} project={p} index={i} lang={lang} t={t} theme={theme} />
          ))}
        </div>
      </section>

      {/* ── Closing — the page's actual job: make it easy to start a conversation ── */}
      <section className="px-5 sm:px-10 lg:px-16 pb-20">
        <div className="flex items-baseline gap-4 mb-14">
          <h2 className="text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--pf-mute)]">
            {t.contactEyebrow}
          </h2>
          <hr className="pf-rule flex-1" />
        </div>

        <TextAnimate key={`t4-${lang}`}
          as="p"
          animation="blurInUp"
          by="word"
          once
          className="text-[clamp(2rem,6.5vw,5rem)] font-medium leading-[0.98] tracking-[-0.04em]"
        >
          {t.closing}
        </TextAnimate>

        <p className="mt-6 max-w-[42ch] text-sm sm:text-base text-[var(--pf-mute)]">{t.closingSub}</p>

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
          <a href={`mailto:${contact.email}`} aria-label={t.emailCta}>
            <InteractiveHoverButton
              /* The component styles itself from shadcn tokens, which are not
                 themed for this page. Remap them here instead of editing the
                 vendored file, so it inverts into the portfolio's own palette. */
              style={{
                ["--background" as string]: "var(--pf-ink)",
                ["--primary" as string]: "var(--pf-ground)",
                ["--primary-foreground" as string]: "var(--pf-ink)",
              } as React.CSSProperties}
              className="border-transparent text-[var(--pf-ground)] text-sm"
            >
              {t.emailCta}
            </InteractiveHoverButton>
          </a>

          <a
            href={`mailto:${contact.email}`}
            className="text-sm text-[var(--pf-mute)] hover:text-[var(--pf-ink)] transition-colors underline-offset-4 hover:underline"
          >
            {contact.email}
          </a>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-x-7 gap-y-3 text-[11px] font-mono uppercase tracking-[0.18em]">
          {[
            { label: "GitHub", href: contact.github },
            { label: "LinkedIn", href: contact.linkedin },
          ].map(l => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--pf-mute)] hover:text-[var(--pf-ink)] transition-colors"
            >
              {l.label} ↗
            </a>
          ))}
          {/* text-[11px]/font-mono are repeated here on purpose: theme.css sets a
              base font-size on `button`, which beats the size inherited from the
              row and would render this link larger than its neighbours. */}
          <button
            onClick={onReadCv}
            className="text-[11px] font-mono text-[var(--pf-mute)] hover:text-[var(--pf-ink)] transition-colors uppercase tracking-[0.18em]"
          >
            {t.readCv} →
          </button>
        </div>

        <hr className="pf-rule mt-16" />
        <p className="mt-5 text-[10px] font-mono tracking-[0.2em] text-[var(--pf-mute)]/60">
          {FULL_NAME} · {contact.place}
        </p>
      </section>
    </div>
  );
}

function ProjectBlock({
  project: p,
  index,
  lang,
  t,
  theme,
}: {
  project: Project;
  index: number;
  lang: PfLang;
  t: (typeof ui)[PfLang];
  theme: Theme;
}) {
  /* Alternate sides down the page: odd-indexed projects put the media on the
     left. Done with CSS order rather than by reordering the markup, so the DOM
     always reads name -> facts -> media — which is the order it collapses to on
     one column, and the order a screen reader announces. The wider column
     follows the media across the swap. */
  const flipped = index % 2 === 1;

  return (
    <article
      className={`grid gap-8 lg:gap-14 items-start ${
        flipped
          ? "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]"
          : "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]"
      }`}
    >
      {/* The facts */}
      <div className={`lg:sticky lg:top-28 ${flipped ? "lg:order-2" : "lg:order-1"}`}>
        <div className="flex items-center gap-3 mb-4">
          <span className="pf-num text-[10px] font-mono text-[var(--pf-mute)]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <hr className="pf-rule w-8" />
          <span className="pf-num text-[10px] font-mono text-[var(--pf-mute)]">{p.year}</span>
          {p.status === "ongoing" && (
            <span className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.18em] text-[var(--pf-ink)]/70">
              <span className="h-1 w-1 rounded-full bg-[var(--pf-ink)]/70 animate-pulse" />
              {t.ongoing}
            </span>
          )}
        </div>

        <TextAnimate key={`t5-${lang}`}
          as="h3"
          animation="slideUp"
          by="word"
          once
          className="text-[clamp(1.6rem,3.4vw,2.6rem)] font-medium leading-[1.05] tracking-[-0.03em]"
        >
          {p.name}
        </TextAnimate>

        <p className="mt-2 text-[12px] font-mono text-[var(--pf-mute)]">{p.role[lang]}</p>

        <p className="mt-6 max-w-[48ch] text-sm leading-relaxed text-[var(--pf-mute)]">
          {p.summary[lang]}
        </p>

        {/* Metrics — the numbers do the bragging so the prose doesn't have to */}
        <dl className="mt-8 grid grid-cols-3 gap-4 max-w-[26rem]">
          {p.metrics.map((m, k) => (
            <div key={k}>
              <dt className="pf-num text-[clamp(1.15rem,2.2vw,1.6rem)] font-medium text-[var(--pf-ink)]">
                {m.value}
              </dt>
              <dd className="mt-1 text-[10px] leading-snug text-[var(--pf-mute)]">{m.label[lang]}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-wrap gap-1.5">
          {p.stack.map(s => (
            <span
              key={s}
              className="rounded-full border border-[var(--pf-hair)] px-2.5 py-1 text-[10px] font-mono text-[var(--pf-mute)]"
            >
              {s}
            </span>
          ))}
        </div>

        {p.url && (
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-[var(--pf-ink)]/80 hover:text-[var(--pf-ink)] transition-colors"
          >
            {t.visit}
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        )}
      </div>

      {/* The evidence */}
      <div className={flipped ? "lg:order-1" : "lg:order-2"}>
        <Plate project={p} theme={theme} />
      </div>
    </article>
  );
}

/* The work, in a plate. Where a recording of the site's own landing animation
   exists it plays there — a still cannot show that the work moves, and these
   all do. It plays only while on screen (and never for visitors who asked for
   less motion), so nothing decodes off-screen. Content arrives desaturated and
   resolves on approach: calm at rest, alive as you reach it. */
function Plate({ project: p, theme }: { project: Project; theme: Theme }) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shown, setShown] = useState(false);
  const calm = useReducedMotion();
  /* Prefer the variant recorded in the site's own matching theme. */
  const clip = (theme === "dark" && p.videoDark) ? p.videoDark : p.video;
  /* A curated screenshot beats a frame grabbed out of a clip, so it wins as
     the still; the video poster is only the fallback. */
  /* A curated screenshot beats a frame grabbed out of a clip, so it wins as the
     still — except where a theme-matched clip exists, whose poster is the one
     that won't clash with the page. */
  const src = theme === "dark" && p.videoDark ? p.videoDark.poster : (p.shot ?? clip?.poster);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setShown(true);
        const v = videoRef.current;
        if (!v || calm) return;
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [calm]);

  const reveal: React.CSSProperties = {
    filter: shown ? "grayscale(0) contrast(1)" : "grayscale(1) contrast(0.9)",
    opacity: shown ? 1 : 0.35,
    transform: shown ? "scale(1)" : "scale(1.03)",
  };

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-lg border border-[var(--pf-hair)] bg-[var(--pf-raise)]"
      style={{ aspectRatio: "16 / 10" }}
    >
      {clip && !calm ? (
        <video
          ref={videoRef}
          poster={clip.poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={p.name}
          className="h-full w-full object-cover object-top transition-[filter,opacity,transform] duration-[1200ms] ease-out"
          style={reveal}
        >
          <source src={clip.webm} type="video/webm" />
          <source src={clip.mp4} type="video/mp4" />
        </video>
      ) : src ? (
        <img
          src={src}
          alt={p.name}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-[filter,opacity,transform] duration-[1200ms] ease-out"
          style={reveal}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[var(--pf-mute)]/60">
            {p.name}
          </span>
        </div>
      )}

      {/* Quiet marker that this is the real site in motion, not a mockup */}
      {clip && !calm && (
        <span className="pointer-events-none absolute bottom-2.5 right-3 text-[9px] font-mono uppercase tracking-[0.2em] text-[var(--pf-ink)]/35">
          live
        </span>
      )}
    </div>
  );
}

function useReducedMotion() {
  const [calm, setCalm] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setCalm(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return calm;
}

/* SmoothCursor's stock pointer sets its size with `style={{ scale: 0.5 }}`,
   which React serialises as `scale: 0.5px` — invalid, so it is dropped and the
   arrow renders at its full 50x54 rather than the intended 25. Hence the
   oversized cursor. Sizing via the width/height attributes instead is
   immune to that, and the viewBox scales the artwork to fit.
   Colours are the portfolio's own ink/ground so it sits inside the palette;
   the light outline keeps it readable over both the dark page and the bright
   screenshots. */
function SmallCursor() {
  return (
    <svg width={20} height={22} viewBox="0 0 50 54" fill="none">
      <path
        d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
        fill="var(--pf-ground)"
      />
      <path
        d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
        stroke="var(--pf-ink)"
        strokeWidth={2.25825}
      />
    </svg>
  );
}

/* Only hide the native cursor where there is a real pointer. */
function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const apply = () => setFine(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return fine;
}
