import shotR2jc from "../assets/shot-r2jc.webp";
import shotOrdine from "../assets/shot-ordine.webp";

export type PfLang = "fr" | "en" | "de" | "it";

/* Facts that are the same in every language live here once. Only prose is
   translated, which keeps four languages maintainable as the copy grows. */
export type Project = {
  id: string;
  name: string;
  year: string;
  url?: string;
  stack: string[];
  shot?: string;
  status?: "ongoing";
  /* number + unit are language-neutral; only `label` is translated */
  metrics: { value: string; label: Record<PfLang, string> }[];
  role: Record<PfLang, string>;
  summary: Record<PfLang, string>;
};

export const projects: Project[] = [
  {
    id: "vrd",
    name: "VRD — Ingénieurs conseils",
    year: "2026",
    url: "https://www.vrd-ingenieurs.ch/",
    stack: ["Next.js 16", "React 19", "TypeScript", "CSS Modules"],
    status: "ongoing",
    metrics: [
      { value: "6", label: { fr: "pages", en: "pages", de: "Seiten", it: "pagine" } },
      { value: "0", label: { fr: "dépendances runtime", en: "runtime deps", de: "Runtime-Deps", it: "dipendenze runtime" } },
      { value: "AA", label: { fr: "contraste, bloquant en CI", en: "contrast, blocking in CI", de: "Kontrast, CI-blockierend", it: "contrasto, bloccante in CI" } },
    ],
    role: {
      fr: "Site vitrine — conception et développement",
      en: "Company website — design and build",
      de: "Unternehmenswebsite — Konzept und Umsetzung",
      it: "Sito vetrina — progettazione e sviluppo",
    },
    summary: {
      fr: "Un bureau d'ingénieurs en technique du bâtiment. Toutes les routes prérendues, aucune dépendance au-delà de next et react, et un audit de contraste qui bloque la CI. Les constantes du hero sont mesurées, pas choisies.",
      en: "A building-services engineering firm. Every route prerendered, no dependency beyond next and react, and a contrast audit that blocks CI. The hero's constants are measured, not picked.",
      de: "Ein Ingenieurbüro für Gebäudetechnik. Alle Routen vorgerendert, keine Abhängigkeit ausser next und react, und ein Kontrast-Audit, das die CI blockiert. Die Konstanten des Heros sind gemessen, nicht gewählt.",
      it: "Uno studio di ingegneria impiantistica. Tutte le route prerenderizzate, nessuna dipendenza oltre next e react, e un audit di contrasto che blocca la CI. Le costanti dell'hero sono misurate, non scelte.",
    },
  },
  {
    id: "ordine",
    name: "Ordine AI",
    year: "2025 —",
    url: "https://www.ordine-ai.ch/",
    stack: ["FastAPI", "Next.js", "TypeScript", "Supabase", "Claude API", "Stripe"],
    shot: shotOrdine,
    status: "ongoing",
    metrics: [
      { value: "4", label: { fr: "langues évaluées en CI", en: "languages evaluated in CI", de: "Sprachen in der CI geprüft", it: "lingue valutate in CI" } },
      { value: "98%", label: { fr: "précision de classification", en: "classification accuracy", de: "Klassifizierungsgenauigkeit", it: "precisione di classificazione" } },
      { value: "30+", label: { fr: "failles corrigées", en: "issues fixed", de: "behobene Probleme", it: "problemi risolti" } },
    ],
    role: {
      fr: "Fondateur et développeur",
      en: "Founder and developer",
      de: "Gründer und Entwickler",
      it: "Fondatore e sviluppatore",
    },
    summary: {
      fr: "Un client e-mail IA pour PME suisses, conçu et livré seul. Derrière une boîte de réception ordinaire : une classification Claude Haiku mesurée par un harness CI, la résidence des données en Suisse, et un audit de sécurité mené par cinq agents.",
      en: "An AI email client for Swiss SMEs, designed and shipped alone. Behind an ordinary inbox: Claude Haiku classification measured by a CI harness, Swiss data residency, and a security audit run by five agents.",
      de: "Ein KI-E-Mail-Client für Schweizer KMU, allein konzipiert und geliefert. Hinter einem gewöhnlichen Posteingang: Claude-Haiku-Klassifizierung, von einem CI-Harness gemessen, Schweizer Datenresidenz und ein Sicherheitsaudit von fünf Agenten.",
      it: "Un client e-mail IA per PMI svizzere, progettato e consegnato da solo. Dietro una casella ordinaria: classificazione Claude Haiku misurata da un harness CI, residenza dei dati in Svizzera e un audit di sicurezza condotto da cinque agenti.",
    },
  },
  {
    id: "r2jc",
    name: "R2JC",
    year: "2026",
    url: "https://r2jc.ch",
    stack: ["WordPress", "PHP", "REST API", "JavaScript"],
    shot: shotR2jc,
    metrics: [
      { value: "6", label: { fr: "semaines, en production", en: "weeks, to production", de: "Wochen bis Produktion", it: "settimane, in produzione" } },
      { value: "÷3–6", label: { fr: "poids des images", en: "image weight", de: "Bildgewicht", it: "peso delle immagini" } },
      { value: "−⅔", label: { fr: "temps de réponse serveur", en: "server response time", de: "Server-Antwortzeit", it: "tempo di risposta server" } },
    ],
    role: {
      fr: "Développeur web — mandat client",
      en: "Web developer — client mandate",
      de: "Webentwickler — Kundenmandat",
      it: "Sviluppatore web — mandato cliente",
    },
    summary: {
      fr: "Refonte complète du site d'un collectif de mode, livrée sur un site déjà public et édité en parallèle par le client. Rendu conforme à la maquette au pixel, chaque texte restant éditable. Zéro régression.",
      en: "A full rebuild for a fashion collective, shipped onto a site already public and edited in parallel by the client. Pixel-faithful to the design, every text still editable. Zero regressions.",
      de: "Ein vollständiger Neubau für ein Modekollektiv, ausgeliefert auf eine bereits öffentliche und parallel vom Kunden bearbeitete Website. Pixelgenau zum Entwurf, jeder Text weiterhin editierbar. Null Regressionen.",
      it: "Una ricostruzione completa per un collettivo di moda, consegnata su un sito già pubblico e modificato in parallelo dal cliente. Fedele al pixel, ogni testo ancora modificabile. Zero regressioni.",
    },
  },
];

