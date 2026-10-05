import { useCallback, useEffect, useState } from "react";
import MainComponentNameCv from "../imports/MainComponentNameCv";
import Gate from "../portfolio/Gate";
import Portfolio from "../portfolio/Portfolio";
import type { PfLang } from "../portfolio/content";
import { useTheme } from "../lib/theme";
import CustomCursor from "../lib/CustomCursor";
import { withPageTransition } from "../lib/pageTransition";
import "../styles/portfolio.css";

type View = "gate" | "cv" | "work";

/* Deep links bypass the gate entirely — essential, because a job application
   links one URL and a recruiter must never be asked to make a choice to reach
   the CV. ?cv and ?work are shareable; the gate is only for people arriving
   cold from GitHub, LinkedIn or a signature. */
function readView(): View {
  if (typeof window === "undefined") return "gate";
  const p = new URLSearchParams(window.location.search);
  if (p.has("cv")) return "cv";
  if (p.has("work")) return "work";
  return "gate";
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
    const qs: string[] = [];
    if (v === "cv") qs.push("cv");
    if (v === "work") qs.push("work");
    if (l !== "fr") qs.push(`lang=${l}`);
    return qs.length ? `?${qs.join("&")}` : window.location.pathname;
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

  // Screen readers, hyphenation and translation tools read <html lang>.
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

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
          like the other views, so ?cv&lang=en opens the English CV. */}
      {view === "cv" && (
        <MainComponentNameCv lang={lang} setLang={changeLang} intro={!moved}
          theme={theme} toggleTheme={toggleTheme} />
      )}

      {/* One pointer for the whole site, so it survives moving between views. */}
      <CustomCursor />

      {/* Grain sits above everything, on every view. Never printed. */}
      <div className="grain" aria-hidden="true" />
    </>
  );
}
