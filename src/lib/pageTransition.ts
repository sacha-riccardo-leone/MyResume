import { flushSync } from "react-dom";

/* Moving between the landing page and the CV is one continuous scene: the
   name and the title stay on screen and glide to their new place, while
   everything else fades out and in around them (View Transitions API).
   Both pages tag those two elements with the same view-transition-name, and
   the browser morphs one into the other — forwards on "Entrer", backwards
   on the browser's Back.

   No API support, or reduced motion asked for: the change is instant. */

/* Pair by name: exactly one element per name may be on the page. */
export const SHARED = {
  name: { viewTransitionName: "site-name" },
  title: { viewTransitionName: "site-title" },
} as const satisfies Record<string, React.CSSProperties>;

type VTDocument = Document & {
  startViewTransition?: (cb: () => void) => {
    ready: Promise<void>;
    finished: Promise<void>;
    updateCallbackDone: Promise<void>;
  };
};

export function withPageTransition(update: () => void) {
  const doc = document as VTDocument;
  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!doc.startViewTransition || reduce || root.dataset.themeVt) {
    update();
    return;
  }
  // Scopes the page-transition timing in index.css, so it never leaks into
  // the theme reveal (which drives its own animation).
  root.dataset.pageVt = "active";
  const vt = doc.startViewTransition(() => { flushSync(update); });
  /* Starting a transition while one is still running aborts it, and every one
     of these promises then rejects. Each needs its own handler or the abort
     surfaces as an uncaught rejection in the console — which it did, when the
     theme was switched and a view changed before the reveal had finished. */
  vt.ready.catch(() => {});
  vt.updateCallbackDone.catch(() => {});
  vt.finished.finally(() => { delete root.dataset.pageVt; }).catch(() => {});
}
