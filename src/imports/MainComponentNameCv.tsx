import { useState, useEffect, useRef } from "react";
import { Linkedin, Github, Printer, MapPin, Mail, Phone, ChevronDown, ExternalLink, Globe } from "lucide-react";
import profilePic from "../assets/pfplinkedin-removebg-preview.png";

type Lang = "fr" | "en" | "de" | "it";
type Phase = "cursor" | "typing" | "done";

const FULL_NAME = "Sacha Riccardo Leone";

const translations = {
  fr: {
    title: "Développeur d'Applications",
    intro:
      "Quadrilingue (FR/IT natifs · EN C1 · DE B2) — développeur full-stack de 20 ans, fondateur d'Ordine AI en production pour PME suisses. CFC développement d'applications + maturité professionnelle, opérationnel sur tout le marché suisse.",
    sections: {
      contact: "Contact",
      experience: "Expérience",
      projects: "Projets",
      languages: "Langues",
      skills: "Stack Technique",
      education: "Formation",
    },
    contact: {
      location: "La Chaux-de-Fonds, NE",
      email: "leonesachariccardo@gmail.com",
      phone: "+41 78 400 01 68",
      linkedin: "linkedin.com/in/sacha-leone",
      github: "@sacha-riccardo-leone",
      website: "resume-sacha-leone.vercel.app",
      dob: "31.01.2006",
      nationality: "Italien — Permis C (CH)",
      mobility: "Mobilité nationale (transports publics)",
    },
    experience: [
      {
        date: "4–22 mai 2026",
        company: "Xefi",
        description:
          "Addon Odoo 19 Enterprise (pixieset_sync) + extension Chrome/Firefox pour un studio photo suisse (Olive & Beige) — sync automatique Pixieset → Odoo : contacts, projets, sessions, cron quotidien, secrets masqués. 4 batches livrés en 18 jours, déployé sur Odoo.sh, cliente satisfaite. Stack : Python 3.12, pydantic v2, pytest, Manifest V3.",
      },
      {
        date: "2025 – présent",
        company: "Ordine AI",
        description:
          "Fondateur & ingénieur full-stack. Client email IA multi-fournisseurs pour PME suisses, en beta active — pipeline de classification Claude Haiku (harness CI FR/DE/IT/EN : 100%/94%/96%/98%), conformité FADP (Cloud Run Zurich, AES-GCM-256, DLP PII suisse), billing Stripe 4 niveaux, audit sécurité 5-agents adversariaux (30+ findings résolus).",
      },
      {
        date: "avril 2025 – juin 2025",
        company: "CPNE-TI – TPI",
        description:
          "Développement en C#/Raylib d'une version numérisée du jeu \"Qui est-ce ?\", incluant un algorithme de génération de personnages uniques par comparaison de profils ADN et un système de rareté vestimentaire. Note : 5,5/6.",
      },
      {
        date: "août 2025 – janvier 2026",
        company: "CPNE-AA",
        description:
          "Exploration d'une reconversion vers les arts appliqués (design, couture, industrie) — retour confirmé au développement logiciel. Compétences transversales : sensibilité design, Krita, retouche image.",
      },
      {
        date: "2023 – présent",
        company: "SourShots",
        description:
          "Création de l'identité visuelle et des contenus digitaux pour un groupe local sur 3 ans — affiches, reels, brochures, posts réseaux sociaux. Gestion autonome de la production créative. Outils : Krita, Sony.",
      },
    ],
    languages: [
      { name: "Anglais", level: "C1" },
      { name: "Allemand", level: "B2" },
      { name: "Français", level: "Maternelle" },
      { name: "Italien", level: "Maternelle" },
    ],
    education: [
      {
        date: "2022–2025",
        institution: "CPNE-TI",
        description:
          "Formation d'informatique (Dév. d'applications), CFC et maturité professionnelle",
      },
      {
        date: "2018–2022",
        institution: "Scolarité obligatoire — Le Landeron (NE) & Erlach (BE)",
        description: "PRIMA bilingue FR/DE · Immersion complète en allemand à Erlach (2020–21) · Diplôme cantonal neuchâtelois",
      },
    ],
  },
  en: {
    title: "Application Developer",
    intro:
      "Quadrilingual (FR/IT native · EN C1 · DE B2) — full-stack developer, 20, founder of Ordine AI in production for Swiss SMEs. CFC + professional baccalaureate, operational across the full Swiss market.",
    sections: {
      contact: "Contact",
      experience: "Experience",
      projects: "Projects",
      languages: "Languages",
      skills: "Tech Stack",
      education: "Education",
    },
    contact: {
      location: "La Chaux-de-Fonds, NE",
      email: "leonesachariccardo@gmail.com",
      phone: "+41 78 400 01 68",
      linkedin: "linkedin.com/in/sacha-leone",
      github: "@sacha-riccardo-leone",
      website: "resume-sacha-leone.vercel.app",
      dob: "31.01.2006",
      nationality: "Italian — Permit C (CH)",
      mobility: "Nationwide mobility (public transport)",
    },
    experience: [
      {
        date: "4–22 May 2026",
        company: "Xefi",
        description:
          "Built an Odoo 19 Enterprise addon (pixieset_sync) + Chrome/Firefox browser extension for a Swiss photography studio (Olive & Beige) — automated Pixieset → Odoo sync (contacts, projects, sessions), daily cron, masked secrets. Delivered in 4 batches over 18 days, live on Odoo.sh, client satisfied. Stack: Python 3.12, pydantic v2, pytest, Manifest V3.",
      },
      {
        date: "2025 – present",
        company: "Ordine AI",
        description:
          "Founder & full-stack engineer. AI-powered multi-provider email client for Swiss SMEs, in active beta — Claude Haiku classification pipeline (CI eval harness FR/DE/IT/EN: 100%/94%/96%/98%), FADP-compliant infra (Cloud Run Zurich, AES-GCM-256, Swiss PII DLP), Stripe 4-tier billing, 5-agent adversarial security audit (30+ findings resolved).",
      },
      {
        date: "Apr 2025 – Jun 2025",
        company: "CPNE-TI – Final Project",
        description:
          "Developed a digitised version of \"Guess Who?\" in C#/Raylib, featuring a unique character generation algorithm using DNA profile comparison and a clothing rarity system. Grade: 5.5/6.",
      },
      {
        date: "Aug 2025 – Jan 2026",
        company: "CPNE-AA",
        description:
          "Brief exploration of a career shift into applied arts (design, fashion, industry) — returned to software development. Cross-disciplinary skills gained: design sensibility, Krita, image editing.",
      },
      {
        date: "2023 – present",
        company: "SourShots",
        description:
          "Visual identity and digital content for a local band over 3 years — posters, reels, brochures, social media. Autonomous creative production management. Tools: Krita, Sony.",
      },
    ],
    languages: [
      { name: "English", level: "C1" },
      { name: "German", level: "B2" },
      { name: "French", level: "Native" },
      { name: "Italian", level: "Native" },
    ],
    education: [
      {
        date: "2022–2025",
        institution: "CPNE-TI",
        description:
          "IT training (Application Development), federal vocational diploma (CFC) and professional baccalaureate",
      },
      {
        date: "2018–2022",
        institution: "Compulsory schooling — Le Landeron (NE) & Erlach (BE)",
        description: "PRIMA bilingual programme (FR/DE) · Full German immersion in Erlach (2020–21) · Neuchâtel cantonal diploma",
      },
    ],
  },
  de: {
    title: "Applikationsentwickler",
    intro:
      "Viersprachig (FR/IT Muttersprache · EN C1 · DE B2) — Full-Stack-Entwickler, 20 Jahre, Gründer von Ordine AI in Produktion für Schweizer KMU. EFZ Applikationsentwicklung + Berufsmaturität, auf dem gesamten Schweizer Markt einsetzbar.",
    sections: {
      contact: "Kontakt",
      experience: "Erfahrung",
      projects: "Projekte",
      languages: "Sprachen",
      skills: "Tech Stack",
      education: "Ausbildung",
    },
    contact: {
      location: "La Chaux-de-Fonds, NE",
      email: "leonesachariccardo@gmail.com",
      phone: "+41 78 400 01 68",
      linkedin: "linkedin.com/in/sacha-leone",
      github: "@sacha-riccardo-leone",
      website: "resume-sacha-leone.vercel.app",
      dob: "31.01.2006",
      nationality: "Italienisch — Ausweis C (CH)",
      mobility: "Schweizweite Mobilität (öffentliche Verkehrsmittel)",
    },
    experience: [
      {
        date: "4.–22. Mai 2026",
        company: "Xefi",
        description:
          "Odoo-19-Enterprise-Addon (pixieset_sync) + Chrome/Firefox-Erweiterung für ein Schweizer Fotostudio (Olive & Beige) — automatische Pixieset → Odoo-Synchronisation (Kontakte, Projekte, Sessions), Tages-Cron, Secret-Maskierung. 4 Batches in 18 Tagen geliefert, live auf Odoo.sh, Kundin zufrieden. Stack: Python 3.12, pydantic v2, pytest, Manifest V3.",
      },
      {
        date: "2025 – heute",
        company: "Ordine AI",
        description:
          "Gründer & Full-Stack-Ingenieur. KI-gestützter Multi-Provider-E-Mail-Client für Schweizer KMU, in aktiver Beta — Claude-Klassifizierungspipeline (CI-Harness FR/DE/IT/EN: 100%/94%/96%/98%), FADP-konforme Infrastruktur (Cloud Run Zürich, AES-GCM-256, PII-DLP), Stripe-Billing 4 Stufen, 5-Agent-Sicherheitsaudit (30+ Findings behoben).",
      },
      {
        date: "Apr. 2025 – Jun. 2025",
        company: "CPNE-TI – IPA",
        description:
          "Entwicklung einer digitalisierten Version von \"Wer bin ich?\" in C#/Raylib — Algorithmus zur Charaktergenerierung per DNS-Profilvergleich, Seltenheitssystem für Kleidung. Note: 5,5/6.",
      },
      {
        date: "Aug. 2025 – Jan. 2026",
        company: "CPNE-AA",
        description:
          "Kurze Erkundung einer Umorientierung in angewandte Künste (Design, Mode, Industrie) — Rückkehr zur Softwareentwicklung bestätigt. Übertragbare Kompetenzen: Designsensibilität, Krita, Bildbearbeitung.",
      },
      {
        date: "2023 – heute",
        company: "SourShots",
        description:
          "Visuelle Identität und digitale Inhalte für eine lokale Band über 3 Jahre — Plakate, Reels, Broschüren, Social Media. Autonomes Kreativmanagement. Tools: Krita, Sony.",
      },
    ],
    languages: [
      { name: "Englisch", level: "C1" },
      { name: "Deutsch", level: "B2" },
      { name: "Französisch", level: "Muttersprache" },
      { name: "Italienisch", level: "Muttersprache" },
    ],
    education: [
      {
        date: "2022–2025",
        institution: "CPNE-TI",
        description:
          "Informatikausbildung (Applikationsentwicklung), EFZ und Berufsmaturität",
      },
      {
        date: "2018–2022",
        institution: "Obligatorische Schulzeit — Le Landeron (NE) & Erlach (BE)",
        description: "PRIMA bilinguale Ausbildung (FR/DE) · Vollständige Deutschimmersion in Erlach (2020–21) · Kantonales Diplom Neuenburg",
      },
    ],
  },
  it: {
    title: "Sviluppatore di Applicazioni",
    intro:
      "Quadrilingue (FR/IT madrelingua · EN C1 · DE B2) — sviluppatore full-stack di 20 anni, fondatore di Ordine AI in produzione per PMI svizzere. AFC + maturità professionale, operativo su tutto il mercato svizzero.",
    sections: {
      contact: "Contatto",
      experience: "Esperienza",
      projects: "Progetti",
      languages: "Lingue",
      skills: "Tech Stack",
      education: "Formazione",
    },
    contact: {
      location: "La Chaux-de-Fonds, NE",
      email: "leonesachariccardo@gmail.com",
      phone: "+41 78 400 01 68",
      linkedin: "linkedin.com/in/sacha-leone",
      github: "@sacha-riccardo-leone",
      website: "resume-sacha-leone.vercel.app",
      dob: "31.01.2006",
      nationality: "Italiano — Permesso C (CH)",
      mobility: "Mobilità nazionale (mezzi pubblici)",
    },
    experience: [
      {
        date: "4–22 maggio 2026",
        company: "Xefi",
        description:
          "Addon Odoo 19 Enterprise (pixieset_sync) + estensione Chrome/Firefox per uno studio fotografico svizzero (Olive & Beige) — sync automatico Pixieset → Odoo (contatti, progetti, sessioni), cron giornaliero, segreti mascherati. 4 batch consegnati in 18 giorni, live su Odoo.sh, cliente soddisfatta. Stack: Python 3.12, pydantic v2, pytest, Manifest V3.",
      },
      {
        date: "2025 – presente",
        company: "Ordine AI",
        description:
          "Fondatore & ingegnere full-stack. Client email IA multi-provider per PMI svizzere, in beta attiva — pipeline di classificazione Claude Haiku (CI harness FR/DE/IT/EN: 100%/94%/96%/98%), infrastruttura conforme FADP (Cloud Run Zurigo, AES-GCM-256, DLP PII svizzero), billing Stripe 4 livelli, audit di sicurezza 5-agenti adversariali (30+ findings risolti).",
      },
      {
        date: "apr. 2025 – giu. 2025",
        company: "CPNE-TI – LPI",
        description:
          "Sviluppo in C#/Raylib di una versione digitale del gioco \"Indovina chi?\" — algoritmo di generazione personaggi tramite confronto profili DNA, sistema di rarità abbigliamento. Voto: 5,5/6.",
      },
      {
        date: "ago. 2025 – gen. 2026",
        company: "CPNE-AA",
        description:
          "Breve esplorazione di una riconversione verso le arti applicate (design, moda, industria) — ritorno confermato allo sviluppo software. Competenze trasversali: sensibilità design, Krita, ritocco fotografico.",
      },
      {
        date: "2023 – presente",
        company: "SourShots",
        description:
          "Identità visiva e contenuti digitali per un gruppo locale su 3 anni — manifesti, reels, brochure, social media. Gestione autonoma della produzione creativa. Strumenti: Krita, Sony.",
      },
    ],
    languages: [
      { name: "Inglese", level: "C1" },
      { name: "Tedesco", level: "B2" },
      { name: "Francese", level: "Madrelingua" },
      { name: "Italiano", level: "Madrelingua" },
    ],
    education: [
      {
        date: "2022–2025",
        institution: "CPNE-TI",
        description:
          "Formazione informatica (Sviluppo di applicazioni), AFC e maturità professionale",
      },
      {
        date: "2018–2022",
        institution: "Scolarità obbligatoria — Le Landeron (NE) & Erlach (BE)",
        description: "PRIMA bilingue FR/DE · Immersione completa in tedesco a Erlach (2020–21) · Diploma cantonale neuchâtelois",
      },
    ],
  },
};

