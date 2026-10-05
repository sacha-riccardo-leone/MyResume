import { translations, type Lang } from "../imports/MainComponentNameCv";

import shotR2jc from "../assets/shot-r2jc.webp";
import shotOrdine from "../assets/shot-ordine.webp";
import vidR2jcWebm from "../assets/vid-r2jc.webm";
import vidR2jcMp4 from "../assets/vid-r2jc.mp4";
import posterR2jc from "../assets/poster-r2jc.webp";
import vidOrdineWebm from "../assets/vid-ordine.webm";
import vidOrdineMp4 from "../assets/vid-ordine.mp4";
import posterOrdine from "../assets/poster-ordine.webp";
import vidOrdineDarkWebm from "../assets/vid-ordine-dark.webm";
import vidOrdineDarkMp4 from "../assets/vid-ordine-dark.mp4";
import posterOrdineDark from "../assets/poster-ordine-dark.webp";
import vidVrdWebm from "../assets/vid-vrd.webm";
import vidVrdMp4 from "../assets/vid-vrd.mp4";
import posterVrd from "../assets/poster-vrd.webp";

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

export type Clip = { webm: string; mp4: string; poster: string };

export type Media = {
  shot?: string;
  video?: Clip;
  /* Where a project's own site has a dark face, its preview follows the
     portfolio's theme instead of clashing with it. */
  videoDark?: Clip;
  url?: string;
  /* Which projects get a full plate; the rest are listed compactly. */
  featured?: boolean;
};

/* Keyed by the company name as the CV spells it, so this map is the only
   thing that has to know a project exists. No entry simply means no media. */
export const media: Record<string, Media> = {
  "VRD - Ingénieurs conseils": {
    featured: true,
    url: "https://www.vrd-ingenieurs.ch/",
    shot: posterVrd,
    video: { webm: vidVrdWebm, mp4: vidVrdMp4, poster: posterVrd },
  },
  "Ordine AI": {
    featured: true,
    url: "https://www.ordine-ai.ch/",
    shot: shotOrdine,
    video: { webm: vidOrdineWebm, mp4: vidOrdineMp4, poster: posterOrdine },
    videoDark: { webm: vidOrdineDarkWebm, mp4: vidOrdineDarkMp4, poster: posterOrdineDark },
  },
  "R2JC": {
    featured: true,
    url: "https://r2jc.ch",
    shot: shotR2jc,
    video: { webm: vidR2jcWebm, mp4: vidR2jcMp4, poster: posterR2jc },
  },
};

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
  cvLabel: string; cvMeta: string;
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
    cvLabel: "CV", cvMeta: "2 pages · PDF",
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
    cvLabel: "Resume", cvMeta: "2 pages · PDF",
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
    cvLabel: "Lebenslauf", cvMeta: "2 Seiten · PDF",
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
    cvLabel: "CV", cvMeta: "2 pagine · PDF",
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
