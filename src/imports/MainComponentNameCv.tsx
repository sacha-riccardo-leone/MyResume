import { useState, useEffect, useRef } from "react";
import { Linkedin, Github, Printer, MapPin, Mail, Phone, ChevronDown, ExternalLink, Globe } from "lucide-react";
import profilePic from "../assets/pfplinkedin-removebg-preview.png";
import r2jcLogo from "../assets/r2jcLogo.png";
import xefiLogo from "../assets/xefilogo.png";
import sourShotsLogo from "../assets/sourshotslogo.jpg";
import cpneLogo from "../assets/cpnelogo.png";
import OrbMini from "./OrbMini";

type Lang = "fr" | "en" | "de" | "it";
type Phase = "cursor" | "typing" | "done";

const FULL_NAME = "Sacha Riccardo LEONE";

const translations = {
  fr: {
    title: "Développeur d'applications",
    downloadPdf: "Télécharger le CV",
    intro:
      "Développeur d'applications autonome, je transforme des besoins réels en logiciels livrés en production, du frontend à l'infrastructure. J'ai déjà mis mes compétences en pratique sur des mandats clients et mes propres projets, et je recherche en continu de nouveaux défis pour progresser. Initiative, persévérance, curiosité et maîtrise des outils actuels — l'IA en particulier — sont au cœur de ma façon de travailler.",
    availability:
      "À la recherche d'une opportunité de développeur d'applications, disponible dès mi-septembre 2026 pour un taux d'activité de 100 %.",
    printCta:
      "Meilleure expérience, projets détaillés et démos sur la version en ligne",
    sections: {
      contact: "Contact",
      about: "À propos",
      experience: "Expérience",
      mandates: "Mandats professionnels",
      entrepreneurship: "Projets & entrepreneuriat",
      projects: "Projets personnels",
      languages: "Langues",
      skills: "Compétences techniques",
      education: "Formations / Diplômes",
      certifications: "Certifications en cours",
      personalSkills: "Compétences personnelles",
      references: "Références",
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
      mobility: "Mobilité nationale",
    },
    experience: [
      {
        date: "Mai 2026",
        company: "Magneticlab - XEFI Neuchâtel",
        role: "Développeur — mandat freelance",
        url: "https://www.xefi.ch/fr/agence/xefi-neuchatel/",
        bullets: [
          "Addon Odoo 19 Enterprise (pixieset_sync) + extension Chrome/Firefox pour un studio photo suisse.",
          "Synchronisation automatique Pixieset → Odoo (contacts, projets, sessions), cron quotidien, secrets masqués.",
          "Réalisé seul, 4 batches livrés en 18 jours, déployé sur Odoo.sh — cliente satisfaite.",
        ],
        stack: "Python 3.12 · pydantic v2 · pytest · Manifest V3",
      },
      {
        date: "Juin – Août 2026",
        company: "R2JC",
        role: "Développeur web — mandat client",
        url: "https://r2jc.ch",
        demo: "https://r2jc.vercel.app",
        bullets: [
          "Refonte complète (design + technique) du site vitrine bilingue FR/EN d'un collectif de mode, livrée en production en 6 semaines sur un site déjà public et édité en parallèle par le client.",
          "Analyse de l'existant et architecture hybride sur mesure contournant les limites d'Elementor gratuit : rendu conforme à la maquette au pixel, chaque texte restant éditable par le client.",
          "Automatisation du travail de l'équipe : éditions annuelles auto-générées, gestionnaire de logos, formulaires sécurisés (REST, HMAC, anti-spam) et extension PHP détectant les traductions rompues.",
          "Optimisation des performances sans compromis visuel : poids des images divisé par 3 à 6, temps de réponse serveur réduit des deux tiers (≈ 320 → 110 ms), zéro régression.",
          "Coordination continue avec l'équipe (clarification des besoins, suivi, ajustements) et documentation complète : le collectif maintient désormais le site sans développeur.",
        ],
        stack: "WordPress · PHP · API REST · JavaScript · CSS moderne",
      },
      {
        date: "2025 — en cours",
        company: "Ordine AI",
        role: "Fondateur & développeur",
        url: "https://www.ordine-ai.ch/",
        bullets: [
          "Client email IA multi-fournisseurs pour PME suisses, conçu et livré seul — en beta active.",
          "Pipeline de classification Claude Haiku (harness CI FR/DE/IT/EN : 100/94/96/98 %) et conformité FADP (résidence CH/EU, chiffrement AES-GCM-256, DLP PII suisse).",
          "Facturation Stripe à 4 niveaux et audit de sécurité antagoniste auto-mené (5 agents LLM, 30+ problèmes corrigés).",
        ],
        stack: "FastAPI · Next.js · TypeScript · Supabase · Claude API · Stripe · Cloud Run",
      },
      {
        date: "Avril 2025 – Juin 2025",
        company: "CPNE-TI – TPI",
        role: "Travail personnel de fin de formation (TPI)",
        url: "https://github.com/sacha-riccardo-leone/GuessWho",
        bullets: [
          "Version numérisée du jeu « Qui est-ce ? » développée en C#/Raylib.",
          "Algorithme de génération de personnages uniques par comparaison de profils ADN + système de rareté vestimentaire.",
          "Note : 5,5/6.",
        ],
        stack: "C# · Raylib",
      },
      {
        date: "2023 – présent",
        company: "SourShots",
        role: "Création de contenus visuels",
        url: "https://www.instagram.com/thesourshots",
        bullets: [
          "Contribution créative pour un groupe local sur 3 ans : photos et démos visuelles pour posts et annonces.",
        ],
        stack: "Krita",
      },
    ],
    languages: [
      { name: "Français", level: "Maternelle" },
      { name: "Italien", level: "Maternelle" },
      { name: "Anglais", level: "C1" },
      { name: "Allemand", level: "B2" },
    ],
    softSkills: ["Autonomie", "Esprit d'initiative", "Rigueur & souci du détail", "Orienté solutions", "Persévérance", "Curiosité / apprentissage rapide", "Esprit d'équipe", "Réceptif", "Innovant / créatif"],
    referencesLine: "Références disponibles sur demande.",
    education: [
      {
        date: "2022–2025",
        institution: "CFC Informaticien, développement d'applications & Maturité professionnelle",
        description: "CPNE-TI – Neuchâtel",
      },
      {
        date: "2020–2021",
        institution: "Certificat d'immersion linguistique en allemand",
        description: "Établissement scolaire à Erlach – Berne",
      },
      {
        date: "2018–2022",
        institution: "Diplôme cantonal neuchâtelois — PRIMA bilingue FR/DE",
        description: "Le Landeron – Neuchâtel",
      },
    ],
  },
  en: {
    title: "Application Developer",
    downloadPdf: "Download PDF",
    intro:
      "An autonomous application developer, I turn real needs into software delivered to production, from frontend to infrastructure. I've already put my skills to work on client mandates and my own projects, and I'm continually looking for new challenges to grow. Initiative, persistence, curiosity and command of today's tools — AI in particular — are at the core of how I work.",
    availability:
      "Looking for an application-developer role, available from mid-September 2026 at a 100% workload.",
    printCta:
      "Best experience, detailed projects and live demos on the online version",
    sections: {
      contact: "Contact",
      about: "About",
      experience: "Experience",
      mandates: "Professional Mandates",
      entrepreneurship: "Projects & Entrepreneurship",
      projects: "Personal Projects",
      languages: "Languages",
      skills: "Technical Skills",
      education: "Education",
      certifications: "Certifications in progress",
      personalSkills: "Personal Skills",
      references: "References",
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
      mobility: "Nationwide mobility",
    },
    experience: [
      {
        date: "May 2026",
        company: "Magneticlab - XEFI Neuchâtel",
        role: "Developer — freelance mandate",
        url: "https://www.xefi.ch/fr/agence/xefi-neuchatel/",
        bullets: [
          "Odoo 19 Enterprise addon (pixieset_sync) + Chrome/Firefox extension for a Swiss photography studio.",
          "Automated Pixieset → Odoo sync (contacts, projects, sessions), daily cron, masked secrets.",
          "Delivered solo, 4 batches in 18 days, live on Odoo.sh — client satisfied.",
        ],
        stack: "Python 3.12 · pydantic v2 · pytest · Manifest V3",
      },
      {
        date: "June – August 2026",
        company: "R2JC",
        role: "Web developer — client mandate",
        url: "https://r2jc.ch",
        demo: "https://r2jc.vercel.app",
        bullets: [
          "Full redesign (design + engineering) of a fashion collective's bilingual FR/EN showcase site, taken to production in 6 weeks on an already-live site edited in parallel by the client.",
          "Audit of the existing site and a bespoke hybrid architecture working around free-Elementor limits: pixel-perfect design while keeping every text client-editable.",
          "Automated the team's workflow: auto-generated annual editions, a logo manager, secure forms (REST, HMAC, anti-spam) and a PHP plugin that detects broken translations.",
          "Performance optimization with no visual compromise: image weight cut 3–6×, server response time down by two-thirds (≈ 320 → 110 ms), zero regressions.",
          "Ongoing coordination with the team (clarifying needs, follow-up, adjustments) and full documentation: the collective now maintains the site without a developer.",
        ],
        stack: "WordPress · PHP · REST API · JavaScript · modern CSS",
      },
      {
        date: "2025 — in progress",
        company: "Ordine AI",
        role: "Founder & developer",
        url: "https://www.ordine-ai.ch/",
        bullets: [
          "AI multi-provider email client for Swiss SMEs, designed and shipped solo — in active beta.",
          "Claude Haiku classification pipeline (CI harness FR/DE/IT/EN: 100/94/96/98%) and FADP compliance (Swiss/EU residency, AES-GCM-256 encryption, Swiss PII DLP).",
          "4-tier Stripe billing and a self-run adversarial security audit (5 LLM agents, 30+ findings resolved).",
        ],
        stack: "FastAPI · Next.js · TypeScript · Supabase · Claude API · Stripe · Cloud Run",
      },
      {
        date: "April 2025 – June 2025",
        company: "CPNE-TI – Final Project",
        role: "Final training project (TPI)",
        url: "https://github.com/sacha-riccardo-leone/GuessWho",
        bullets: [
          "Digitized version of \"Guess Who?\" built in C#/Raylib.",
          "Unique character generation algorithm via DNA-profile comparison + a clothing rarity system.",
          "Grade: 5.5/6.",
        ],
        stack: "C# · Raylib",
      },
      {
        date: "2023 – present",
        company: "SourShots",
        role: "Visual content creation",
        url: "https://www.instagram.com/thesourshots",
        bullets: [
          "Creative contribution to a local band over 3 years: photos and visual demos for posts and announcements.",
        ],
        stack: "Krita",
      },
    ],
    languages: [
      { name: "French", level: "Native" },
      { name: "Italian", level: "Native" },
      { name: "English", level: "C1" },
      { name: "German", level: "B2" },
    ],
    softSkills: ["Autonomy", "Initiative", "Rigor & attention to detail", "Solution-oriented", "Persistence", "Curiosity / fast learner", "Team player", "Receptive", "Innovative / creative"],
    referencesLine: "References available on request.",
    education: [
      {
        date: "2022–2025",
        institution: "Federal VET Diploma (CFC) in Application Development & Professional Baccalaureate",
        description: "CPNE-TI – Neuchâtel",
      },
      {
        date: "2020–2021",
        institution: "German language immersion certificate",
        description: "School in Erlach – Bern",
      },
      {
        date: "2018–2022",
        institution: "Neuchâtel cantonal diploma — PRIMA bilingual (FR/DE)",
        description: "Le Landeron – Neuchâtel",
      },
    ],
  },
  de: {
    title: "Applikationsentwickler",
    downloadPdf: "PDF herunterladen",
    intro:
      "Als eigenständiger Applikationsentwickler verwandle ich echte Bedürfnisse in Software, die in Produktion geht — vom Frontend bis zur Infrastruktur. Meine Fähigkeiten habe ich bereits in Kundenmandaten und eigenen Projekten eingesetzt und suche fortlaufend neue Herausforderungen, um mich weiterzuentwickeln. Initiative, Ausdauer, Neugier und der sichere Umgang mit aktuellen Tools — insbesondere KI — prägen meine Arbeitsweise.",
    availability:
      "Auf der Suche nach einer Stelle als Applikationsentwickler, verfügbar ab Mitte September 2026 zu einem Pensum von 100 %.",
    printCta:
      "Beste Erfahrung, detaillierte Projekte und Live-Demos in der Online-Version",
    sections: {
      contact: "Kontakt",
      about: "Über mich",
      experience: "Erfahrung",
      mandates: "Berufliche Mandate",
      entrepreneurship: "Projekte & Unternehmertum",
      projects: "Persönliche Projekte",
      languages: "Sprachen",
      skills: "Technische Kompetenzen",
      education: "Ausbildung",
      certifications: "Zertifizierungen in Arbeit",
      personalSkills: "Persönliche Kompetenzen",
      references: "Referenzen",
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
      mobility: "Schweizweite Mobilität",
    },
    experience: [
      {
        date: "Mai 2026",
        company: "Magneticlab - XEFI Neuchâtel",
        role: "Entwickler — Freelance-Mandat",
        url: "https://www.xefi.ch/fr/agence/xefi-neuchatel/",
        bullets: [
          "Odoo-19-Enterprise-Addon (pixieset_sync) + Chrome/Firefox-Erweiterung für ein Schweizer Fotostudio.",
          "Automatische Pixieset → Odoo-Synchronisation (Kontakte, Projekte, Sessions), Tages-Cron, maskierte Secrets.",
          "Alleine realisiert, 4 Batches in 18 Tagen geliefert, live auf Odoo.sh — Kundin zufrieden.",
        ],
        stack: "Python 3.12 · pydantic v2 · pytest · Manifest V3",
      },
      {
        date: "Juni – August 2026",
        company: "R2JC",
        role: "Webentwickler — Kundenmandat",
        url: "https://r2jc.ch",
        demo: "https://r2jc.vercel.app",
        bullets: [
          "Komplettes Redesign (Design + Technik) der zweisprachigen FR/EN-Website eines Mode-Kollektivs, in 6 Wochen live gebracht — auf einer bereits öffentlichen, parallel vom Kunden bearbeiteten Website.",
          "Analyse des Bestands und massgeschneiderte hybride Architektur trotz der Grenzen des kostenlosen Elementor: pixelgenaues Design, jeder Text bleibt kundenseitig editierbar.",
          "Automatisierung der Teamarbeit: automatisch generierte Jahres-Editionen, Logo-Verwaltung, gesicherte Formulare (REST, HMAC, Anti-Spam) und ein PHP-Plugin, das defekte Übersetzungen erkennt.",
          "Performance-Optimierung ohne visuelle Abstriche: Bildgewicht um das 3- bis 6-Fache reduziert, Server-Antwortzeit um zwei Drittel gesenkt (≈ 320 → 110 ms), null Regressionen.",
          "Laufende Abstimmung mit dem Team (Bedarfsklärung, Nachverfolgung, Anpassungen) und vollständige Dokumentation: Das Kollektiv pflegt die Website nun ohne Entwickler.",
        ],
        stack: "WordPress · PHP · REST-API · JavaScript · modernes CSS",
      },
      {
        date: "2025 — laufend",
        company: "Ordine AI",
        role: "Gründer & Entwickler",
        url: "https://www.ordine-ai.ch/",
        bullets: [
          "KI-Multi-Provider-E-Mail-Client für Schweizer KMU, allein konzipiert und geliefert — in aktiver Beta.",
          "Claude-Haiku-Klassifizierungspipeline (CI-Harness FR/DE/IT/EN: 100/94/96/98 %) und FADP-Konformität (CH/EU-Datenwohnsitz, AES-GCM-256-Verschlüsselung, Schweizer PII-DLP).",
          "Stripe-Abrechnung mit 4 Stufen und ein selbst durchgeführtes adversariales Sicherheitsaudit (5 LLM-Agenten, 30+ behobene Findings).",
        ],
        stack: "FastAPI · Next.js · TypeScript · Supabase · Claude API · Stripe · Cloud Run",
      },
      {
        date: "April 2025 – Juni 2025",
        company: "CPNE-TI – IPA",
        role: "Individuelle praktische Arbeit (IPA)",
        url: "https://github.com/sacha-riccardo-leone/GuessWho",
        bullets: [
          "Digitalisierte Version von \"Wer bin ich?\" in C#/Raylib entwickelt.",
          "Algorithmus zur einzigartigen Charaktergenerierung per DNS-Profilvergleich + Seltenheitssystem für Kleidung.",
          "Note: 5,5/6.",
        ],
        stack: "C# · Raylib",
      },
      {
        date: "2023 – heute",
        company: "SourShots",
        role: "Visuelle Content-Erstellung",
        url: "https://www.instagram.com/thesourshots",
        bullets: [
          "Kreativer Beitrag für eine lokale Band über 3 Jahre: Fotos und visuelle Demos für Posts und Ankündigungen.",
        ],
        stack: "Krita",
      },
    ],
    languages: [
      { name: "Französisch", level: "Muttersprache" },
      { name: "Italienisch", level: "Muttersprache" },
      { name: "Englisch", level: "C1" },
      { name: "Deutsch", level: "B2" },
    ],
    softSkills: ["Eigenständigkeit", "Eigeninitiative", "Sorgfalt & Detailgenauigkeit", "Lösungsorientiert", "Ausdauer", "Neugier / schnelle Auffassung", "Teamgeist", "Aufgeschlossen", "Innovativ / kreativ"],
    referencesLine: "Referenzen auf Anfrage verfügbar.",
    education: [
      {
        date: "2022–2025",
        institution: "EFZ Informatiker Applikationsentwicklung & Berufsmaturität",
        description: "CPNE-TI – Neuenburg",
      },
      {
        date: "2020–2021",
        institution: "Zertifikat Sprachimmersion Deutsch",
        description: "Schule in Erlach – Bern",
      },
      {
        date: "2018–2022",
        institution: "Kantonales Diplom Neuenburg — PRIMA zweisprachig (FR/DE)",
        description: "Le Landeron – Neuenburg",
      },
    ],
  },
  it: {
    title: "Sviluppatore di applicazioni",
    downloadPdf: "Scarica il CV",
    intro:
      "Sviluppatore di applicazioni autonomo, trasformo bisogni reali in software portato in produzione, dal frontend all'infrastruttura. Ho già messo in pratica le mie competenze su mandati per clienti e progetti personali, e cerco di continuo nuove sfide per crescere. Iniziativa, perseveranza, curiosità e padronanza degli strumenti attuali — l'IA in particolare — sono al centro del mio modo di lavorare.",
    availability:
      "In cerca di un'opportunità come sviluppatore di applicazioni, disponibile da metà settembre 2026 con un tasso di attività del 100%.",
    printCta:
      "Esperienza migliore, progetti dettagliati e demo sulla versione online",
    sections: {
      contact: "Contatto",
      about: "Chi sono",
      experience: "Esperienza",
      mandates: "Mandati professionali",
      entrepreneurship: "Progetti & imprenditoria",
      projects: "Progetti personali",
      languages: "Lingue",
      skills: "Competenze tecniche",
      education: "Formazione",
      certifications: "Certificazioni in corso",
      personalSkills: "Competenze personali",
      references: "Referenze",
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
      mobility: "Mobilità nazionale",
    },
    experience: [
      {
        date: "Maggio 2026",
        company: "Magneticlab - XEFI Neuchâtel",
        role: "Sviluppatore — mandato freelance",
        url: "https://www.xefi.ch/fr/agence/xefi-neuchatel/",
        bullets: [
          "Addon Odoo 19 Enterprise (pixieset_sync) + estensione Chrome/Firefox per uno studio fotografico svizzero.",
          "Sincronizzazione automatica Pixieset → Odoo (contatti, progetti, sessioni), cron giornaliero, segreti mascherati.",
          "Realizzato in autonomia, 4 batch consegnati in 18 giorni, live su Odoo.sh — cliente soddisfatta.",
        ],
        stack: "Python 3.12 · pydantic v2 · pytest · Manifest V3",
      },
      {
        date: "Giugno – Agosto 2026",
        company: "R2JC",
        role: "Sviluppatore web — mandato cliente",
        url: "https://r2jc.ch",
        demo: "https://r2jc.vercel.app",
        bullets: [
          "Rifacimento completo (design + tecnica) del sito vetrina bilingue FR/EN di un collettivo di moda, portato in produzione in 6 settimane su un sito già pubblico e modificato in parallelo dal cliente.",
          "Analisi dell'esistente e architettura ibrida su misura aggirando i limiti di Elementor gratuito: resa conforme al mockup al pixel, ogni testo resta modificabile dal cliente.",
          "Automazione del lavoro del team: edizioni annuali autogenerate, gestore dei loghi, moduli sicuri (REST, HMAC, anti-spam) ed estensione PHP che rileva le traduzioni interrotte.",
          "Ottimizzazione delle performance senza compromessi visivi: peso delle immagini ridotto di 3–6 volte, tempo di risposta del server ridotto di due terzi (≈ 320 → 110 ms), zero regressioni.",
          "Coordinamento continuo con il team (chiarimento dei bisogni, follow-up, aggiustamenti) e documentazione completa: il collettivo ora mantiene il sito senza sviluppatore.",
        ],
        stack: "WordPress · PHP · API REST · JavaScript · CSS moderno",
      },
      {
        date: "2025 — in corso",
        company: "Ordine AI",
        role: "Fondatore & sviluppatore",
        url: "https://www.ordine-ai.ch/",
        bullets: [
          "Client email IA multi-provider per PMI svizzere, progettato e consegnato in autonomia — in beta attiva.",
          "Pipeline di classificazione Claude Haiku (CI harness FR/DE/IT/EN: 100/94/96/98%) e conformità FADP (residenza CH/EU, cifratura AES-GCM-256, DLP PII svizzero).",
          "Fatturazione Stripe a 4 livelli e audit di sicurezza avversariale auto-condotto (5 agenti LLM, 30+ problemi corretti).",
        ],
        stack: "FastAPI · Next.js · TypeScript · Supabase · Claude API · Stripe · Cloud Run",
      },
      {
        date: "Aprile 2025 – Giugno 2025",
        company: "CPNE-TI – LPI",
        role: "Lavoro pratico individuale (LPI)",
        url: "https://github.com/sacha-riccardo-leone/GuessWho",
        bullets: [
          "Versione digitale del gioco «Indovina chi?» sviluppata in C#/Raylib.",
          "Algoritmo di generazione di personaggi unici tramite confronto di profili DNA + sistema di rarità dell'abbigliamento.",
          "Voto: 5,5/6.",
        ],
        stack: "C# · Raylib",
      },
      {
        date: "2023 – presente",
        company: "SourShots",
        role: "Creazione di contenuti visivi",
        url: "https://www.instagram.com/thesourshots",
        bullets: [
          "Contributo creativo per un gruppo locale su 3 anni: foto e demo visive per post e annunci.",
        ],
        stack: "Krita",
      },
    ],
    languages: [
      { name: "Francese", level: "Madrelingua" },
      { name: "Italiano", level: "Madrelingua" },
      { name: "Inglese", level: "C1" },
      { name: "Tedesco", level: "B2" },
    ],
    softSkills: ["Autonomia", "Spirito d'iniziativa", "Rigore & attenzione ai dettagli", "Orientato alle soluzioni", "Perseveranza", "Curiosità / apprendimento rapido", "Spirito di squadra", "Ricettivo", "Innovativo / creativo"],
    referencesLine: "Referenze disponibili su richiesta.",
    education: [
      {
        date: "2022–2025",
        institution: "AFC Informatico, sviluppo di applicazioni & Maturità professionale",
        description: "CPNE-TI – Neuchâtel",
      },
      {
        date: "2020–2021",
        institution: "Certificato di immersione linguistica in tedesco",
        description: "Istituto a Erlach – Berna",
      },
      {
        date: "2018–2022",
        institution: "Diploma cantonale di Neuchâtel — PRIMA bilingue (FR/DE)",
        description: "Le Landeron – Neuchâtel",
      },
    ],
  },
};