const skillGroups = [
  {
    category: { fr: "Frontend", en: "Frontend", de: "Frontend", it: "Frontend" },
    color: "#34d399",
    items: [
      { name: "TypeScript", level: 50 },
      { name: "Next.js", level: 60 },
      { name: "JavaScript", level: 70 },
      { name: "HTML/CSS", level: 90 },
    ],
  },
  {
    category: { fr: "Backend", en: "Backend", de: "Backend", it: "Backend" },
    color: "#60a5fa",
    items: [
      { name: "Python", level: 60 },
      { name: "FastAPI", level: 70 },
      { name: "PHP", level: 75 },
      { name: "C#", level: 80 },
    ],
  },
  {
    category: { fr: "Base de données", en: "Databases", de: "Datenbanken", it: "Database" },
    color: "#fbbf24",
    items: [
      { name: "SQL/NoSQL", level: 70 },
      { name: "Supabase", level: 80 },
    ],
  },
  {
    category: { fr: "IA / LLM", en: "AI / LLM", de: "KI / LLM", it: "IA / LLM" },
    color: "#22d3ee",
    items: [
      { name: "RAG / Vector DB", level: 60 },
      { name: "Eval harness", level: 60 },
      { name: "Claude API", level: 75 },
      { name: "Prompt engineering", level: 80 },
    ],
  },
  {
    category: { fr: "Sécurité", en: "Security", de: "Sicherheit", it: "Sicurezza" },
    color: "#f87171",
    items: [
      { name: "OAuth / JWT", level: 60 },
      { name: "RLS / Hardening", level: 60 },
      { name: "FADP / GDPR", level: 70 },
    ],
  },
  {
    category: { fr: "Infrastructure", en: "Infrastructure", de: "Infrastruktur", it: "Infrastruttura" },
    color: "#818cf8",
    items: [
      { name: "Sentry / PostHog", level: 60 },
      { name: "Cloud Run / GCP", level: 70 },
      { name: "Vercel", level: 75 },
    ],
  },
  {
    category: { fr: "Design", en: "Design", de: "Design", it: "Design" },
    color: "#fb923c",
    items: [
      { name: "Figma", level: 50 },
      { name: "UI/UX", level: 80 },
      { name: "Krita", level: 95 },
    ],
  },
  {
    category: { fr: "Outils", en: "Tools", de: "Werkzeuge", it: "Strumenti" },
    color: "#a78bfa",
    items: [
      { name: "Git", level: 82 },
      { name: "Microsoft 365", level: 95 },
      { name: "VS Code", level: 100 },
    ],
  },
];