export const ui: Record<PfLang, {
  role: string;
  gateHint: string;
  cvLabel: string; cvMeta: string;
  workLabel: string; workMeta: string;
  heroA: string; heroB: string; heroSub: string;
  workEyebrow: string;
  ongoing: string;
  visit: string;
  backToGate: string;
  readCv: string;
}> = {
  fr: {
    role: "Développeur d'applications",
    gateHint: "Deux façons de visiter",
    cvLabel: "CV", cvMeta: "2 pages · PDF",
    workLabel: "Expérience complète", workMeta: "interactif · 3 min",
    heroA: "Des besoins réels.", heroB: "Des logiciels livrés.",
    heroSub: "Développeur d'applications en Suisse. Je conçois et je livre seul, du frontend à l'infrastructure.",
    workEyebrow: "Travaux",
    ongoing: "En cours",
    visit: "Visiter",
    backToGate: "Retour",
    readCv: "Lire le CV",
  },
  en: {
    role: "Application developer",
    gateHint: "Two ways to visit",
    cvLabel: "Resume", cvMeta: "2 pages · PDF",
    workLabel: "Full experience", workMeta: "interactive · 3 min",
    heroA: "Real needs.", heroB: "Software shipped.",
    heroSub: "Application developer in Switzerland. I design and ship alone, from frontend to infrastructure.",
    workEyebrow: "Work",
    ongoing: "Ongoing",
    visit: "Visit",
    backToGate: "Back",
    readCv: "Read the resume",
  },
  de: {
    role: "Applikationsentwickler",
    gateHint: "Zwei Arten zu besuchen",
    cvLabel: "Lebenslauf", cvMeta: "2 Seiten · PDF",
    workLabel: "Volle Erfahrung", workMeta: "interaktiv · 3 Min.",
    heroA: "Echte Bedürfnisse.", heroB: "Ausgelieferte Software.",
    heroSub: "Applikationsentwickler in der Schweiz. Ich konzipiere und liefere allein, vom Frontend bis zur Infrastruktur.",
    workEyebrow: "Arbeiten",
    ongoing: "Laufend",
    visit: "Besuchen",
    backToGate: "Zurück",
    readCv: "Lebenslauf lesen",
  },
  it: {
    role: "Sviluppatore di applicazioni",
    gateHint: "Due modi di visitare",
    cvLabel: "CV", cvMeta: "2 pagine · PDF",
    workLabel: "Esperienza completa", workMeta: "interattivo · 3 min",
    heroA: "Bisogni reali.", heroB: "Software in produzione.",
    heroSub: "Sviluppatore di applicazioni in Svizzera. Progetto e consegno da solo, dal frontend all'infrastruttura.",
    workEyebrow: "Lavori",
    ongoing: "In corso",
    visit: "Visitare",
    backToGate: "Indietro",
    readCv: "Leggere il CV",
  },
};
