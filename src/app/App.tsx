import { useCallback, useEffect, useState } from "react";
import MainComponentNameCv, { translations } from "../imports/MainComponentNameCv";
import Gate from "../portfolio/Gate";
import NotFound from "../portfolio/NotFound";
import Portfolio from "../portfolio/Portfolio";
import type { PfLang } from "../portfolio/content";
import { useTheme } from "../lib/theme";
import CustomCursor from "../lib/CustomCursor";
/* Vercel Web Analytics. The /react entry, not /next — this is Vite. It injects
   Vercel's own script from /_vercel/insights on our own origin, so there is no
   third-party request, no cookie and nothing to consent to, and it counts the
   pushState navigations between /, /cv and /work on its own. Inert anywhere
   that is not a Vercel deployment, localhost included. */
import { Analytics } from "@vercel/analytics/react";
import { withPageTransition } from "../lib/pageTransition";
import "../styles/portfolio.css";

type View = "gate" | "cv" | "work" | "notfound";

/* Deep links bypass the gate entirely — essential, because a job application
   links one URL and a recruiter must never be asked to make a choice to reach
   the CV. /cv and /work are shareable; the gate is only for people arriving
   cold from GitHub, LinkedIn or a signature.

   These are real paths rather than query strings because the URL goes on a
   printed CV. That needs the host to serve index.html for paths with no file
   behind them: vercel.json does it in production, and Vite's dev and preview
   servers do it by default. */
const PATH_FOR = { cv: "/cv", work: "/work" } as const;

function readView(): View {
  if (typeof window === "undefined") return "gate";
  const path = window.location.pathname.replace(/\/+$/, "").toLowerCase();
  if (path === PATH_FOR.cv) return "cv";
  if (path === PATH_FOR.work) return "work";
  /* The site used ?cv and ?work until Oct 2026 and those links are already out
     in sent applications, so they keep working. Don't remove this. */
  const q = new URLSearchParams(window.location.search);
  if (q.has("cv")) return "cv";
  if (q.has("work")) return "work";
  /* Everything else is the 404. The host rewrites every unmatched path to the
     app, so this is where a mistyped or dead URL arrives. */
  return path === "" || path === "/index.html" ? "gate" : "notfound";
}

function readLang(): PfLang {
  if (typeof window === "undefined") return "fr";
  const p = new URLSearchParams(window.location.search).get("lang");
  return p === "en" || p === "de" || p === "it" ? p : "fr";
}

export default function App() {
  const [view, setView] = useState<View>(readView);
  const [lang, setLang] = useState<PfLang>(readLang);
  /* Theme is owned here so all three views share one source of truth and
     switching it never resets which view you are on. */
  const [theme, toggleTheme] = useTheme();
  /* False on a fresh load (the page plays its own entrance), true once the
     visitor has moved between views: the name is then already on screen,
     travelling, and must not replay its letter-by-letter intro. */
  const [moved, setMoved] = useState(false);

  /* Keep the URL in step with the view so a refresh or a shared link lands in
     the same place, without adding a router dependency. */
  const urlFor = (v: View, l: PfLang) => {
    /* The 404 keeps whatever wrong path the visitor arrived on — rewriting it
       to / would make a refresh show the gate instead of the 404. */
    const path = v === "cv" || v === "work" ? PATH_FOR[v]
      : v === "notfound" ? window.location.pathname
      : "/";
    // Language is a modifier on the view, not a resource of its own, so it
    // stays a query parameter: /cv?lang=en.
    return l === "fr" ? path : `${path}?lang=${l}`;
  };

  const go = useCallback((next: View, nextLang: PfLang = lang) => {
    window.history.pushState({}, "", urlFor(next, nextLang));
    withPageTransition(() => {
      setView(next);
      setLang(nextLang);
      setMoved(true);
      window.scrollTo(0, 0);
    });
  }, [lang]);

  /* Changing language stays on the same view and the same scroll position,
     and replaces the history entry rather than adding one: Back should leave
     the page, not step through every language the visitor tried. The URL
     still follows, so a link copied from the English CV opens in English. */
  const changeLang = useCallback((l: PfLang) => {
    window.history.replaceState({}, "", urlFor(view, l));
    setLang(l);
  }, [view]);

  /* Screen readers, hyphenation and translation tools read <html lang>. The
     tab title follows too: index.html ships a French one for the first paint
     and for anything reading the raw HTML, but a visitor who switches to
     German should not keep a French tab. */
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = `Sacha Riccardo Leone — ${translations[lang].title}`;
  }, [lang]);

  /* The host answers every unmatched path with the app, so a dead URL returns
     200 and a crawler would otherwise index the 404 as a real page. Tell it not
     to, and take the tag back off when leaving the view. */
  useEffect(() => {
    if (view !== "notfound") return;
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
    return () => { meta.remove(); };
  }, [view]);

  /* An old ?cv / ?work link already opened the right view above; quietly swap
     the address bar for the path form so what the visitor copies, bookmarks or
     forwards is the current URL. replaceState, not push, so Back still leaves
     the site rather than landing on the legacy URL again. */
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    if (q.has("cv") || q.has("work")) {
      window.history.replaceState({}, "", urlFor(readView(), readLang()));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- once, on load
  }, []);

  // Browser back/forward should move between the gate and the views.
  useEffect(() => {
    // Same scene played backwards: the name glides back to the centre.
    const onPop = () => withPageTransition(() => {
      setView(readView());
      setLang(readLang());
      setMoved(true);
      window.scrollTo(0, 0);
    });
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return (
    <>
      {view === "gate" && (
        <Gate lang={lang} setLang={changeLang} onChoose={v => go(v)} intro={!moved}
              theme={theme} toggleTheme={toggleTheme} />
      )}

      {view === "notfound" && (
        <NotFound lang={lang} setLang={changeLang} onHome={() => go("gate")}
                  theme={theme} toggleTheme={toggleTheme} />
      )}

      {view === "work" && (
        <Portfolio
          lang={lang}
          setLang={changeLang}
          onReadCv={() => go("cv")}
          onBack={() => go("gate")}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      )}

      {/* The CV isn't mounted until asked for. Its language comes from here,
          like the other views, so /cv?lang=en opens the English CV. */}
      {view === "cv" && (
        <MainComponentNameCv lang={lang} setLang={changeLang} intro={!moved}
          theme={theme} toggleTheme={toggleTheme} onBack={() => go("gate")} />
      )}

      {/* One pointer for the whole site, so it survives moving between views. */}
      <CustomCursor />

      <Analytics />

      {/* Grain sits above everything, on every view. Never printed. */}
      <div className="grain" aria-hidden="true" />
    </>
  );
}