const ordineAIProject = {
  name: "Ordine AI",
  url: "https://www.ordine-ai.ch/",
  status: { fr: "En production", en: "In production", de: "In Betrieb", it: "In produzione" } as Record<Lang, string>,
  tagline: {
    fr: "Client email IA multi-fournisseurs pour PME suisses — conçu et livré seul de A à Z",
    en: "AI-powered multi-provider email client for Swiss SMEs — solo-built end-to-end",
    de: "KI-gestützter Multi-Provider-E-Mail-Client für Schweizer KMU — allein von A bis Z entwickelt",
    it: "Client email IA multi-provider per PMI svizzere — sviluppato in solitaria dall'inizio alla fine",
  } as Record<Lang, string>,
  highlights: {
    fr: [
      "Pipeline de classification IA (ton × intention × catégorie × priorité) sur Claude Haiku — harness CI multilingue FR/DE/IT/EN : 100% / 94% / 96% / 98%",
      "Parité fonctionnelle Gmail & Microsoft Graph derrière un protocole EmailProvider unifié : envoi/réception, fils, brouillons, recherche, snooze, envoi différé, pièces jointes",
      "Conformité FADP dès le premier jour — résidence EU (Cloud Run Zurich + Supabase Frankfurt), chiffrement AES-GCM-256, DLP PII suisse (IBAN, AVS, CB Luhn), droit à l'effacement",
      "Audit sécurité 5-agents adversariaux — 30+ findings résolus : injection de prompt, SSRF, confusion algo JWT, mXSS via DOMPurify, JWKS OAuth, durcissement RLS, IDOR",
      "Billing Stripe complet — 4 niveaux (Starter / Pro / Business / Enterprise), essai 14 jours, portail client, idempotence des webhooks",
    ],
    en: [
      "AI classification pipeline (tone × intent × category × priority) on Claude Haiku — CI eval harness, FR/DE/IT/EN: 100% / 94% / 96% / 98%",
      "Gmail & Microsoft Graph feature parity behind a unified EmailProvider protocol: send/receive, threads, drafts, search, snooze, scheduled send, attachments",
      "FADP-compliant from day one — EU data residency (Cloud Run Zurich + Supabase Frankfurt), AES-GCM-256 token encryption, Swiss PII DLP (IBAN, AHV, Luhn CC), right-to-erasure",
      "5-agent adversarial security audit — 30+ findings resolved: prompt injection, SSRF, JWT algorithm confusion, mXSS via DOMPurify, OAuth JWKS verification, RLS hardening, IDOR",
      "Full Stripe billing — 4-tier model (Starter / Pro / Business / Enterprise), 14-day trial, customer portal, webhook idempotency",
    ],
    de: [
      "KI-Klassifizierungspipeline (Ton × Absicht × Kategorie × Priorität) auf Claude Haiku — CI-Eval-Harness FR/DE/IT/EN: 100% / 94% / 96% / 98%",
      "Gmail & Microsoft Graph Funktionsparität hinter einem einheitlichen EmailProvider-Protokoll: Senden/Empfangen, Threads, Entwürfe, Suche, Snooze, geplanter Versand, Anhänge",
      "FADP-konform von Anfang an — EU-Datenwohnsitz (Cloud Run Zürich + Supabase Frankfurt), AES-GCM-256-Verschlüsselung, PII-DLP (IBAN, AHV, Luhn-KK), Recht auf Löschung",
      "5-Agent-Sicherheitsaudit — 30+ Findings: Prompt Injection, SSRF, JWT-Algorithmusverwirrung, mXSS via DOMPurify, OAuth-JWKS-Verifikation, RLS-Härtung, IDOR",
      "Vollständiges Stripe-Billing — 4 Stufen (Starter / Pro / Business / Enterprise), 14-Tage-Test, Kundenportal, Webhook-Idempotenz",
    ],
    it: [
      "Pipeline di classificazione IA (tono × intento × categoria × priorità) su Claude Haiku — CI eval harness FR/DE/IT/EN: 100% / 94% / 96% / 98%",
      "Parità funzionale Gmail & Microsoft Graph dietro un protocollo EmailProvider unificato: invio/ricezione, thread, bozze, ricerca, snooze, invio programmato, allegati",
      "Conforme FADP fin dal primo giorno — residenza EU (Cloud Run Zurigo + Supabase Francoforte), cifratura AES-GCM-256, DLP PII svizzero (IBAN, AVS, Luhn CC), diritto alla cancellazione",
      "Audit di sicurezza 5-agenti adversariali — 30+ findings: prompt injection, SSRF, confusione algoritmo JWT, mXSS via DOMPurify, verifica JWKS OAuth, hardening RLS, IDOR",
      "Billing Stripe completo — 4 livelli (Starter / Pro / Business / Enterprise), prova 14 giorni, portale cliente, idempotenza webhook",
    ],
  } as Record<Lang, string[]>,
  stack: ["FastAPI", "Next.js 14", "TypeScript", "Supabase", "Claude API", "Stripe", "Cloud Run", "Vercel", "Sentry", "PostHog"],
};

