import { useId, useState } from "react";
import Collapse, { COLLAPSE_TRANSITION } from "../lib/Collapse";

/* ─────────────────────────────────────────────────────────────────────────
   Shared chrome for the portfolio, so every control looks like one family.
   Before this, four different button treatments were in play (a bare text
   link, two mono links and a bordered pill); they are all PfButton now.
   ───────────────────────────────────────────────────────────────────────── */

type ButtonProps = {
  children: React.ReactNode;
  /* "on" marks the current choice, e.g. the active language */
  active?: boolean;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const base =
  "inline-flex items-center justify-center gap-2 rounded-full border px-3.5 py-1.5 " +
  "text-[11px] font-mono uppercase tracking-[0.15em] transition-colors " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pf-ink)]/50 " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--pf-ground)]";

const idle =
  "border-[var(--pf-hair)] text-[var(--pf-ink)]/80 hover:border-[var(--pf-ink)]/40 hover:text-[var(--pf-ink)]";

const on = "border-[var(--pf-ink)]/40 bg-[var(--pf-raise)] text-[var(--pf-ink)]";

export function PfButton({ children, active, className = "", ...rest }: ButtonProps) {
  return (
    <button {...rest} className={`${base} ${active ? on : idle} ${className}`}>
      {children}
    </button>
  );
}

/* Same shape for links, so a link and a button are indistinguishable to the eye. */
export function PfLink({
  children, className = "", ...rest
}: { children: React.ReactNode; className?: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a {...rest} className={`${base} ${idle} ${className}`}>
      {children}
    </a>
  );
}

/* ── Disclosure ───────────────────────────────────────────────────────────
   A real button controlling a real region: aria-expanded + aria-controls, so
   the state is announced rather than only drawn. Collapsed content is removed
   from the accessibility tree with hidden, not just clipped. */
export function Disclosure({
  summary,
  children,
  defaultOpen = false,
  label,
}: {
  /* Optional: with no summary the control is just the chevron. The label still
     names it for assistive tech, so a button with no visible text is never a
     button with no accessible name. */
  summary?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  label: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();

  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls={id}
        aria-label={label}
        className={`group text-left rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pf-ink)]/50 focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--pf-ground)] ${
          summary ? "flex w-full items-center justify-between gap-6" : "inline-flex items-center"
        }`}
      >
        {summary && <span className="min-w-0">{summary}</span>}
        <span
          aria-hidden
          className="shrink-0 -mr-1.5 text-[var(--pf-mute)] transition-colors group-hover:text-[var(--pf-ink)]"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: COLLAPSE_TRANSITION }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      <Collapse open={open} id={id}>
        {children}
      </Collapse>
    </div>
  );
}

/* ── Availability ─────────────────────────────────────────────────────────
   The one line a recruiter scans for first, so it gets the only colour on the
   page and a live dot. Same treatment as the CV's, and it appears wherever
   the availability does rather than being re-styled per site. The emerald
   token darkens under the light theme, so it stays legible on paper too. */
export function AvailabilityLine({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  /* font-normal rather than the page's font-light: the site carries Satoshi
     300 and 400 only, so 400 is as heavy as this line can genuinely go —
     anything above it silently renders as 400 anyway. */
  return (
    <p className={`flex items-start gap-3 font-normal text-emerald-300/90 ${className}`}>
      <span aria-hidden className="relative mt-[0.45em] flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 motion-safe:animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      <span>{children}</span>
    </p>
  );
}