const skillGroups: { category: Record<Lang, string>; color: string; items: string[] | Record<Lang, string[]> }[] = [
  {
    category: { fr: "IA / LLM", en: "AI / LLM", de: "KI / LLM", it: "IA / LLM" },
    color: "#22d3ee",
    items: ["Claude", "Claude Code", "ChatGPT", "Prompt engineering"],
  },
  {
    category: { fr: "Langages", en: "Languages", de: "Sprachen", it: "Linguaggi" },
    color: "#34d399",
    items: ["HTML", "CSS", "PHP", "C#", "SQL/NoSQL"],
  },
  {
    category: { fr: "Logiciels", en: "Software", de: "Software", it: "Software" },
    color: "#60a5fa",
    items: ["Vercel", "GitHub/Git", "Microsoft 365", "VS/VS Code", "WordPress", "Krita", "DaVinci Resolve"],
  },
  {
    category: { fr: "Disciplines", en: "Disciplines", de: "Disziplinen", it: "Discipline" },
    color: "#a78bfa",
    items: {
      fr: ["POO (programmation orientée objet)", "UI/UX", "Intégration d'API", "Débogage & tests", "Maintenance hardware/software", "Web design", "Gestion de projet (solo)"],
      en: ["OOP (object-oriented programming)", "UI/UX", "API integration", "Debugging & testing", "Hardware/software maintenance", "Web design", "Project management (solo)"],
      de: ["OOP (objektorientierte Programmierung)", "UI/UX", "API-Integration", "Debugging & Tests", "Hardware-/Software-Wartung", "Web design", "Projektmanagement (solo)"],
      it: ["OOP (programmazione orientata agli oggetti)", "UI/UX", "Integrazione di API", "Debug & test", "Manutenzione hardware/software", "Web design", "Gestione di progetti (solo)"],
    },
  },
];