/* Language badge data — flag + level per UI language */
const langBadges: { flag: string; label: Record<Lang, string> }[] = [
  { flag: "🇫🇷", label: { fr: "Natif", en: "Native", de: "Muttersprache", it: "Madrelingua" } },
  { flag: "🇮🇹", label: { fr: "Natif", en: "Native", de: "Muttersprache", it: "Madrelingua" } },
  { flag: "🇬🇧", label: { fr: "C1", en: "C1", de: "C1", it: "C1" } },
  { flag: "🇩🇪", label: { fr: "B2", en: "B2", de: "B2", it: "B2" } },
];

/* ────────────────────────────────────────────────────── */
/* Animated wave background (canvas)                      */
/* Inspired by: noise-modulated amplitudes + speeds,      */
/* global energy pulse, harmonic wave composition,        */
/* gradient fills from crest to transparent.              */
/* ────────────────────────────────────────────────────── */
function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Smooth pseudo-noise: 3 layered sines → organic, non-repeating variation
    // (mirrors the simplex noise modulation from the GLSL shader)
    const sn = (x: number) =>
      (Math.sin(x * 1.31) + Math.sin(x * 2.73 + 1.0) + Math.sin(x * 5.09 + 2.3)) / 3;

    // g = base grey level, a = peak opacity
    const waves = [
      { baseAmp: 55, freq: 0.0025, baseSpd: 0.42, y: 0.18, nOff: 0.00, g: 72, a: 0.52 },
      { baseAmp: 72, freq: 0.0018, baseSpd: 0.28, y: 0.38, nOff: 1.73, g: 58, a: 0.45 },
      { baseAmp: 50, freq: 0.0033, baseSpd: 0.55, y: 0.55, nOff: 3.30, g: 64, a: 0.40 },
      { baseAmp: 65, freq: 0.0021, baseSpd: 0.35, y: 0.70, nOff: 5.10, g: 48, a: 0.35 },
      { baseAmp: 35, freq: 0.0042, baseSpd: 0.65, y: 0.85, nOff: 2.54, g: 55, a: 0.28 },
    ];

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Grey veil at the very top so no bare black shows above the first wave
      const topGrad = ctx.createLinearGradient(0, 0, 0, h * 0.22);
      topGrad.addColorStop(0.0, "rgba(62,62,62,0.55)");
      topGrad.addColorStop(1.0, "rgba(0,0,0,0)");
      ctx.fillStyle = topGrad;
      ctx.fillRect(0, 0, w, h);

      // Global energy pulse — whole system breathes in/out slowly
      const globalAmp = 1.0 + 0.35 * sn(t * 0.004) + 0.15 * sn(t * 0.006 + 2.1);

      for (const wave of waves) {
        // Per-wave amplitude noise — each wave surges and calms independently
        const ampMod = 0.65 + 0.55 * (0.5 + 0.5 * sn(t * 0.011 + wave.nOff));
        const amp = wave.baseAmp * globalAmp * ampMod;

        // Per-wave speed noise — pace drifts faster/slower organically
        const spdMod = 1.0 + 0.22 * sn(t * 0.009 + wave.nOff * 1.3);
        const spd = wave.baseSpd * spdMod;

        const baseY = h * wave.y;

        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += 4) {
          const y =
            baseY
            + Math.sin(x * wave.freq + t * spd)                             * amp          // primary
            + Math.sin(x * wave.freq * 1.67 + t * spd * 0.74 + 2.1)        * amp * 0.35   // 2nd harmonic
            + Math.sin(x * wave.freq * 2.83 + t * spd * 0.53 + 4.8)        * amp * 0.15;  // 3rd harmonic
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.closePath();

        // Gradient fill: bright at crest → near-transparent at canvas bottom
        const grad = ctx.createLinearGradient(0, baseY - wave.baseAmp * 2, 0, h);
        grad.addColorStop(0.0, `rgba(${wave.g},${wave.g},${wave.g},${wave.a})`);
        grad.addColorStop(0.4, `rgba(${wave.g},${wave.g},${wave.g},${+(wave.a * 0.3).toFixed(2)})`);
        grad.addColorStop(1.0, `rgba(10,10,10,0.03)`);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      t += 0.007;
      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%", height: "100%",
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
}

