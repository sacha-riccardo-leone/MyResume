import { useEffect, useRef, useState } from "react";
import { TextAnimate } from "../components/ui/text-animate";
import { InteractiveHoverButton } from "../components/ui/interactive-hover-button";
import ThemeToggle from "../lib/ThemeToggle";
import type { Theme } from "../lib/theme";
import {
  translations, skillGroups, skillItems, anthropicCert,
} from "../imports/MainComponentNameCv";
import {
  contact, media, orderedExperience, ui, type Media, type PfLang,
} from "./content";
import { Disclosure, PfButton, PfLink } from "./ui-bits";

const FULL_NAME = "Sacha Riccardo LEONE";

type Exp = ReturnType<typeof orderedExperience>[number];

/* The "Full experience": the same content as the CV, laid out as a page
   instead of a document. Everything below reads from the CV's translations —
   nothing here restates it. */
export default function Portfolio({
  lang, setLang, onReadCv, onBack, theme, toggleTheme,
}: {
  lang: PfLang;
  setLang: (l: PfLang) => void;
  onReadCv: () => void;
  onBack: () => void;
  theme: Theme;
  toggleTheme: () => void;
}) {
  const t = ui[lang];
  const cv = translations[lang];

  const all = orderedExperience(lang);
  const featured = all.filter(e => media[e.company]?.featured);
  const rest = all.filter(e => !media[e.company]?.featured);

  return (
    <div className="pf">

      <header className="fixed inset-x-0 top-0 z-50">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[var(--pf-ground)] via-[var(--pf-ground)]/85 to-transparent" />
        <div className="relative flex items-center justify-between px-5 sm:px-8 py-4">
          <PfButton onClick={onBack}>← {t.backToGate}</PfButton>
          <div className="flex items-center gap-3">
            <ThemeToggle theme={theme} toggle={toggleTheme} className="h-7 w-7 text-[var(--pf-mute)] hover:text-[var(--pf-ink)]" />
            <div className="hidden sm:flex items-center gap-1">
              {(["fr", "en", "de", "it"] as PfLang[]).map(l => (
                <PfButton key={l} onClick={() => setLang(l)} active={l === lang}
                  aria-current={l === lang} className="px-3 py-1">
                  {l}
                </PfButton>
              ))}
            </div>
            <PfButton onClick={onReadCv}>{t.readCv}</PfButton>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="min-h-[88vh] flex flex-col justify-center items-center text-center px-5 sm:px-10 lg:px-16 pt-24">
        <div className="max-w-[1100px]">
          <TextAnimate key={`a-${lang}`} as="h1" animation="blurInUp" by="word" duration={0.6} once
            className="text-[clamp(2.4rem,8.5vw,7rem)] font-medium leading-[0.95] tracking-[-0.045em]">
            {t.heroA}
          </TextAnimate>
          <TextAnimate key={`b-${lang}`} as="h1" animation="blurInUp" by="word" duration={0.6} delay={0.18} once
            className="text-[clamp(2.4rem,8.5vw,7rem)] font-medium leading-[0.95] tracking-[-0.045em] text-[var(--pf-mute)]">
            {t.heroB}
          </TextAnimate>
          <TextAnimate key={`c-${lang}`} as="p" animation="fadeIn" by="line" delay={0.6} once
            className="mt-10 mx-auto max-w-[52ch] text-sm sm:text-base leading-relaxed text-[var(--pf-mute)]">
            {cv.title}
          </TextAnimate>
        </div>
      </section>

      {/* ── À propos: the CV's availability line and bio, verbatim ── */}
      <Section title={cv.sections.about}>
        <p className="max-w-[70ch] text-base sm:text-lg leading-relaxed text-[var(--pf-ink)]">
          {cv.availability}
        </p>
        <p className="mt-6 max-w-[70ch] text-sm sm:text-base leading-relaxed text-[var(--pf-mute)]">
          {cv.intro}
        </p>
      </Section>

      {/* ── Featured work: full plates, alternating sides ── */}
      <section className="px-5 sm:px-10 lg:px-16 pb-24">
        <SectionHead title={cv.sections.experience} count={all.length} />
        <div className="space-y-28 sm:space-y-40">
          {featured.map((e, i) => (
            <ProjectBlock key={e.company} exp={e} index={i} lang={lang} t={t} theme={theme} />
          ))}
        </div>

        {/* The remaining projects: same content, compact layout */}
        {rest.length > 0 && (
          <div className="mt-28 sm:mt-40">
            <div className="flex items-baseline gap-4 mb-12">
              <h3 className="text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--pf-mute)]">{t.alsoLabel}</h3>
              <hr className="pf-rule flex-1" />
            </div>
            <div className="grid gap-10 sm:gap-14 md:grid-cols-2">
              {rest.map(e => <CompactProject key={e.company} exp={e} t={t} />)}
            </div>
          </div>
        )}
      </section>

      {/* ── Skills ── */}
      <Section title={cv.sections.skills}>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((g, i) => (
            <div key={i}>
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] mb-4" style={{ color: g.color }}>
                {g.category[lang]}
              </p>
              <ul className="space-y-1.5">
                {skillItems(g, lang).map((item, k) => (
                  <li key={k} className="text-sm text-[var(--pf-mute)]">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Soft skills ── */}
      <Section title={cv.sections.personalSkills}>
        {/* Bento: tiles of varying span so the grid reads as composed rather
            than as a uniform list. The pattern repeats, so it holds whatever
            number of skills the CV happens to carry. */}
        <div className="grid auto-rows-[5.5rem] grid-flow-dense grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {cv.softSkills.map((skill, i) => {
            /* grid-flow-dense lets later tiles backfill the gaps these spans
               open, so the wall stays solid whatever the number of skills. */
            const span = [
              "col-span-2 row-span-2", "col-span-1 row-span-1", "col-span-1 row-span-1",
              "col-span-1 row-span-1", "col-span-1 row-span-2", "col-span-2 row-span-1",
              "col-span-1 row-span-1", "col-span-1 row-span-1", "col-span-2 row-span-1",
            ][i % 9];
            return (
              <div key={i}
                className={`${span} flex items-end rounded-xl border border-[var(--pf-hair)] bg-[var(--pf-raise)]/60 p-4 transition-colors hover:border-[var(--pf-ink)]/30`}>
                <span className="text-[15px] leading-snug text-[var(--pf-ink)]/85">{skill}</span>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ── Languages ── */}
      <Section title={cv.sections.languages}>
        <div className="grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-4 max-w-[70rem]">
          {cv.languages.map((l, i) => (
            <div key={i} className="flex items-baseline justify-between border-b border-[var(--pf-hair)] pb-3">
              <span className="text-base text-[var(--pf-ink)]">{l.name}</span>
              <span className="text-[11px] font-mono text-[var(--pf-mute)]">{l.level}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Education + the certification in progress ── */}
      <Section title={cv.sections.education}>
        <div className="space-y-8 max-w-[70rem]">
          {/* In progress, so it leads: it is the only line here that is still
              moving. The halo pulses on the card, not the text, which stays
              flat and legible. */}
          <div className="pf-halo grid gap-1 rounded-xl border border-[#D97757]/35 p-5 sm:grid-cols-[1fr_auto] sm:gap-8">
            <div>
              <p className="text-base sm:text-lg text-[#D97757]">
                Anthropic — {cv.sections.certifications}
              </p>
              <p className="mt-1 max-w-[60ch] text-sm text-[var(--pf-mute)]">{anthropicCert.description[lang]}</p>
            </div>
            <p className="pf-num text-[11px] font-mono text-[#D97757]/80 sm:text-right">{anthropicCert.date[lang]}</p>
          </div>

          {cv.education.map((e, i) => (
            <div key={i} className="grid gap-1 sm:grid-cols-[1fr_auto] sm:gap-8 border-b border-[var(--pf-hair)] pb-6">
              <div>
                <p className="text-base sm:text-lg text-[var(--pf-ink)]">{e.institution}</p>
                <p className="mt-1 text-sm text-[var(--pf-mute)]">{e.description}</p>
              </div>
              <p className="pf-num text-[11px] font-mono text-[var(--pf-mute)] sm:text-right">{e.date}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Interests ── */}
      <Section title={cv.sections.interests}>
        <div className="flex flex-wrap gap-2.5">
          {cv.interestsLine.split(" · ").map((item, i) => (
            <span key={i} className="rounded-full border border-[var(--pf-hair)] px-4 py-2 text-[15px] text-[var(--pf-ink)]/80">
              {item}
            </span>
          ))}
        </div>
      </Section>

      {/* ── Closing: contact details from the CV, then the ways to reach out ── */}
      <section className="px-5 sm:px-10 lg:px-16 pb-20">
        <div className="flex items-baseline gap-4 mb-14">
          <h2 className="text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--pf-mute)]">{cv.sections.contact}</h2>
          <hr className="pf-rule flex-1" />
        </div>

        <TextAnimate key={`close-${lang}`} as="p" animation="blurInUp" by="word" once
          className="text-[clamp(2rem,6.5vw,5rem)] font-medium leading-[0.98] tracking-[-0.04em]">
          {t.closing}
        </TextAnimate>

        <p className="mt-6 max-w-[48ch] text-sm sm:text-base text-[var(--pf-mute)]">{cv.availability}</p>

        {/* Work-authorisation facts, the same ones the CV leads its header with */}
        <dl className="mt-10 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-4 max-w-[70rem] text-sm">
          {[
            /* nationality already reads "Italien — Permis C (CH)", so a
               separate Permis C entry only repeated it. */
            cv.contact.dob, cv.contact.nationality,
            cv.contact.location, cv.contact.mobility,
            cv.contact.phone,
          ].map((v, i) => (
            <span key={i} className="text-[var(--pf-mute)] border-b border-[var(--pf-hair)] pb-2">{v}</span>
          ))}
        </dl>

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
          <a href={`mailto:${cv.contact.email}`} aria-label={t.emailCta}>
            <InteractiveHoverButton
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
          <a href={`mailto:${cv.contact.email}`}
            className="text-sm text-[var(--pf-mute)] hover:text-[var(--pf-ink)] transition-colors underline-offset-4 hover:underline">
            {cv.contact.email}
          </a>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-3">
          {[{ label: "GitHub", href: contact.github }, { label: "LinkedIn", href: contact.linkedin }].map(l => (
            <PfLink key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label} ↗
            </PfLink>
          ))}
          <PfButton onClick={onReadCv}>{t.readCv} →</PfButton>
        </div>

        <hr className="pf-rule mt-16" />
        <p className="mt-5 text-[10px] font-mono tracking-[0.2em] text-[var(--pf-mute)]/70">
          {FULL_NAME} · {cv.contact.location} · {cv.referencesLine}
        </p>
      </section>
    </div>
  );
}

/* ── Shared section chrome ─────────────────────────────────────────────── */
function SectionHead({ title, count }: { title: string; count?: number }) {
  return (
    <div className="flex items-baseline gap-4 mb-14">
      <h2 className="text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--pf-mute)]">{title}</h2>
      <hr className="pf-rule flex-1" />
      {count !== undefined && (
        <span className="pf-num text-[10px] font-mono text-[var(--pf-mute)]">{String(count).padStart(2, "0")}</span>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="px-5 sm:px-10 lg:px-16 pb-24">
      <SectionHead title={title} />
      {children}
    </section>
  );
}

/* ── A featured project: facts on one side, the site in motion on the other ── */
function ProjectBlock({
  exp, index, lang, t, theme,
}: {
  exp: Exp;
  index: number;
  lang: PfLang;
  t: (typeof ui)[PfLang];
  theme: Theme;
}) {
  const m = media[exp.company] ?? {};
  const flipped = index % 2 === 1;
  const ongoing = /en cours|ongoing|laufend|in corso/i.test(exp.date);

  return (
    <article className={`grid gap-8 lg:gap-14 items-start ${
      flipped ? "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]" : "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]"}`}>
      <div className={`lg:sticky lg:top-28 ${flipped ? "lg:order-2" : "lg:order-1"}`}>
        <div className="flex items-center gap-3 mb-4">
          <span className="pf-num text-[10px] font-mono text-[var(--pf-mute)]">{String(index + 1).padStart(2, "0")}</span>
          <hr className="pf-rule w-8" />
          <span className="pf-num text-[10px] font-mono text-[var(--pf-mute)]">{exp.date}</span>
          {ongoing && (
            <span className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.18em] text-[var(--pf-ink)]/70">
              <span className="h-1 w-1 rounded-full bg-[var(--pf-ink)]/70 animate-pulse" />
              {t.ongoing}
            </span>
          )}
        </div>

        <TextAnimate key={`p-${exp.company}-${lang}`} as="h3" animation="slideUp" by="word" once
          className="text-[clamp(1.6rem,3.4vw,2.6rem)] font-medium leading-[1.05] tracking-[-0.03em]">
          {exp.company}
        </TextAnimate>

        {exp.role && <p className="mt-2 text-[12px] font-mono text-[var(--pf-mute)]">{exp.role}</p>}

        {/* Detail is opt-in: the plate and the headline carry the glance, the
            CV's bullet points are one click away for anyone who wants them. */}
        <div className="mt-6 max-w-[52ch]">
          <Disclosure
            label={`${t.details} — ${exp.company}`}
          >
            <ul className="space-y-2.5 pt-5">
              {exp.bullets.map((b, k) => (
                <li key={k} className="flex gap-3 text-sm leading-relaxed text-[var(--pf-mute)]">
                  <span aria-hidden className="select-none text-[var(--pf-hair)]">—</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            {exp.stack && <p className="mt-5 text-[11px] font-mono text-[var(--pf-mute)]/80">{exp.stack}</p>}
            {m.url && (
              <PfLink href={m.url} target="_blank" rel="noopener noreferrer" className="mt-6">
                {t.visit} →
              </PfLink>
            )}
          </Disclosure>
        </div>
      </div>

      <div className={flipped ? "lg:order-1" : "lg:order-2"}>
        <Plate m={m} name={exp.company} theme={theme} />
      </div>
    </article>
  );
}

/* ── A project without a recording: same content, quieter layout ── */
function CompactProject({ exp, t }: { exp: Exp; t: (typeof ui)[PfLang] }) {
  return (
    <article>
      <div className="flex items-baseline justify-between gap-4 border-b border-[var(--pf-hair)] pb-3">
        <h4 className="text-lg font-medium tracking-tight text-[var(--pf-ink)]">{exp.company}</h4>
        <span className="pf-num text-[10px] font-mono text-[var(--pf-mute)] shrink-0">{exp.date}</span>
      </div>
      {exp.role && <p className="mt-3 text-[12px] font-mono text-[var(--pf-mute)]">{exp.role}</p>}
      <div className="mt-4">
        <Disclosure
          label={`${t.details} — ${exp.company}`}
        >
          <ul className="space-y-2 pt-4">
            {exp.bullets.map((b, k) => (
              <li key={k} className="flex gap-3 text-sm leading-relaxed text-[var(--pf-mute)]">
                <span aria-hidden className="select-none text-[var(--pf-hair)]">—</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          {exp.stack && <p className="mt-4 text-[11px] font-mono text-[var(--pf-mute)]/80">{exp.stack}</p>}
        </Disclosure>
      </div>
    </article>
  );
}

/* The work, in a plate: the site's own landing animation where one was
   recorded. Plays only while on screen, and never for visitors who asked for
   less motion. */
function Plate({ m, name, theme }: { m: Media; name: string; theme: Theme }) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shown, setShown] = useState(false);
  const calm = useReducedMotion();

  const clip = theme === "dark" && m.videoDark ? m.videoDark : m.video;
  const src = theme === "dark" && m.videoDark ? m.videoDark.poster : (m.shot ?? clip?.poster);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setShown(true);
      const v = videoRef.current;
      if (!v || calm) return;
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, [calm, clip]);

  const reveal: React.CSSProperties = {
    filter: shown ? "grayscale(0) contrast(1)" : "grayscale(1) contrast(0.9)",
    opacity: shown ? 1 : 0.35,
    transform: shown ? "scale(1)" : "scale(1.03)",
  };

  return (
    <div ref={ref} className="relative overflow-hidden rounded-lg border border-[var(--pf-hair)] bg-[var(--pf-raise)]"
      style={{ aspectRatio: "16 / 10" }}>
      {clip && !calm ? (
        <video key={clip.webm} ref={videoRef} poster={clip.poster} muted loop playsInline preload="metadata"
          aria-label={name}
          className="h-full w-full object-cover object-top transition-[filter,opacity,transform] duration-[1200ms] ease-out"
          style={reveal}>
          <source src={clip.webm} type="video/webm" />
          <source src={clip.mp4} type="video/mp4" />
        </video>
      ) : src ? (
        <img src={src} alt={name} loading="lazy"
          className="h-full w-full object-cover object-top transition-[filter,opacity,transform] duration-[1200ms] ease-out"
          style={reveal} />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[var(--pf-mute)]/60">{name}</span>
        </div>
      )}
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