/* Resolve a skill group's items for the active language. */
function skillItems(group: (typeof skillGroups)[number], lang: Lang): string[] {
  return Array.isArray(group.items) ? group.items : group.items[lang];
}

const companyLogos: Record<string, string> = {
  "Magneticlab - XEFI Neuchâtel": xefiLogo,
  "SourShots": sourShotsLogo,
};

function getCompanyLogo(company: string): string | undefined {
  if (companyLogos[company]) return companyLogos[company];
  if (company.startsWith("CPNE")) return cpneLogo;
  return undefined;
}

const roundLogos = new Set(["SourShots"]);
function isRoundLogo(company: string) {
  return roundLogos.has(company);
}

const ordineAIProject = {
  name: "Ordine AI",
  url: "https://www.ordine-ai.ch/",
  status: { fr: "Beta active", en: "Active beta", de: "Aktive Beta", it: "Beta attiva" } as Record<Lang, string>,
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
      "Conformité FADP dès le premier jour — résidence Suisse & EU (Cloud Run Zurich + Supabase Frankfurt), chiffrement AES-GCM-256, DLP PII suisse (IBAN, AVS, CB Luhn), droit à l'effacement",
      "Audit de sécurité antagoniste auto-mené (5 agents LLM) — 30+ problèmes corrigés : injection de prompt, SSRF, confusion algo JWT, mXSS via DOMPurify, JWKS OAuth, durcissement RLS, IDOR",
      "Facturation Stripe complète — 4 niveaux (Starter / Pro / Business / Enterprise), essai 14 jours, portail client, idempotence des webhooks",
    ],
    en: [
      "AI classification pipeline (tone × intent × category × priority) on Claude Haiku — CI eval harness, FR/DE/IT/EN: 100% / 94% / 96% / 98%",
      "Gmail & Microsoft Graph feature parity behind a unified EmailProvider protocol: send/receive, threads, drafts, search, snooze, scheduled send, attachments",
      "FADP-compliant from day one — Swiss & EU data residency (Cloud Run Zurich + Supabase Frankfurt), AES-GCM-256 token encryption, Swiss PII DLP (IBAN, AHV, Luhn CC), right-to-erasure",
      "Self-run adversarial security audit (5 LLM agents) — 30+ findings resolved: prompt injection, SSRF, JWT algorithm confusion, mXSS via DOMPurify, OAuth JWKS verification, RLS hardening, IDOR",
      "Full Stripe billing — 4-tier model (Starter / Pro / Business / Enterprise), 14-day trial, customer portal, webhook idempotency",
    ],
    de: [
      "KI-Klassifizierungspipeline (Ton × Absicht × Kategorie × Priorität) auf Claude Haiku — CI-Eval-Harness FR/DE/IT/EN: 100% / 94% / 96% / 98%",
      "Gmail & Microsoft Graph Funktionsparität hinter einem einheitlichen EmailProvider-Protokoll: Senden/Empfangen, Threads, Entwürfe, Suche, Snooze, geplanter Versand, Anhänge",
      "FADP-konform von Anfang an — Schweizer & EU-Datenwohnsitz (Cloud Run Zürich + Supabase Frankfurt), AES-GCM-256-Verschlüsselung, PII-DLP (IBAN, AHV, Luhn-KK), Recht auf Löschung",
      "Selbst durchgeführtes adversariales Sicherheitsaudit (5 LLM-Agenten) — 30+ Findings: Prompt Injection, SSRF, JWT-Algorithmusverwirrung, mXSS via DOMPurify, OAuth-JWKS-Verifikation, RLS-Härtung, IDOR",
      "Vollständiges Stripe-Billing — 4 Stufen (Starter / Pro / Business / Enterprise), 14-Tage-Test, Kundenportal, Webhook-Idempotenz",
    ],
    it: [
      "Pipeline di classificazione IA (tono × intento × categoria × priorità) su Claude Haiku — CI eval harness FR/DE/IT/EN: 100% / 94% / 96% / 98%",
      "Parità funzionale Gmail & Microsoft Graph dietro un protocollo EmailProvider unificato: invio/ricezione, thread, bozze, ricerca, snooze, invio programmato, allegati",
      "Conforme FADP fin dal primo giorno — residenza Svizzera & EU (Cloud Run Zurigo + Supabase Francoforte), cifratura AES-GCM-256, DLP PII svizzero (IBAN, AVS, Luhn CC), diritto alla cancellazione",
      "Audit di sicurezza avversariale auto-condotto (5 agenti LLM) — 30+ findings risolti: prompt injection, SSRF, confusione algoritmo JWT, mXSS via DOMPurify, verifica JWKS OAuth, hardening RLS, IDOR",
      "Fatturazione Stripe completa — 4 livelli (Starter / Pro / Business / Enterprise), prova 14 giorni, portale cliente, idempotenza webhook",
    ],
  } as Record<Lang, string[]>,
  stack: ["FastAPI", "Next.js 14", "TypeScript", "Supabase", "Claude API", "Stripe", "Cloud Run", "Vercel", "Sentry", "PostHog"],
};