/* ────────────────────────────────────────────────────── */
/* Scroll reveal wrapper                                  */
/* ────────────────────────────────────────────────────── */
function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ────────────────────────────────────────────────────── */
/* Skill dots (5-dot level indicator)                     */
/* ────────────────────────────────────────────────────── */
function SkillDots({
  filled,
  color,
  emptyColor = "rgba(255,255,255,0.1)",
  size = 7,
  gap = 5,
}: {
  filled: number;
  color: string;
  emptyColor?: string;
  size?: number;
  gap?: number;
}) {
  return (
    <div className="flex items-center" style={{ gap: `${gap}px` }}>
      {Array.from({ length: 5 }).map((_, i) => {
        const diff = filled - i;
        const isHalf = diff > 0 && diff < 1;
        const isFull = diff >= 1;

        /* Use SVG for all dots — pure vector, survives PDF export perfectly.
           No border-radius clipping, no gradient flattening artifacts. */
        if (isHalf) {
          return (
            <svg
              key={i}
              width={size} height={size}
              viewBox="0 0 10 10"
              shapeRendering="geometricPrecision"
              style={{ flexShrink: 0, display: "block", overflow: "visible" }}
            >
              {/* Empty background circle */}
              <circle cx="5" cy="5" r="4.9" fill={emptyColor} />
              {/* Filled left half — arc from top-center counterclockwise to bottom-center */}
              <path d="M5,0.1 A4.9,4.9 0 0,0 5,9.9 Z" fill={color} shapeRendering="geometricPrecision" />
            </svg>
          );
        }

        return (
          <svg
            key={i}
            width={size} height={size}
            viewBox="0 0 10 10"
            shapeRendering="geometricPrecision"
            style={{ flexShrink: 0, display: "block" }}
          >
            <circle cx="5" cy="5" r="4.9" fill={isFull ? color : emptyColor} />
          </svg>
        );
      })}
    </div>
  );
}

function getLangDots(level: string): number {
  const map: Record<string, number> = {
    Maternelle: 5, Native: 5, Madrelingua: 5, Muttersprache: 5,
    C2: 5, C1: 4.5, B2: 3.5, B1: 2, A2: 1, A1: 1,
  };
  return map[level] ?? 3;
}

