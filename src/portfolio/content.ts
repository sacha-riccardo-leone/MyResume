import { translations, type Lang } from "../imports/MainComponentNameCv";

import { media } from "./media";
export { media };
export type { Clip, Media } from "./media";

/* ─────────────────────────────────────────────────────────────────────────
   The CV owns the content. This file owns only the two things the CV has no
   concept of: which recording illustrates which project, and the handful of
   lines that exist because the portfolio is a page rather than a document
   (the gate, the hero thesis, the closing).

   Everything else — experience, skills, languages, education, interests,
   references, contact — is read from the CV's translations at render time, so
   editing the CV updates both views in all four languages and the two can
   never drift apart.
   ───────────────────────────────────────────────────────────────────────── */

export type PfLang = Lang;

/* Reading order, most recent first. Anything in the CV not named here still
   renders — it just sorts after these. */
export const PROJECT_ORDER = [
  "VRD - Ingénieurs conseils",
  "R2JC",
  "Magneticlab - XEFI Neuchâtel",
  "Ordine AI",
  "CPNE-TI – TPI",
  "SourShots",
];

export function orderedExperience(lang: PfLang) {
  const rank = (c: string) => {
    const i = PROJECT_ORDER.indexOf(c);
    return i === -1 ? PROJECT_ORDER.length : i;
  };
  return [...translations[lang].experience].sort((a, b) => rank(a.company) - rank(b.company));
}

/* Only strings that exist because this is a page, not a document. Anything
   with an equivalent in the CV is read from there instead. */
export const ui: Record<PfLang, {
  gateHint: string;
  cvLabel: string;
  emailLabel: string; linksLabel: string;
  workLabel: string; workMeta: string;
  ongoing: string;
  visit: string;
  backToGate: string;
  readCv: string;
  closing: string;
  emailCta: string;
  alsoLabel: string;
  details: string;
}> = {
  fr: {
    gateHint: "Deux façons de visiter",
    cvLabel: "Entrer", emailLabel: "E-mail", linksLabel: "Liens",
    workLabel: "Expérience complète", workMeta: "interactif · 3 min",
    ongoing: "En cours",
    visit: "Visiter",
    backToGate: "Retour",
    readCv: "Lire le CV",
    closing: "Parlons-en.",
    emailCta: "Écrire un e-mail",
    alsoLabel: "Également",
    details: "Détails",
  },
  en: {
    gateHint: "Two ways to visit",
    cvLabel: "Enter", emailLabel: "Email", linksLabel: "Links",
    workLabel: "Full experience", workMeta: "interactive · 3 min",
    ongoing: "Ongoing",
    visit: "Visit",
    backToGate: "Back",
    readCv: "Read the resume",
    closing: "Let's talk.",
    emailCta: "Send an email",
    alsoLabel: "Also",
    details: "Details",
  },
  de: {
    gateHint: "Zwei Arten zu besuchen",
    cvLabel: "Eintreten", emailLabel: "E-Mail", linksLabel: "Links",
    workLabel: "Volle Erfahrung", workMeta: "interaktiv · 3 Min.",
    ongoing: "Laufend",
    visit: "Besuchen",
    backToGate: "Zurück",
    readCv: "Lebenslauf lesen",
    closing: "Sprechen wir.",
    emailCta: "E-Mail schreiben",
    alsoLabel: "Ausserdem",
    details: "Details",
  },
  it: {
    gateHint: "Due modi di visitare",
    cvLabel: "Entra", emailLabel: "Email", linksLabel: "Link",
    workLabel: "Esperienza completa", workMeta: "interattivo · 3 min",
    ongoing: "In corso",
    visit: "Visitare",
    backToGate: "Indietro",
    readCv: "Leggere il CV",
    closing: "Parliamone.",
    emailCta: "Scrivere un'e-mail",
    alsoLabel: "Inoltre",
    details: "Dettagli",
  },
};

export const contact = {
  github: "https://github.com/sacha-riccardo-leone",
  linkedin: "https://linkedin.com/in/sacha-leone",
};