/* Language badge data — flag + level per UI language. `fallback` is shown when
   the platform can't render the emoji flag (e.g. Windows renders 🇬🇧 as "GB",
   but for English we want "EN", not the country code). */
const langBadges: { flag: string; fallback?: string; label: Record<Lang, string> }[] = [
  { flag: "🇫🇷", fallback: "FR", label: { fr: "Natif", en: "Native", de: "Muttersprache", it: "Madrelingua" } },
  { flag: "🇮🇹", fallback: "IT", label: { fr: "Natif", en: "Native", de: "Muttersprache", it: "Madrelingua" } },
  { flag: "🇬🇧", fallback: "EN", label: { fr: "C1", en: "C1", de: "C1", it: "C1" } },
  { flag: "🇩🇪", fallback: "DE", label: { fr: "B2", en: "B2", de: "B2", it: "B2" } },
];

/* Detect whether the platform renders emoji country flags (iOS/Android/macOS do;
   Windows shows the two-letter regional code instead). Draw 🇬🇧 and check for
   coloured pixels — a real flag has colour, "GB" letters are monochrome. */
function detectFlagSupport(): boolean {
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return false;
    ctx.font = "14px sans-serif";
    ctx.fillText("🇬🇧", 0, 13);
    const d = ctx.getImageData(0, 0, 16, 16).data;
    for (let i = 0; i < d.length; i += 4) {
      if (d[i + 3] > 0 && (Math.abs(d[i] - d[i + 1]) > 24 || Math.abs(d[i + 1] - d[i + 2]) > 24)) {
        return true;
      }
    }
    return false;
  } catch {
    return false;
  }
}