/* ────────────────────────────────────────────────────── */
/* Skill section (dots grid)                              */
/* ────────────────────────────────────────────────────── */
function SkillSection({ groups, lang }: { groups: typeof skillGroups; lang: Lang }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {groups.map((group, gi) => (
        <div
          key={gi}
          className="glass-card px-4 py-4 rounded-2xl"
          onMouseMove={glassMove} onMouseEnter={glassEnter} onMouseLeave={glassLeave}
        >
          <p
            className="text-[10px] uppercase tracking-[0.18em] font-medium mb-4"
            style={{ color: group.color }}
          >
            {group.category[lang]}
          </p>
          <div className="space-y-3.5">
            {group.items.map((skill, si) => (
              <div key={si} className="flex items-center justify-between gap-4">
                <span className="text-sm text-white/70">{skill.name}</span>
                <SkillDots filled={Math.round(skill.level / 10) / 2} color={group.color} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────── */
/* Glass card interaction — cursor-as-light-source        */
/* ────────────────────────────────────────────────────── */
function glassMove(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const { left, top, width, height } = el.getBoundingClientRect();
  el.style.setProperty("--mouse-x", `${((e.clientX - left) / width) * 100}%`);
  el.style.setProperty("--mouse-y", `${((e.clientY - top) / height) * 100}%`);
}
const glassEnter = (e: React.MouseEvent<HTMLElement>) =>
  e.currentTarget.style.setProperty("--glow-opacity", "1");
const glassLeave = (e: React.MouseEvent<HTMLElement>) =>
  e.currentTarget.style.setProperty("--glow-opacity", "0");

/* ────────────────────────────────────────────────────── */
/* Section heading                                        */
/* ────────────────────────────────────────────────────── */
function SectionHead({ title, num }: { title: string; num: string }) {
  return (
    <div className="mb-10">
      <p className="text-[10px] font-mono text-white/25 mb-1 tracking-widest">/ {num}</p>
      <h2 className="text-2xl font-medium">{title}</h2>
      <div className="w-10 h-[1.5px] bg-white/25 mt-3" />
    </div>
  );
}

/* ────────────────────────────────────────────────────── */
/* Main component                                         */
/* ────────────────────────────────────────────────────── */
export default function MainComponentNameCv() {
  const [lang, setLang] = useState<Lang>("fr");
  const [phase, setPhase] = useState<Phase>("cursor");
  const [displayedName, setDisplayedName] = useState("");
  const [openExp, setOpenExp] = useState<Set<number>>(new Set([0]));
  const t = translations[lang];

  const toggleExp = (i: number) =>
    setOpenExp(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  useEffect(() => {
    const timer = setTimeout(() => setPhase("typing"), 700);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase !== "typing") return;
    if (displayedName.length < FULL_NAME.length) {
      const timer = setTimeout(() => {
        setDisplayedName(FULL_NAME.slice(0, displayedName.length + 1));
      }, 85);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setPhase("done"), 400);
      return () => clearTimeout(timer);
    }
  }, [phase, displayedName]);

  const done = phase === "done";
  const fadeIn = (delay: number) => ({
    opacity: done ? 1 : 0,
    transition: `opacity 0.7s ease ${delay}ms`,
  });

  const cursor = phase !== "done" && (
    <span className="cursor-blink inline-block w-[2px] h-[0.85em] bg-white ml-[2px] align-middle" />
  );

  /* Profile picture */
  const ProfilePic = ({ size }: { size: string }) => (
    <div className={`relative shrink-0 ${size}`} data-name="Elements">
      <div className="absolute inset-0 overflow-hidden rounded-2xl ring-2 ring-white/20">
        <img src={profilePic} alt={FULL_NAME} className="size-full object-cover" />
      </div>
    </div>
  );

  /* Lang switcher */
  const LangSwitcher = () => (
    <div className="flex items-center gap-1.5">
      {(["fr", "en", "de", "it"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          onMouseMove={glassMove} onMouseEnter={glassEnter} onMouseLeave={glassLeave}
          className={`glass-card glass-card--sm text-[10px] font-['Geist',sans-serif] uppercase px-2 py-1 rounded-lg cursor-pointer ${
            lang === l
              ? "glass-card--active text-white font-medium"
              : "text-white/50"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          WEB LAYOUT — portfolio dev, scroll animations
          ═══════════════════════════════════════════════════════ */}
      <div className="print-hidden text-white font-['Geist',sans-serif]">
        <WaveBackground />

        {/* ── Sticky nav ── */}
        <nav className="sticky top-0 z-50 flex justify-between items-center px-6 sm:px-10 py-4 bg-black/60 backdrop-blur-md border-b border-white/[0.06]">
          <span className="text-[11px] font-mono text-white/20 tracking-widest">srl.dev</span>
          <div className="flex items-center gap-3">
            <LangSwitcher />
            <div className="w-px h-4 bg-white/15" />
            <button
              onClick={() => window.print()}
              className="glass-card glass-card--sm flex items-center gap-1.5 text-[10px] uppercase px-2.5 py-1.5 rounded-lg text-white/60 hover:text-white cursor-pointer"
              onMouseMove={glassMove} onMouseEnter={glassEnter} onMouseLeave={glassLeave}
            >
              <Printer className="h-3 w-3" />
              PDF
            </button>
          </div>
        </nav>

        {/* ── Hero ── */}
        <section className="min-h-[calc(100vh-57px)] flex flex-col">
          <div className="flex-1 flex items-center">
            <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 py-16">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-10 sm:gap-14">

                {/* Photo */}
                <div style={fadeIn(0)}>
                  <ProfilePic size="size-36 sm:size-44 md:size-52" />
                </div>

                {/* Text */}
                <div className="flex-1 text-center sm:text-left">
                  <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-medium leading-tight tracking-tight">
                    {displayedName}{cursor}
                  </h1>
                  <p className="text-base sm:text-lg text-white/45 mt-3" style={fadeIn(100)}>
                    {t.title}
                  </p>

                  {/* Language badges — above the fold, first thing a recruiter sees */}
                  <div className="flex flex-wrap gap-2 mt-4" style={fadeIn(180)}>
                    {langBadges.map(({ flag, label }, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.10] text-white/60"
                      >
                        <span>{flag}</span>
                        <span>{label[lang]}</span>
                      </span>
                    ))}
                  </div>

                  <p className="text-sm leading-relaxed mt-4 max-w-xl text-white/30" style={fadeIn(280)}>
                    {t.intro}
                  </p>

                  {/* CTA buttons */}
                  <div
                    className="mt-8 flex flex-wrap justify-center sm:justify-start gap-3"
                    style={fadeIn(400)}
                  >
                    <button
                      onClick={() => window.print()}
                      className="glass-card glass-card--primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white cursor-pointer"
                      onMouseMove={glassMove} onMouseEnter={glassEnter} onMouseLeave={glassLeave}
                    >
                      <Printer className="h-3.5 w-3.5" />
                      Download PDF
                    </button>
                    <a
                      href={`https://${t.contact.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-card flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm text-white/60 hover:text-white/90"
                      onMouseMove={glassMove} onMouseEnter={glassEnter} onMouseLeave={glassLeave}
                    >
                      <Linkedin className="h-3.5 w-3.5" />
                      LinkedIn
                    </a>
                    <a
                      href={`https://github.com/${t.contact.github.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-card flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm text-white/60 hover:text-white/90"
                      onMouseMove={glassMove} onMouseEnter={glassEnter} onMouseLeave={glassLeave}
                    >
                      <Github className="h-3.5 w-3.5" />
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="flex justify-center pb-3 -mt-6" style={fadeIn(600)}>
            <ChevronDown className="h-12 w-12 text-white/70 animate-bounce drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]" strokeWidth={1} />
          </div>
        </section>

        {/* ── Content sections ── */}
        <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 pb-32 space-y-28">

          {/* 01 — Contact */}
          <ScrollReveal>
            <SectionHead title={t.sections.contact} num="01" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(
                [
                  { Icon: MapPin, label: t.contact.location, href: undefined },
                  { Icon: Mail, label: t.contact.email, href: `mailto:${t.contact.email}` },
                  { Icon: Phone, label: t.contact.phone, href: `tel:${t.contact.phone}` },
                  { Icon: Linkedin, label: t.contact.linkedin, href: `https://${t.contact.linkedin}` },
                  { Icon: Github, label: t.contact.github, href: `https://github.com/${t.contact.github.replace("@", "")}` },
                  { Icon: Globe, label: t.contact.website, href: `https://${t.contact.website}` },
                ] as const
              ).map(({ Icon, label, href }, i) => {
                const cls =
                  "glass-card flex items-center gap-3 px-4 py-3 rounded-2xl text-sm text-white/55 hover:text-white/90 group";
                const inner = (
                  <>
                    <Icon className="h-3.5 w-3.5 shrink-0 text-white/25 group-hover:text-white/55 transition-colors" />
                    <span className="truncate">{label}</span>
                  </>
                );
                return href ? (
                  <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={cls}
                    onMouseMove={glassMove} onMouseEnter={glassEnter} onMouseLeave={glassLeave}>
                    {inner}
                  </a>
                ) : (
                  <div key={i} className={cls}
                    onMouseMove={glassMove} onMouseEnter={glassEnter} onMouseLeave={glassLeave}>
                    {inner}
                  </div>
                );
              })}
            </div>
          </ScrollReveal>

          {/* 02 — Experience (accordion) */}
          <div>
            <ScrollReveal>
              <SectionHead title={t.sections.experience} num="02" />
            </ScrollReveal>
            <div className="space-y-2">
              {t.experience.map((exp, i) => {
                const isOpen = openExp.has(i);
                return (
                  <ScrollReveal key={i} delay={i * 60}>
                    <div className="glass-card rounded-2xl overflow-hidden"
                      onMouseMove={glassMove} onMouseEnter={glassEnter} onMouseLeave={glassLeave}>
                      {/* Header — always visible */}
                      <button
                        className="w-full flex items-center justify-between px-5 py-4 cursor-pointer transition-colors text-left"
                        onClick={() => toggleExp(i)}
                      >
                        <div>
                          <p className="text-base font-medium">{exp.company}</p>
                          <p className="text-[11px] font-mono text-white/30 mt-0.5">{exp.date}</p>
                        </div>
                        <ChevronDown
                          className="h-4 w-4 text-white/25 shrink-0 ml-4 transition-transform duration-300"
                          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                        />
                      </button>
                      {/* Body — collapses */}
                      <div
                        style={{
                          maxHeight: isOpen ? "200px" : "0px",
                          opacity: isOpen ? 1 : 0,
                          transition: "max-height 0.3s ease, opacity 0.25s ease",
                          overflow: "hidden",
                        }}
                      >
                        <p className="px-5 pb-4 text-sm text-white/45 leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          {/* 03 — Featured Project */}
          <ScrollReveal>
            <SectionHead title={t.sections.projects} num="03" />
            <div
              className="glass-card rounded-2xl p-6"
              onMouseMove={glassMove} onMouseEnter={glassEnter} onMouseLeave={glassLeave}
            >
              {/* Header row */}
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="min-w-0">
                  <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                    <h3 className="text-lg font-semibold">{ordineAIProject.name}</h3>
                    <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                      {ordineAIProject.status[lang]}
                    </span>
                  </div>
                  <p className="text-sm text-white/40">{ordineAIProject.tagline[lang]}</p>
                </div>
                <a
                  href={ordineAIProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card glass-card--sm flex items-center gap-1.5 text-[10px] uppercase px-2.5 py-1.5 rounded-lg text-white/55 hover:text-white cursor-pointer shrink-0"
                  onMouseMove={glassMove} onMouseEnter={glassEnter} onMouseLeave={glassLeave}
                >
                  <ExternalLink className="h-3 w-3" />
                  ordine-ai.ch
                </a>
              </div>

              {/* Highlights */}
              <ul className="space-y-2.5 mb-5">
                {ordineAIProject.highlights[lang].map((h, i) => (
                  <li key={i} className="flex gap-3 text-sm text-white/50 leading-relaxed">
                    <span className="text-white/15 shrink-0 select-none mt-[3px]">—</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {/* Tech stack pills */}
              <div className="pt-4 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                {ordineAIProject.stack.map((tech, i) => (
                  <span
                    key={i}
                    className="text-[9px] px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/10 text-white/45 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* 04 — Skills (dots) */}
          <ScrollReveal>
            <SectionHead title={t.sections.skills} num="04" />
            <SkillSection groups={skillGroups} lang={lang} />
          </ScrollReveal>

          {/* 05 — Languages (dots) */}
          <ScrollReveal>
            <SectionHead title={t.sections.languages} num="05" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {t.languages.map((language, i) => (
                <div
                  key={i}
                  className="glass-card px-4 py-4 rounded-2xl"
                  onMouseMove={glassMove} onMouseEnter={glassEnter} onMouseLeave={glassLeave}
                >
                  <p className="text-sm font-medium mb-2.5">{language.name}</p>
                  <SkillDots filled={getLangDots(language.level)} color="rgba(255,255,255,0.55)" />
                  <p className="text-[10px] text-white/30 mt-2">{language.level}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* 05 — Education */}
          <div>
            <ScrollReveal>
              <SectionHead title={t.sections.education} num="06" />
            </ScrollReveal>
            <div className="border-l border-white/10 pl-6 space-y-7">
              {t.education.map((edu, i) => (
                <ScrollReveal key={i} delay={i * 100}>
                  <div className="relative">
                    <div className="absolute -left-[27px] top-[7px] w-[5px] h-[5px] rounded-full bg-white/25" />
                    <p className="text-[11px] font-mono text-white/25 mb-1">{edu.date}</p>
                    <p className="text-sm font-medium">{edu.institution}</p>
                    <p className="text-sm text-white/40 mt-1 leading-relaxed">{edu.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          PRINT LAYOUT — A4 portrait, flex-based, monochrome
          ═══════════════════════════════════════════════════════ */}
      <div className="print-only">
        <div
          data-name="Main Component - Name - CV"
          style={{
            width: "100%",
            height: "297mm",
            maxHeight: "297mm",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            background: "white",
            fontFamily: "'Geist', sans-serif",
            color: "#111",
          }}
        >

          {/* ── HEADER ── dark strip with photo + name + contact ── */}
          <div style={{
            background: "#141414",
            padding: "9mm 14mm",
            display: "flex",
            alignItems: "center",
            gap: "9mm",
            flexShrink: 0,
          }}>
            {/* Photo */}
            <div style={{
              width: "22mm",
              height: "22mm",
              borderRadius: "3.5mm",
              overflow: "hidden",
              flexShrink: 0,
              border: "0.4px solid rgba(255,255,255,0.18)",
            }}>
              <img
                src={profilePic}
                alt={FULL_NAME}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* Name + title */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                fontSize: "19pt",
                fontWeight: 600,
                color: "white",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                margin: 0,
              }}>
                {FULL_NAME}
              </p>
              <p style={{
                fontSize: "7.5pt",
                color: "rgba(255,255,255,0.45)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                margin: "2mm 0 0",
              }}>
                {t.title}
              </p>
              <p style={{
                fontSize: "7pt",
                color: "rgba(255,255,255,0.55)",
                margin: "2mm 0 0",
                letterSpacing: "0.04em",
              }}>
                {langBadges.map(({ flag, label }) => `${flag} ${label[lang]}`).join("  ·  ")}
              </p>
            </div>

            {/* Contact details — right-aligned column */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.6mm",
              fontSize: "6.5pt",
              color: "rgba(255,255,255,0.55)",
              textAlign: "right",
              flexShrink: 0,
              lineHeight: 1.3,
            }}>
              <span style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "2mm" }}>
                <MapPin style={{ width: "2.8mm", height: "2.8mm", opacity: 0.5 }} />
                {t.contact.location}
              </span>
              <span style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "2mm" }}>
                <Mail style={{ width: "2.8mm", height: "2.8mm", opacity: 0.5 }} />
                {t.contact.email}
              </span>
              <span style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "2mm" }}>
                <Phone style={{ width: "2.8mm", height: "2.8mm", opacity: 0.5 }} />
                {t.contact.phone}
              </span>
              <span style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "2mm" }}>
                <Linkedin style={{ width: "2.8mm", height: "2.8mm", opacity: 0.5 }} />
                {t.contact.linkedin}
              </span>
              <span style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "2mm" }}>
                <Github style={{ width: "2.8mm", height: "2.8mm", opacity: 0.5 }} />
                {t.contact.github}
              </span>
              <span style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "2mm" }}>
                <Globe style={{ width: "2.8mm", height: "2.8mm", opacity: 0.5 }} />
                {t.contact.website}
              </span>
              <span style={{ justifyContent: "flex-end", marginTop: "0.5mm" }}>
                {t.contact.dob} · {t.contact.nationality}
              </span>
              <span style={{ justifyContent: "flex-end" }}>
                {t.contact.mobility}
              </span>
            </div>
          </div>

          {/* ── INTRO STRIP ── light gray band ── */}
          <div style={{
            background: "#f2f2f2",
            padding: "4.5mm 14mm",
            borderBottom: "0.5px solid #d8d8d8",
            flexShrink: 0,
          }}>
            <p style={{
              fontSize: "7.5pt",
              color: "#444",
              lineHeight: 1.58,
              margin: 0,
            }}>
              {t.intro}
            </p>
          </div>

          {/* ── BODY — two-column flex ── */}
          <div style={{ flex: 1, minHeight: 0, display: "flex", overflow: "hidden" }}>

            {/* LEFT COLUMN — Experience + Education */}
            <div style={{
              flex: 1,
              padding: "8mm 9mm 8mm 14mm",
              borderRight: "0.5px solid #e2e2e2",
              display: "flex",
              flexDirection: "column",
              gap: "8mm",
              overflow: "hidden",
            }}>

              {/* ── Section: Experience ── */}
              <div>
                {/* Section label + rule */}
                <div style={{ display: "flex", alignItems: "center", gap: "3mm", marginBottom: "5mm" }}>
                  <p style={{
                    fontSize: "5.5pt",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#999",
                    margin: 0,
                    flexShrink: 0,
                    whiteSpace: "nowrap",
                  }}>
                    {t.sections.experience}
                  </p>
                  <div style={{ flex: 1, height: "0.5px", background: "#ddd" }} />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "5.5mm" }}>
                  {t.experience.map((exp, i) => (
                    <div key={i}>
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        marginBottom: "1mm",
                      }}>
                        <p style={{ fontSize: "8.5pt", fontWeight: 600, color: "#111", margin: 0 }}>
                          {exp.company}
                        </p>
                        <p style={{
                          fontSize: "6pt",
                          color: "#999",
                          margin: "0 0 0 3mm",
                          flexShrink: 0,
                          fontVariantNumeric: "tabular-nums",
                        }}>
                          {exp.date}
                        </p>
                      </div>
                      <p style={{ fontSize: "7pt", color: "#555", lineHeight: 1.5, margin: 0 }}>
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Section: Education ── */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "3mm", marginBottom: "5mm" }}>
                  <p style={{
                    fontSize: "5.5pt",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#999",
                    margin: 0,
                    flexShrink: 0,
                    whiteSpace: "nowrap",
                  }}>
                    {t.sections.education}
                  </p>
                  <div style={{ flex: 1, height: "0.5px", background: "#ddd" }} />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "5.5mm" }}>
                  {t.education.map((edu, i) => (
                    <div key={i}>
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        marginBottom: "1mm",
                      }}>
                        <p style={{ fontSize: "8.5pt", fontWeight: 600, color: "#111", margin: 0 }}>
                          {edu.institution}
                        </p>
                        <p style={{
                          fontSize: "6pt",
                          color: "#999",
                          margin: "0 0 0 3mm",
                          flexShrink: 0,
                        }}>
                          {edu.date}
                        </p>
                      </div>
                      <p style={{ fontSize: "7pt", color: "#555", lineHeight: 1.5, margin: 0 }}>
                        {edu.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN — Skills + Languages */}
            <div style={{
              width: "72mm",
              flexShrink: 0,
              alignSelf: "stretch",
              padding: "7mm 14mm 7mm 9mm",
              background: "#f8f8f8",
              display: "flex",
              flexDirection: "column",
              gap: "5mm",
              overflow: "hidden",
              breakInside: "avoid",
              pageBreakInside: "avoid",
            }}>

              {/* ── Section: Skills ── */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "3mm", marginBottom: "5mm" }}>
                  <p style={{
                    fontSize: "5.5pt",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#999",
                    margin: 0,
                    flexShrink: 0,
                  }}>
                    {t.sections.skills}
                  </p>
                  <div style={{ flex: 1, height: "0.5px", background: "#ddd" }} />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "3.5mm" }}>
                  {skillGroups.map((group, gi) => (
                    <div key={gi}>
                      <p style={{
                        fontSize: "5pt",
                        fontWeight: 700,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: group.color,
                        margin: "0 0 2mm 0",
                      }}>
                        {group.category[lang]}
                      </p>
                      <p style={{ fontSize: "6.5pt", color: "#666", margin: "0 0 2mm 0", lineHeight: 1.5 }}>
                        {group.items.map(s => s.name).join(" · ")}
                      </p>
                      <SkillDots
                        filled={Math.round(
                          group.items.reduce((sum, s) => sum + Math.round(s.level / 10) / 2, 0) /
                          group.items.length * 2
                        ) / 2}
                        color={group.color}
                        emptyColor="#dedede"
                        size={5}
                        gap={3}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Section: Languages ── */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "3mm", marginBottom: "5mm" }}>
                  <p style={{
                    fontSize: "5.5pt",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#999",
                    margin: 0,
                    flexShrink: 0,
                  }}>
                    {t.sections.languages}
                  </p>
                  <div style={{ flex: 1, height: "0.5px", background: "#ddd" }} />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "3mm" }}>
                  {t.languages.map((language, i) => (
                    <div key={i} style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}>
                      <div>
                        <p style={{ fontSize: "8pt", fontWeight: 500, color: "#222", margin: 0, lineHeight: 1.2 }}>
                          {language.name}
                        </p>
                        <p style={{ fontSize: "6pt", color: "#aaa", margin: 0, lineHeight: 1.3 }}>
                          {language.level}
                        </p>
                      </div>
                      <SkillDots
                        filled={getLangDots(language.level)}
                        color="#2a2a2a"
                        emptyColor="#dedede"
                        size={5}
                        gap={3}
                      />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
