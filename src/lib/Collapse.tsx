import { useEffect, useLayoutEffect, useRef, useState } from "react";

/* One open/close motion for every drop-down on the site (CV cards and the
   portfolio's disclosures), so they all move the same way.

   Height animates through grid-template-rows 0fr → 1fr: the browser resolves
   the real content height itself, so there is no measuring and no max-height
   guess (a guessed ceiling makes the curve end early and clips long content).

   Closed content is hidden, not just clipped, so its links leave the tab order
   and the accessibility tree. That means "hidden" has to wait for the closing
   motion to finish, and has to be lifted one frame before the opening one. */

export const COLLAPSE_MS = 450;
/* ease-in-out: starts gently, settles gently, in both directions */
export const COLLAPSE_EASE = "cubic-bezier(0.65, 0, 0.35, 1)";
/* For the chevrons, so the arrow turns on the same curve as the panel moves */
export const COLLAPSE_TRANSITION = `transform ${COLLAPSE_MS}ms ${COLLAPSE_EASE}`;

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Collapse({
  open,
  id,
  children,
}: {
  open: boolean;
  id?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(open); // not hidden
  const [shown, setShown] = useState(open);     // at full height

  useEffect(() => {
    if (open) {
      setMounted(true);
      return;
    }
    setShown(false);
    if (reducedMotion()) {
      setMounted(false);
      return;
    }
    const t = window.setTimeout(() => setMounted(false), COLLAPSE_MS);
    return () => window.clearTimeout(t);
  }, [open]);

  /* Opening: the panel has just been un-hidden at 0fr. Read layout once so the
     browser commits that starting point, then go to 1fr — without the read,
     both states land in the same frame and nothing animates. */
  useLayoutEffect(() => {
    if (open && mounted && !shown) {
      ref.current?.getBoundingClientRect();
      setShown(true);
    }
  }, [open, mounted, shown]);

  const ms = reducedMotion() ? 0 : COLLAPSE_MS;

  return (
    <div
      ref={ref}
      id={id}
      hidden={!mounted}
      style={{
        display: mounted ? "grid" : undefined,
        gridTemplateRows: shown ? "1fr" : "0fr",
        opacity: shown ? 1 : 0,
        transition: `grid-template-rows ${ms}ms ${COLLAPSE_EASE}, opacity ${ms}ms ${COLLAPSE_EASE}`,
      }}
    >
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}