/* Display value for a language badge, given whether flags render on this device. */
function badgeGlyph(b: { flag: string; fallback?: string }, flagsOk: boolean): string {
  return flagsOk ? b.flag : (b.fallback ?? b.flag);
}

const permitLabel: Record<Lang, string> = { fr: "Permis C", en: "Permit C", de: "Ausweis C", it: "Permesso C" };
const deliveredBadge: Record<Lang, string> = { fr: "Livré", en: "Delivered", de: "Geliefert", it: "Consegnato" };
const demoLabel: Record<Lang, string> = { fr: "Démo", en: "Demo", de: "Demo", it: "Demo" };

const anthropicCert = {
  date: { fr: "2026 — en cours", en: "2026 — in progress", de: "2026 — laufend", it: "2026 — in corso" } as Record<Lang, string>,
  badge: { fr: "en cours", en: "in progress", de: "laufend", it: "in corso" } as Record<Lang, string>,
  description: {
    fr: "Préparation de la certification officielle Anthropic — prompt engineering, tool use, systèmes multi-agents.",
    en: "Preparing the official Anthropic certification — prompt engineering, tool use, multi-agent systems.",
    de: "Vorbereitung der offiziellen Anthropic-Zertifizierung — Prompt-Engineering, Tool Use, Multi-Agent-Systeme.",
    it: "Preparazione della certificazione ufficiale Anthropic — prompt engineering, tool use, sistemi multi-agente.",
  } as Record<Lang, string>,
};

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

    const render = () => {
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
        for (let x = 0; x <= w; x += 6) {
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

    };

    // Perf: the fixed canvas sits behind every glass card, so each repaint
    // forces every visible backdrop-filter to recompute. Cap to ~30fps (speed
    // kept constant via elapsed time), honor reduced-motion (one static frame),
    // and pause when the tab is hidden — fewer repaints = far cheaper filters.
    const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const frameInterval = 1000 / 30;
    let lastDraw = 0;
    let running = false;

    const loop = (ts: number) => {
      if (!running) return;
      animId = requestAnimationFrame(loop);
      const dt = ts - lastDraw;
      if (dt < frameInterval) return;
      lastDraw = ts;
      t += 0.42 * Math.min(dt, 100) / 1000;
      render();
    };

    const start = () => {
      if (running || prefersReduce) return;
      running = true;
      lastDraw = performance.now();
      animId = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(animId);
    };

    const onVisibility = () => { document.hidden ? stop() : start(); };
    document.addEventListener("visibilitychange", onVisibility);

    if (prefersReduce) {
      render();
    } else {
      start();
    }

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
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
/* Collapsible body — smooth height via measured content   */
/* ────────────────────────────────────────────────────── */
function Collapsible({ open, children }: { open: boolean; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [h, setH] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setH(el.scrollHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      style={{
        maxHeight: open ? h : 0,
        opacity: open ? 1 : 0,
        overflow: "hidden",
        transition: "max-height 0.35s ease, opacity 0.25s ease",
      }}
    >
      <div ref={ref}>{children}</div>
    </div>
  );
}

/* ────────────────────────────────────────────────────── */
/* Bullets — experience body (bullet list + stack line)   */
/* ────────────────────────────────────────────────────── */
function Bullets({ items, stack }: { items: string[]; stack?: string }) {
  return (
    <div className="px-5 pb-4">
      <ul className="space-y-1.5">
        {items.map((b, i) => (
          <li key={i} className="flex gap-2.5 text-sm text-white/50 leading-relaxed">
            <span className="text-white/20 shrink-0 select-none mt-[3px]">—</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      {stack && (
        <p className="mt-3 text-[10px] font-mono text-white/35 tracking-wide">{stack}</p>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────── */
/* Mandate card — delivered client work (R2JC, XEFI)      */
/* Collapsible glass card: logo · linked title · role ·    */
/* date · optional demo button · "delivered" badge.        */
/* ────────────────────────────────────────────────────── */
function MandateCard({
  exp,
  logo,
  lang,
  open,
  onToggle,
  demoUrl,
}: {
  exp: { company: string; role?: string; date: string; url?: string; bullets: string[]; stack?: string };
  logo: string;
  lang: Lang;
  open: boolean;
  onToggle: () => void;
  demoUrl?: string;
}) {
  return (
    <ScrollReveal>
      <div
        className="glass-card rounded-2xl overflow-hidden"
        onMouseMove={glassMove} onMouseEnter={glassEnter} onMouseLeave={glassLeave}
      >
        <div className="px-5 py-4 cursor-pointer" onClick={onToggle}>
          <div className="flex items-center gap-3">
            <img src={logo} alt={exp.company} className="shrink-0" style={{ width: 30, height: 30, objectFit: "contain" }} />
            <div className="flex-1 min-w-0 flex items-center justify-between gap-3 flex-wrap">
              <div>
                <a
                  href={exp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="text-base font-medium hover:text-white transition-colors flex items-center gap-1.5"
                >
                  {exp.company}
                  <ExternalLink className="h-3 w-3 opacity-50" />
                </a>
                <p className="text-[12px] text-white/55 mt-0.5">{exp.role}</p>
                <p className="text-[11px] font-mono text-white/30 mt-0.5">{exp.date}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {demoUrl && (
                  <a
                    href={demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="glass-card glass-card--sm inline-flex items-center gap-1.5 text-[9px] uppercase px-2.5 py-1 rounded-full text-white/55 hover:text-white cursor-pointer"
                    onMouseMove={glassMove} onMouseEnter={glassEnter} onMouseLeave={glassLeave}
                  >
                    <ExternalLink className="h-3 w-3" />
                    {demoLabel[lang]}
                  </a>
                )}
                <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  {deliveredBadge[lang]}
                </span>
                <ChevronDown className="h-4 w-4 text-white/25 transition-transform duration-300" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }} />
              </div>
            </div>
          </div>
        </div>
        <Collapsible open={open}>
          <Bullets items={exp.bullets} stack={exp.stack} />
        </Collapsible>
      </div>
    </ScrollReveal>
  );
}

/* ────────────────────────────────────────────────────── */
/* Print helpers — section label + bulleted experience    */
/* ────────────────────────────────────────────────────── */
function PrintSectionLabel({ title }: { title: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "3mm", marginBottom: "3.5mm" }}>
      <p style={{ fontSize: "5.5pt", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#999", margin: 0, flexShrink: 0, whiteSpace: "nowrap" }}>{title}</p>
      <div style={{ flex: 1, height: "0.5px", background: "#ddd" }} />
    </div>
  );
}

function PrintExpEntry({ exp }: { exp: { company: string; role?: string; date: string; bullets: string[]; stack?: string } }) {
  return (
    <div style={{ breakInside: "avoid", pageBreakInside: "avoid" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <p style={{ fontSize: "8.5pt", fontWeight: 600, color: "#111", margin: 0 }}>{exp.company}</p>
        <p style={{ fontSize: "6pt", color: "#999", margin: "0 0 0 3mm", flexShrink: 0, fontVariantNumeric: "tabular-nums" }}>{exp.date}</p>
      </div>
      {exp.role && <p style={{ fontSize: "6.5pt", color: "#777", margin: "0.3mm 0 1.2mm", fontStyle: "italic" }}>{exp.role}</p>}
      <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
        {exp.bullets.map((b, j) => (
          <li key={j} style={{ fontSize: "7pt", color: "#555", lineHeight: 1.45, margin: "0 0 0.7mm", paddingLeft: "2.6mm", position: "relative" }}>
            <span style={{ position: "absolute", left: 0, color: "#bbb" }}>–</span>{b}
          </li>
        ))}
      </ul>
      {exp.stack && <p style={{ fontSize: "6pt", color: "#999", margin: "1mm 0 0" }}>{exp.stack}</p>}
    </div>
  );
}

/* ────────────────────────────────────────────────────── */
/* Skill section                                          */
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
            className="text-[10px] uppercase tracking-[0.18em] font-medium mb-3"
            style={{ color: group.color }}
          >
            {group.category[lang]}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {skillItems(group, lang).map((item, si) => (
              <span key={si} className="text-[13px] px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.09] text-white/70">
                {item}
              </span>
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
    <div className="mb-6">
      <p className="text-[10px] font-mono text-white/25 mb-1 tracking-widest">/ {num}</p>
      <h2 className="text-2xl font-medium">{title}</h2>
      <div className="w-10 h-[1.5px] bg-white/25 mt-3" />
    </div>
  );
}

/* Smaller sub-heading used inside a big section (e.g. the families of
   "Expérience": Mandats · Entrepreneuriat · Projets personnels). */
function SubHead({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45 shrink-0">{title}</h3>
      <div className="flex-1 h-px bg-white/10" />
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
  const [openExp, setOpenExp] = useState<Set<number>>(new Set());
  const [ordineHovered, setOrdineHovered] = useState(false);
  const [openCards, setOpenCards] = useState<Set<string>>(new Set());
  const [flagsSupported] = useState<boolean>(() => typeof document !== "undefined" && detectFlagSupport());
  const t = translations[lang];

  const toggleExp = (i: number) =>
    setOpenExp(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  const toggleCard = (key: string) =>
    setOpenCards(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
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

                {/* Text — text-shadow scrim so contrast holds over every phase of the wave animation */}
                <div className="flex-1 text-center sm:text-left" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.55)" }}>
                  <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-medium leading-tight tracking-tight">
                    {displayedName}{cursor}
                  </h1>
                  <p className="text-base sm:text-lg text-white/65 mt-3" style={fadeIn(100)}>
                    {t.title}
                  </p>

                  {/* Language badges — above the fold, first thing a recruiter sees */}
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-4" style={fadeIn(180)}>
                    {langBadges.map((b, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.10] text-white/60"
                      >
                        <span>{badgeGlyph(b, flagsSupported)}</span>
                        <span>{b.label[lang]}</span>
                      </span>
                    ))}
                  </div>

                  {/* À propos — availability/rate first (Swiss-expected), then the parcours */}
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/35 mt-6 mb-2" style={fadeIn(260)}>
                    {t.sections.about}
                  </p>
                  <p className="text-[13px] font-medium max-w-xl text-emerald-300/90" style={fadeIn(280)}>
                    {t.availability}
                  </p>
                  <p className="text-sm leading-relaxed mt-3 max-w-xl text-white/80" style={fadeIn(340)}>
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
                      {t.downloadPdf}
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
        <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 pb-24 space-y-14">

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
                  "glass-card flex items-center gap-3 px-4 py-3 rounded-2xl text-sm text-white/70 hover:text-white/90 group";
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

          {/* 02 — Expérience (Mandats · Entrepreneuriat · Projets personnels) */}
          <div>
            <ScrollReveal>
              <SectionHead title={t.sections.experience} num="02" />
            </ScrollReveal>
            <div className="space-y-10">
              {/* Mandats professionnels */}
              <div>
                <ScrollReveal>
                  <SubHead title={t.sections.mandates} />
                </ScrollReveal>
                <div className="space-y-2">
              {/* R2JC — latest project, delivered, expandable — pinned first */}
              {(() => {
                const r2jcExp = t.experience.find(e => e.company === "R2JC");
                if (!r2jcExp) return null;
                return (
                  <MandateCard
                    exp={r2jcExp}
                    logo={r2jcLogo}
                    lang={lang}
                    open={openCards.has("r2jc")}
                    onToggle={() => toggleCard("r2jc")}
                    demoUrl="https://r2jc.vercel.app"
                  />
                );
              })()}

              {/* XEFI / Magneticlab — delivered paid mandate, anchors the section with shipped proof */}
              {(() => {
                const xefiExp = t.experience.find(e => e.company === "Magneticlab - XEFI Neuchâtel");
                if (!xefiExp) return null;
                return (
                  <MandateCard
                    exp={xefiExp}
                    logo={xefiLogo}
                    lang={lang}
                    open={openCards.has("xefi")}
                    onToggle={() => toggleCard("xefi")}
                  />
                );
              })()}

            </div>
          </div>

              {/* Projets & entrepreneuriat */}
              <div>
                <ScrollReveal>
                  <SubHead title={t.sections.entrepreneurship} />
                </ScrollReveal>
                <ScrollReveal>
            <div
              className="glass-card rounded-2xl overflow-hidden"
              onMouseMove={glassMove}
              onMouseEnter={e => { glassEnter(e); setOrdineHovered(true); }}
              onMouseLeave={e => { glassLeave(e); setOrdineHovered(false); }}
            >
              {/* Header — always visible, click to expand */}
              <div className="px-5 py-4 cursor-pointer" onClick={() => toggleCard("ordine")}>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <OrbMini size={22} baseRadius={0.45} className="shrink-0" hover={ordineHovered} />
                    <div className="min-w-0">
                      <a
                        href={ordineAIProject.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="text-base font-semibold hover:text-white transition-colors inline-flex items-center gap-1.5"
                      >
                        {ordineAIProject.name}
                        <ExternalLink className="h-3 w-3 opacity-50" />
                      </a>
                      <p className="text-[12px] text-white/55 mt-0.5">{t.experience.find(e => e.company === "Ordine AI")?.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                      {ordineAIProject.status[lang]}
                    </span>
                    <ChevronDown className="h-4 w-4 text-white/25 transition-transform duration-300" style={{ transform: openCards.has("ordine") ? "rotate(180deg)" : "rotate(0deg)" }} />
                  </div>
                </div>
              </div>
              <Collapsible open={openCards.has("ordine")}>
                <div className="px-5 pb-5">
                  <p className="text-sm text-white/40 mb-4" style={{ paddingLeft: "calc(22px + 12px)" }}>{ordineAIProject.tagline[lang]}</p>
                  <ul className="space-y-2.5 mb-5">
                    {ordineAIProject.highlights[lang].map((h, i) => (
                      <li key={i} className="flex gap-3 text-sm text-white/50 leading-relaxed">
                        <span className="text-white/15 shrink-0 select-none mt-[3px]">—</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
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
              </Collapsible>
                  </div>
                </ScrollReveal>
              </div>

              {/* Projets personnels */}
              <div>
                <ScrollReveal>
                  <SubHead title={t.sections.projects} />
                </ScrollReveal>
                <div className="space-y-2">
              {t.experience.filter(exp => exp.company !== "Ordine AI" && exp.company !== "R2JC" && exp.company !== "Magneticlab - XEFI Neuchâtel").map((exp, i) => {
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
                        <div className="flex items-center gap-3">
                          {getCompanyLogo(exp.company) && (
                            <img
                              src={getCompanyLogo(exp.company)}
                              alt=""
                              className="shrink-0"
                              style={{
                                width: 28,
                                height: 28,
                                objectFit: isRoundLogo(exp.company) ? "cover" : "contain",
                                borderRadius: isRoundLogo(exp.company) ? "50%" : undefined,
                              }}
                            />
                          )}
                          <div>
                            <div className="flex items-center gap-1.5">
                              {"url" in exp && exp.url ? (
                                <a
                                  href={exp.url as string}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={e => e.stopPropagation()}
                                  className="text-base font-medium hover:text-white/70 transition-colors flex items-center gap-1.5"
                                >
                                  {exp.company}
                                  <ExternalLink className="h-3 w-3 opacity-50" />
                                </a>
                              ) : (
                                <p className="text-base font-medium">{exp.company}</p>
                              )}
                            </div>
                            <p className="text-[12px] text-white/55 mt-0.5">{exp.role}</p>
                            <p className="text-[11px] font-mono text-white/30 mt-0.5">{exp.date}</p>
                          </div>
                        </div>
                        <ChevronDown
                          className="h-4 w-4 text-white/25 shrink-0 ml-4 transition-transform duration-300"
                          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                        />
                      </button>
                      <div
                        style={{
                          maxHeight: isOpen ? "340px" : "0px",
                          opacity: isOpen ? 1 : 0,
                          transition: "max-height 0.3s ease, opacity 0.25s ease",
                          overflow: "hidden",
                        }}
                      >
                        <Bullets items={exp.bullets} stack={exp.stack} />
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
                </div>
              </div>
            </div>
          </div>

          {/* 03 — Compétences techniques */}
          <ScrollReveal>
            <SectionHead title={t.sections.skills} num="03" />
            <SkillSection groups={skillGroups} lang={lang} />
          </ScrollReveal>

          {/* 04 — Compétences personnelles */}
          <ScrollReveal>
            <SectionHead title={t.sections.personalSkills} num="04" />
            <div className="flex flex-wrap gap-2.5">
              {t.softSkills.map((s, i) => (
                <span key={i} className="text-[15px] px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.12] text-white/80">
                  {s}
                </span>
              ))}
            </div>
          </ScrollReveal>

          {/* 05 — Langues */}
          <ScrollReveal>
            <SectionHead title={t.sections.languages} num="05" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {t.languages.map((language, i) => (
                <div
                  key={i}
                  className="glass-card px-4 py-4 rounded-2xl"
                  onMouseMove={glassMove} onMouseEnter={glassEnter} onMouseLeave={glassLeave}
                >
                  <p className="text-sm font-medium">{language.name}</p>
                  <p className="text-[11px] text-white/45 mt-1">{language.level}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* 06 — Education */}
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

            {/* Certifications in progress — Anthropic, relocated out of Experience (not yet earned) */}
            <ScrollReveal>
              <div className="mt-8 pt-5 border-t border-white/[0.06]">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/25 mb-3">{t.sections.certifications}</p>
                {/* Anthropic certification — original orange pulsing card, now under Formation */}
                <div
                  className="glass-card glass-card--anthropic rounded-2xl overflow-hidden"
                  onMouseMove={glassMove} onMouseEnter={glassEnter} onMouseLeave={glassLeave}
                >
                  <div className="px-5 py-4 flex items-center gap-3 cursor-pointer" onClick={() => toggleCard("anthropic")}>
                    <svg width="20" height="20" viewBox="0 0 248 248" fill="none" className="shrink-0">
                      <path d="M52.4285 162.873L98.7844 136.879L99.5485 134.602L98.7844 133.334H96.4921L88.7237 132.862L62.2346 132.153L39.3113 131.207L17.0249 130.026L11.4214 128.844L6.2 121.873L6.7094 118.447L11.4214 115.257L18.171 115.847L33.0711 116.911L55.485 118.447L71.6586 119.392L95.728 121.873H99.5485L100.058 120.337L98.7844 119.392L97.7656 118.447L74.5877 102.732L49.4995 86.1905L36.3823 76.62L29.3779 71.7757L25.8121 67.2858L24.2839 57.3608L30.6515 50.2716L39.3113 50.8623L41.4763 51.4531L50.2636 58.1879L68.9842 72.7209L93.4357 90.6804L97.0015 93.6343L98.4374 92.6652L98.6571 91.9801L97.0015 89.2625L83.757 65.2772L69.621 40.8192L63.2534 30.6579L61.5978 24.632C60.9565 22.1032 60.579 20.0111 60.579 17.4246L67.8381 7.49965L71.9133 6.19995L81.7193 7.49965L85.7946 11.0443L91.9074 24.9865L101.714 46.8451L116.996 76.62L121.453 85.4816L123.873 93.6343L124.764 96.1155H126.292V94.6976L127.566 77.9197L129.858 57.3608L132.15 30.8942L132.915 23.4505L136.608 14.4708L143.994 9.62643L149.725 12.344L154.437 19.0788L153.8 23.4505L150.998 41.6463L145.522 70.1215L141.957 89.2625H143.994L146.414 86.7813L156.093 74.0206L172.266 53.698L179.398 45.6635L187.803 36.802L193.152 32.5484H203.34L210.726 43.6549L207.415 55.1159L196.972 68.3492L188.312 79.5739L175.896 96.2095L168.191 109.585L168.882 110.689L170.738 110.53L198.755 104.504L213.91 101.787L231.994 98.7149L240.144 102.496L241.036 106.395L237.852 114.311L218.495 119.037L195.826 123.645L162.07 131.592L161.696 131.893L162.137 132.547L177.36 133.925L183.855 134.279H199.774L229.447 136.524L237.215 141.605L241.8 147.867L241.036 152.711L229.065 158.737L213.019 154.956L175.45 145.977L162.587 142.787H160.805V143.85L171.502 154.366L191.242 172.089L215.82 195.011L217.094 200.682L213.91 205.172L210.599 204.699L188.949 188.394L180.544 181.069L161.696 165.118H160.422V166.772L164.752 173.152L187.803 207.771L188.949 218.405L187.294 221.832L181.308 223.959L174.813 222.777L161.187 203.754L147.305 182.486L136.098 163.345L134.745 164.2L128.075 235.42L125.019 239.082L117.887 241.8L111.902 237.31L108.718 229.984L111.902 215.452L115.722 196.547L118.779 181.541L121.58 162.873L123.291 156.636L123.14 156.219L121.773 156.449L107.699 175.752L86.304 204.699L69.3663 222.777L65.291 224.431L58.2867 220.768L58.9235 214.27L62.8713 208.48L86.304 178.705L100.44 160.155L109.551 149.507L109.462 147.967L108.959 147.924L46.6977 188.512L35.6182 189.93L30.7788 185.44L31.4156 178.115L33.7079 175.752L52.4285 162.873Z" fill="#D97757"/>
                    </svg>
                    <div className="flex-1 min-w-0 flex items-center justify-between gap-3 flex-wrap">
                      <div>
                        <a
                          href="https://anthropic.skilljar.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="text-base font-medium hover:text-[#D97757] transition-colors flex items-center gap-1.5"
                        >
                          Anthropic
                          <ExternalLink className="h-3 w-3 opacity-50" />
                        </a>
                        <p className="text-[11px] font-mono text-white/30 mt-0.5">{anthropicCert.date[lang]}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="flex items-center gap-2 text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#D97757]/10 text-[#D97757] border border-[#D97757]/25">
                          <span className="flex items-end gap-[3px]">
                            <span className="w-1 h-1 rounded-full bg-[#D97757] inline-block dot-jump-1" />
                            <span className="w-1 h-1 rounded-full bg-[#D97757] inline-block dot-jump-2" />
                            <span className="w-1 h-1 rounded-full bg-[#D97757] inline-block dot-jump-3" />
                          </span>
                          {anthropicCert.badge[lang]}
                        </span>
                        <ChevronDown className="h-4 w-4 text-white/25 transition-transform duration-300" style={{ transform: openCards.has("anthropic") ? "rotate(180deg)" : "rotate(0deg)" }} />
                      </div>
                    </div>
                  </div>
                  <Collapsible open={openCards.has("anthropic")}>
                    <p className="px-5 pb-4 text-sm text-white/45 leading-relaxed">{anthropicCert.description[lang]}</p>
                  </Collapsible>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* 07 — Références */}
          <ScrollReveal>
            <SectionHead title={t.sections.references} num="07" />
            <p className="text-sm text-white/50">{t.referencesLine}</p>
          </ScrollReveal>

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
            minHeight: "297mm",
            background: "white",
            fontFamily: "'Geist', sans-serif",
            color: "#111",
          }}
        >

          {/* ── HEADER ── light strip, dark ink — legible even when PDF background graphics are off ── */}
          <div style={{
            background: "#f4f4f4",
            padding: "9mm 14mm",
            display: "flex",
            alignItems: "center",
            gap: "9mm",
            flexShrink: 0,
            borderBottom: "0.5px solid #ddd",
          }}>
            {/* Photo */}
            <div style={{
              width: "22mm",
              height: "22mm",
              borderRadius: "3.5mm",
              overflow: "hidden",
              flexShrink: 0,
              border: "0.4px solid rgba(0,0,0,0.15)",
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
                color: "#111",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                margin: 0,
              }}>
                {FULL_NAME}
              </p>
              <p style={{
                fontSize: "7.5pt",
                color: "#666",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                margin: "2mm 0 0",
              }}>
                {t.title}
              </p>
              <p style={{
                fontSize: "7pt",
                color: "#555",
                margin: "2mm 0 0",
                letterSpacing: "0.04em",
              }}>
                {langBadges.map((b) => `${badgeGlyph(b, flagsSupported)} ${b.label[lang]}`).join("  ·  ")}
              </p>
            </div>

            {/* Contact details — right-aligned column */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.6mm",
              fontSize: "6.5pt",
              color: "#555",
              textAlign: "right",
              flexShrink: 0,
              lineHeight: 1.3,
            }}>
              {/* Work authorization first — the Swiss recruiter's first question */}
              <span style={{ justifyContent: "flex-end", fontWeight: 600, color: "#2a2a2a" }}>
                {t.contact.dob} · {t.contact.nationality}
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
                <MapPin style={{ width: "2.8mm", height: "2.8mm", opacity: 0.5 }} />
                {t.contact.location} · {t.contact.mobility}
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
            </div>
          </div>

          {/* ── À PROPOS STRIP ── availability/rate first, then parcours ── */}
          <div style={{
            background: "#ffffff",
            padding: "4mm 14mm",
            borderBottom: "0.5px solid #e2e2e2",
            flexShrink: 0,
          }}>
            <p style={{
              fontSize: "5.5pt",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#999",
              margin: "0 0 1.8mm",
            }}>
              {t.sections.about}
            </p>
            <p style={{
              fontSize: "7pt",
              color: "#0f6b3d",
              fontWeight: 600,
              lineHeight: 1.5,
              margin: 0,
            }}>
              {t.availability}
            </p>
            <p style={{
              fontSize: "7.5pt",
              color: "#444",
              lineHeight: 1.55,
              margin: "1.6mm 0 0",
            }}>
              {t.intro}
            </p>
          </div>

          {/* ── BODY — two-column flex ── */}
          <div style={{ flex: 1, minHeight: 0, display: "flex", overflow: "visible" }}>

            {/* LEFT COLUMN — Experience + Education */}
            <div style={{
              flex: 1,
              padding: "8mm 9mm 8mm 14mm",
              borderRight: "0.5px solid #e2e2e2",
              display: "flex",
              flexDirection: "column",
              gap: "8mm",
              overflow: "visible",
            }}>

              {/* ── Mandats professionnels ── */}
              <div>
                <PrintSectionLabel title={t.sections.mandates} />
                <div style={{ display: "flex", flexDirection: "column", gap: "4.5mm" }}>
                  {t.experience
                    .filter(e => e.company === "R2JC" || e.company === "Magneticlab - XEFI Neuchâtel")
                    .sort((a, b) => (a.company === "R2JC" ? 0 : 1) - (b.company === "R2JC" ? 0 : 1))
                    .map((exp, i) => <PrintExpEntry key={i} exp={exp} />)}
                </div>
              </div>

              {/* ── Projets & entrepreneuriat ── */}
              <div>
                <PrintSectionLabel title={t.sections.entrepreneurship} />
                <div style={{ display: "flex", flexDirection: "column", gap: "4.5mm" }}>
                  {t.experience.filter(e => e.company === "Ordine AI").map((exp, i) => <PrintExpEntry key={i} exp={exp} />)}
                </div>
              </div>

              {/* ── Projets personnels ── */}
              <div>
                <PrintSectionLabel title={t.sections.projects} />
                <div style={{ display: "flex", flexDirection: "column", gap: "4.5mm" }}>
                  {t.experience.filter(e => e.company.startsWith("CPNE") || e.company === "SourShots").map((exp, i) => <PrintExpEntry key={i} exp={exp} />)}
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
              overflow: "visible",
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
                      <p style={{ fontSize: "6.5pt", color: "#555", margin: 0, lineHeight: 1.55 }}>
                        {skillItems(group, lang).join(" · ")}
                      </p>
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
                      <p style={{ fontSize: "8pt", fontWeight: 500, color: "#222", margin: 0 }}>
                        {language.name}
                      </p>
                      <p style={{ fontSize: "7pt", color: "#666", margin: 0 }}>
                        {language.level}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Section: Compétences personnelles ── */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "3mm", marginBottom: "3.5mm" }}>
                  <p style={{ fontSize: "5.5pt", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#999", margin: 0, flexShrink: 0 }}>
                    {t.sections.personalSkills}
                  </p>
                  <div style={{ flex: 1, height: "0.5px", background: "#ddd" }} />
                </div>
                <p style={{ fontSize: "6.5pt", color: "#444", lineHeight: 1.65, margin: 0 }}>
                  {t.softSkills.join(" · ")}
                </p>
              </div>

              {/* ── Section: Références ── */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "3mm", marginBottom: "3mm" }}>
                  <p style={{ fontSize: "5.5pt", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#999", margin: 0, flexShrink: 0 }}>
                    {t.sections.references}
                  </p>
                  <div style={{ flex: 1, height: "0.5px", background: "#ddd" }} />
                </div>
                <p style={{ fontSize: "6.5pt", color: "#777", margin: 0, fontStyle: "italic" }}>
                  {t.referencesLine}
                </p>
              </div>

            </div>
          </div>

          {/* Discrete footer — nudge to the interactive online version */}
          <div style={{
            flexShrink: 0,
            padding: "2.5mm 14mm",
            borderTop: "0.5px solid #e2e2e2",
            background: "#fafafa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "2mm",
            fontSize: "6pt",
            color: "#999",
          }}>
            <Globe style={{ width: "2.6mm", height: "2.6mm", opacity: 0.7 }} />
            <span>{t.printCta} — {t.contact.website}</span>
          </div>
        </div>
      </div>
    </>
  );
}
