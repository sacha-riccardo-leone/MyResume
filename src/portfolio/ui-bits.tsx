import { useId, useState } from "react";

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
  summary: React.ReactNode;
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
        className="group flex w-full items-start justify-between gap-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pf-ink)]/50 focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--pf-ground)] rounded-sm"
      >
        <span className="min-w-0">{summary}</span>
        <span
          aria-hidden
          className="mt-1 shrink-0 text-[var(--pf-mute)] transition-transform duration-300 group-hover:text-[var(--pf-ink)]"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="sr-only">{label}</span>
      </button>

      <div
        id={id}
        hidden={!open}
        className="grid transition-[grid-template-rows,opacity] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
