import { useCallback, useEffect, useState } from "react";
import MainComponentNameCv from "../imports/MainComponentNameCv";
import Gate from "../portfolio/Gate";
import Portfolio from "../portfolio/Portfolio";
import type { PfLang } from "../portfolio/content";
import { useTheme } from "../lib/theme";
import CustomCursor from "../lib/CustomCursor";
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

  /* Keep the URL in step with the view so a refresh or a shared link lands in
     the same place, without adding a router dependency. */
  const go = useCallback((next: View, nextLang: PfLang = lang) => {
    const qs: string[] = [];
    if (next === "cv") qs.push("cv");
    if (next === "work") qs.push("work");
    if (nextLang !== "fr") qs.push(`lang=${nextLang}`);
    window.history.pushState({}, "", qs.length ? `?${qs.join("&")}` : window.location.pathname);
    setView(next);
    setLang(nextLang);
    window.scrollTo(0, 0);
  }, [lang]);

  // Browser back/forward should move between the gate and the views.
  useEffect(() => {
    const onPop = () => { setView(readView()); setLang(readLang()); };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return (
    <>
      {view === "gate" && (
        <Gate lang={lang} setLang={l => go("gate", l)} onChoose={v => go(v)}
              theme={theme} toggleTheme={toggleTheme} />
      )}

      {view === "work" && (
        <Portfolio
          lang={lang}
          setLang={l => go("work", l)}
          onReadCv={() => go("cv")}
          onBack={() => go("gate")}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      )}

      {/* The CV is untouched; it simply isn't mounted until asked for. */}
      {view === "cv" && <MainComponentNameCv theme={theme} toggleTheme={toggleTheme} />}

      {/* One pointer for the whole site, so it survives moving between views. */}
      <CustomCursor />

      {/* Grain sits above everything, on every view. Never printed. */}
      <div className="grain" aria-hidden="true" />
    </>
  );
}
