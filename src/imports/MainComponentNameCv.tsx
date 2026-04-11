import { useState, useEffect, Fragment } from "react";
import { Linkedin, Github, Printer } from "lucide-react";
import profilePic from "../assets/pfplinkedin-removebg-preview.png";

type Lang = "fr" | "en" | "de" | "it";
type Phase = "cursor" | "typing" | "done";

const FULL_NAME = "Sacha Riccardo Leone";

const translations = {
  fr: {
    title: "Développeur d'Applications",
    intro:
      "Développeur d'applications diplômé (CFC + maturité professionnelle), déjà engagé dans la conception d'un produit SaaS personnel. Compétences couvrant le développement full-stack, l'intégration d'IA générative et les APIs tierces. Quadrilingue : français et italien natifs, anglais C1, allemand B2.",
    sections: {
      contact: "Contact",
      experience: "Expérience",
      languages: "Langues",
      skills: "Compétences",
      education: "Formation",
    },
    contact: {
      location: "La Chaux-de-Fonds, NE",
      email: "leonesachariccardo@gmail.com",
      phone: "+41 78 400 01 68",
      linkedin: "linkedin.com/in/sacha-leone",
      github: "@sacha-riccardo-leone",
    },
    experience: [
      {
        date: "2025 – présent",
        company: "Ordine AI",
        description:
          "Conception et développement d'un produit SaaS full-stack : frontend Next.js, backend FastAPI (Python), base de données vectorielle, IA générative et intégrations tierces (OAuth, APIs Microsoft, Google Cloud).",
      },
      {
        date: "août 2025 – janvier 2026",
        company: "CPNE-AA",
        description:
          "Immersion interdisciplinaire en design, couture et industrie. Utilisation d'outils numériques pour la recherche documentaire, la retouche d'image et les calculs de conception.",
      },
      {
        date: "avril 2025 – juin 2025",
        company: "CPNE-TI – TPI",
        description:
          "Développement en C#/Raylib d'une version numérisée du jeu \"Qui est-ce ?\", incluant un algorithme de génération de personnages uniques par comparaison de profils ADN et un système de rareté vestimentaire. Note : 5,5/6.",
      },
      {
        date: "2023 – présent",
        company: "SourShots",
        description:
          "Création de contenus visuels pour un groupe de musique local : photoshoots, montages vidéo, affiches, brochures et posts réseaux sociaux. Outils : Krita, Sony.",
      },
    ],
    languages: [
      { name: "Français", level: "Maternelle" },
      { name: "Italien", level: "Maternelle" },
      { name: "Anglais", level: "C1" },
      { name: "Allemand", level: "B2" },
    ],
    education: [
      {
        date: "2022–2025",
        institution: "CPNE-TI",
        description:
          "Formation d'informatique (Dév. d'applications), CFC et maturité professionnelle",
      },
      {
        date: "2020–2021",
        institution: "École secondaire d'Erlach (BE)",
        description: "Immersion d'une année en allemand",
      },
      {
        date: "2018–2022",
        institution: "École secondaire, Le Landeron (NE)",
        description: "PRIMA (programme bilingue allemand/français)",
      },
    ],
  },
  en: {
    title: "Application Developer",
    intro:
      "Graduated application developer (federal vocational diploma + professional baccalaureate), already building a personal SaaS product. Skills spanning full-stack development, generative AI integration and third-party APIs. Quadrilingual: native French and Italian, English C1, German B2.",
    sections: {
      contact: "Contact",
      experience: "Experience",
      languages: "Languages",
      skills: "Skills",
      education: "Education",
    },
    contact: {
      location: "La Chaux-de-Fonds, NE",
      email: "leonesachariccardo@gmail.com",
      phone: "+41 78 400 01 68",
      linkedin: "linkedin.com/in/sacha-leone",
      github: "@sacha-riccardo-leone",
    },
    experience: [
      {
        date: "2025 – present",
        company: "Ordine AI",
        description:
          "Design and development of a full-stack SaaS product: Next.js frontend, FastAPI (Python) backend, vector database, generative AI and third-party integrations (OAuth, Microsoft APIs, Google Cloud).",
      },
      {
        date: "Aug 2025 – Jan 2026",
        company: "CPNE-AA",
        description:
          "Interdisciplinary immersion in design, fashion and industry. Use of digital tools for documentation, image editing and measurement calculations.",
      },
      {
        date: "Apr 2025 – Jun 2025",
        company: "CPNE-TI – Final Project",
        description:
          "Developed a digitised version of \"Guess Who?\" in C#/Raylib, featuring a unique character generation algorithm using DNA profile comparison and a clothing rarity system. Grade: 5.5/6.",
      },
      {
        date: "2023 – present",
        company: "SourShots",
        description:
          "Visual content creation for a local music band: photoshoots, video editing, posters, brochures and social media posts. Tools: Krita, Sony.",
      },
    ],
    languages: [
      { name: "French", level: "Native" },
      { name: "Italian", level: "Native" },
      { name: "English", level: "C1" },
      { name: "German", level: "B2" },
    ],
    education: [
      {
        date: "2022–2025",
        institution: "CPNE-TI",
        description:
          "IT training (Application Development), federal vocational diploma (CFC) and professional baccalaureate",
      },
      {
        date: "2020–2021",
        institution: "Secondary School, Erlach (BE)",
        description: "Full-year German immersion programme",
      },
      {
        date: "2018–2022",
        institution: "Secondary School, Le Landeron (NE)",
        description: "PRIMA bilingual programme (German/French)",
      },
    ],
  },
  de: {
    title: "Applikationsentwickler",
    intro:
      "Diplomierter Applikationsentwickler (EFZ + Berufsmaturität), bereits beschäftigt mit der Entwicklung eines eigenen SaaS-Produkts. Kenntnisse in Full-Stack-Entwicklung, Integration von generativer KI und Drittanbieter-APIs. Viersprachig: Französisch und Italienisch (Muttersprache), Englisch C1, Deutsch B2.",
    sections: {
      contact: "Kontakt",
      experience: "Erfahrung",
      languages: "Sprachen",
      skills: "Kenntnisse",
      education: "Ausbildung",
    },
    contact: {
      location: "La Chaux-de-Fonds, NE",
      email: "leonesachariccardo@gmail.com",
      phone: "+41 78 400 01 68",
      linkedin: "linkedin.com/in/sacha-leone",
      github: "@sacha-riccardo-leone",
    },
    experience: [
      {
        date: "2025 – heute",
        company: "Ordine AI",
        description:
          "Konzeption und Entwicklung eines Full-Stack-SaaS-Produkts: Next.js-Frontend, FastAPI (Python)-Backend, Vektordatenbank, generative KI und Drittanbieter-Integrationen (OAuth, Microsoft-APIs, Google Cloud).",
      },
      {
        date: "Aug. 2025 – Jan. 2026",
        company: "CPNE-AA",
        description:
          "Interdisziplinäre Vertiefung in Design, Mode und Industrie. Einsatz digitaler Werkzeuge für Dokumentenrecherche, Bildbearbeitung und Berechnungen.",
      },
      {
        date: "Apr. 2025 – Jun. 2025",
        company: "CPNE-TI – IPA",
        description:
          "Entwicklung einer digitalisierten Version von \"Wer bin ich?\" in C#/Raylib, mit einem Algorithmus zur Generierung einzigartiger Charaktere durch DNS-Profilvergleich und einem Seltenheitssystem für Kleidung. Note: 5,5/6.",
      },
      {
        date: "2023 – heute",
        company: "SourShots",
        description:
          "Erstellung visueller Inhalte für eine lokale Musikband: Fotoshootings, Videobearbeitung, Plakate, Broschüren und Social-Media-Posts. Tools: Krita, Sony.",
      },
    ],
    languages: [
      { name: "Französisch", level: "Muttersprache" },
      { name: "Italienisch", level: "Muttersprache" },
      { name: "Englisch", level: "C1" },
      { name: "Deutsch", level: "B2" },
    ],
    education: [
      {
        date: "2022–2025",
        institution: "CPNE-TI",
        description:
          "Informatikausbildung (Applikationsentwicklung), EFZ und Berufsmaturität",
      },
      {
        date: "2020–2021",
        institution: "Sekundarschule Erlach (BE)",
        description: "Einjähriges Deutschimmersionsprogramm",
      },
      {
        date: "2018–2022",
        institution: "Sekundarschule Le Landeron (NE)",
        description: "PRIMA (zweisprachiges Programm Deutsch/Französisch)",
      },
    ],
  },
  it: {
    title: "Sviluppatore di Applicazioni",
    intro:
      "Sviluppatore di applicazioni diplomato (AFC + maturità professionale), già impegnato nella progettazione di un prodotto SaaS personale. Competenze in sviluppo full-stack, integrazione di IA generativa e API di terze parti. Quadrilingue: francese e italiano madrelingua, inglese C1, tedesco B2.",
    sections: {
      contact: "Contatto",
      experience: "Esperienza",
      languages: "Lingue",
      skills: "Competenze",
      education: "Formazione",
    },
    contact: {
      location: "La Chaux-de-Fonds, NE",
      email: "leonesachariccardo@gmail.com",
      phone: "+41 78 400 01 68",
      linkedin: "linkedin.com/in/sacha-leone",
      github: "@sacha-riccardo-leone",
    },
    experience: [
      {
        date: "2025 – presente",
        company: "Ordine AI",
        description:
          "Progettazione e sviluppo di un prodotto SaaS full-stack: frontend Next.js, backend FastAPI (Python), database vettoriale, IA generativa e integrazioni di terze parti (OAuth, API Microsoft, Google Cloud).",
      },
      {
        date: "ago. 2025 – gen. 2026",
        company: "CPNE-AA",
        description:
          "Immersione interdisciplinare in design, moda e industria. Utilizzo di strumenti digitali per la ricerca documentale, il ritocco di immagini e i calcoli di progettazione.",
      },
      {
        date: "apr. 2025 – giu. 2025",
        company: "CPNE-TI – LPI",
        description:
          "Sviluppo in C#/Raylib di una versione digitale del gioco \"Indovina chi?\", con un algoritmo di generazione di personaggi unici tramite confronto di profili DNA e un sistema di rarità dell'abbigliamento. Voto: 5,5/6.",
      },
      {
        date: "2023 – presente",
        company: "SourShots",
        description:
          "Creazione di contenuti visivi per un gruppo musicale locale: servizi fotografici, montaggi video, manifesti, brochure e post sui social media. Strumenti: Krita, Sony.",
      },
    ],
    languages: [
      { name: "Francese", level: "Madrelingua" },
      { name: "Italiano", level: "Madrelingua" },
      { name: "Inglese", level: "C1" },
      { name: "Tedesco", level: "B2" },
    ],
    education: [
      {
        date: "2022–2025",
        institution: "CPNE-TI",
        description:
          "Formazione informatica (Sviluppo di applicazioni), AFC e maturità professionale",
      },
      {
        date: "2020–2021",
        institution: "Scuola secondaria di Erlach (BE)",
        description: "Immersione annuale in tedesco",
      },
      {
        date: "2018–2022",
        institution: "Scuola secondaria, Le Landeron (NE)",
        description: "PRIMA (programma bilingue tedesco/francese)",
      },
    ],
  },
};

const skillGroups = [
  { category: { fr: "POO", en: "OOP", de: "OOP", it: "OOP" }, items: ["C#", "PHP"] },
  { category: { fr: "Web", en: "Web", de: "Web", it: "Web" }, items: ["Python", "JavaScript", "HTML/CSS", "FastAPI"] },
  { category: { fr: "Base de données", en: "Databases", de: "Datenbanken", it: "Database" }, items: ["SQL/NoSQL"] },
  { category: { fr: "Outils", en: "Tools", de: "Werkzeuge", it: "Strumenti" }, items: ["Git", "Krita", "Microsoft 365"] },
  { category: { fr: "IA", en: "AI", de: "KI", it: "IA" }, items: ["Meta-prompting", "Few-shot Prompting", "System Prompting"] },
];

/* ────────────────────────────────────────── */

export default function MainComponentNameCv() {
  const [lang, setLang] = useState<Lang>("fr");
  const [phase, setPhase] = useState<Phase>("cursor");
  const [displayedName, setDisplayedName] = useState("");
  const t = translations[lang];

  // Step 1 — show cursor alone for 700ms
  useEffect(() => {
    const timer = setTimeout(() => setPhase("typing"), 700);
    return () => clearTimeout(timer);
  }, []);

  // Step 2 — type out the name character by character
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

  const fadeIn = (delay: number) => ({
    opacity: phase === "done" ? 1 : 0,
    transition: `opacity 0.7s ease ${delay}ms`,
  });

  /* Cursor element */
  const cursor = phase !== "done" && (
    <span className="cursor-blink inline-block w-[2px] h-[0.75em] bg-white ml-[3px] align-middle" />
  );

  /* Reusable section heading for web */
  const SectionHead = ({ title, num }: { title: string; num: string }) => (
    <div className="flex items-baseline justify-between border-b border-white/25 pb-1.5 mb-5">
      <span className="text-[11px] uppercase tracking-[0.15em] font-medium">{title}</span>
      <span className="text-[11px] text-white/40">{num}</span>
    </div>
  );

  /* Profile picture with corner brackets */
  const ProfilePic = ({ size }: { size: string }) => (
    <div className={`relative shrink-0 ${size}`} data-name="Elements">
      <div className="absolute inset-0 overflow-hidden rounded-sm ring-1 ring-white/25">
        <img
          src={profilePic}
          alt="Sacha Riccardo Leone"
          className="size-full object-cover"
          style={{ transform: "scale(1)" }}
        />
      </div>
      <span className="absolute -top-[5px] -left-[5px] w-[16px] h-[16px] border-t-2 border-l-2 border-white/80" />
      <span className="absolute -top-[5px] -right-[5px] w-[16px] h-[16px] border-t-2 border-r-2 border-white/80" />
      <span className="absolute -bottom-[5px] -left-[5px] w-[16px] h-[16px] border-b-2 border-l-2 border-white/80" />
      <span className="absolute -bottom-[5px] -right-[5px] w-[16px] h-[16px] border-b-2 border-r-2 border-white/80" />
    </div>
  );

  /* Lang + print controls */
  const Controls = ({ className = "" }: { className?: string }) => (
    <div className={`print-hidden flex items-center gap-2 ${className}`}>
      <button
        onClick={() => window.print()}
        className="flex items-center gap-1.5 text-[10px] font-['Space_Grotesk',sans-serif] uppercase px-2.5 py-1.5 rounded-sm text-white border border-white/30 hover:border-white/70 transition-colors cursor-pointer"
      >
        <Printer className="h-3 w-3" />
        PDF
      </button>
      <div className="w-px h-4 bg-white/20" />
      {(["fr", "en", "de", "it"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`text-[10px] font-['Space_Grotesk',sans-serif] uppercase px-2.5 py-1.5 rounded-sm transition-colors cursor-pointer ${
            lang === l
              ? "bg-white text-[#262626]"
              : "text-white border border-white/30 hover:border-white/70"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );

  return (
    <>
      {/* ═══════════════════════════════════════════
          WEB LAYOUT — responsive, horizontal
          ═══════════════════════════════════════════ */}
      <div className="print-hidden min-h-screen bg-[#262626] text-white font-['Space_Grotesk',sans-serif]">
        <div className="max-w-7xl mx-auto px-5 py-8 sm:px-8 sm:py-10 md:px-10 md:py-14 lg:px-16 lg:py-16">

          {/* Controls — top right */}
          <div className="flex justify-end mb-8" style={fadeIn(0)}>
            <Controls />
          </div>

          {/* Header: photo + name + intro */}
          <header className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 mb-12 md:mb-14">
            <div style={fadeIn(0)}>
              <ProfilePic size="size-36 sm:size-40 md:size-44" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight">
                {displayedName}
                {cursor}
              </h1>
              <p className="text-base lg:text-lg mt-2 text-white/70" style={fadeIn(0)}>
                {t.title}
              </p>
              <p
                className="text-sm leading-relaxed mt-4 max-w-2xl text-white/50"
                style={fadeIn(150)}
              >
                {t.intro}
              </p>
            </div>
          </header>

          {/* Sections grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1.5fr_1fr_1fr] gap-8 lg:gap-10"
            style={fadeIn(300)}
          >
            {/* ── Contact + Education ── */}
            <section>
              <SectionHead title={t.sections.contact} num="01" />
              <div className="space-y-3 text-xs uppercase mb-8">
                <p>{t.contact.location}</p>
                <p>{t.contact.email}</p>
                <p>{t.contact.phone}</p>
                <a href={`https://${t.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white underline">
                  <Linkedin className="h-3.5 w-3.5 shrink-0" />
                  <p>{t.contact.linkedin}</p>
                </a>
                <div className="flex items-center gap-2">
                  <Github className="h-3.5 w-3.5 shrink-0" />
                  <p>{t.contact.github}</p>
                </div>
              </div>

              <SectionHead title={t.sections.education} num="02" />
              <div className="space-y-5">
                {t.education.map((edu, i) => (
                  <div key={i}>
                    <p className="text-[11px] text-white/40 capitalize">{edu.date}</p>
                    <p className="text-sm font-medium mt-1">{edu.institution}</p>
                    <p className="text-[13px] text-white/60 leading-relaxed mt-1">
                      {edu.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Experience ── */}
            <section>
              <SectionHead title={t.sections.experience} num="03" />
              <div className="space-y-6">
                {t.experience.map((exp, i) => (
                  <div key={i}>
                    <p className="text-[11px] text-white/40 capitalize">{exp.date}</p>
                    <p className="text-sm font-medium mt-1">{exp.company}</p>
                    <p className="text-[13px] text-white/60 leading-relaxed mt-1">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Skills + Languages ── */}
            <section>
              <SectionHead title={t.sections.skills} num="04" />

              <div className="space-y-4 mb-8">
                {skillGroups.map((group, i) => (
                  <div key={i}>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-white/35 mb-2">{group.category[lang]}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((skill, j) => (
                        <span
                          key={j}
                          className="text-[12px] px-2.5 py-1 rounded bg-white/5 border border-white/10"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <SectionHead title={t.sections.languages} num="05" />
              <div className="space-y-2.5">
                {t.languages.map((language, i) => (
                  <div key={i} className="flex justify-between text-[13px]">
                    <span>{language.name}</span>
                    <span className="text-white/50">{language.level}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          PRINT LAYOUT — A4 portrait, fixed positioning
          ═══════════════════════════════════════════ */}
      <div className="print-only">
        <div
          className="bg-[#262626] relative"
          style={{ width: "210mm", minHeight: "297mm" }}
          data-name="Main Component - Name - CV"
        >
          {/* Name + Columns */}
          <div
            className="absolute content-stretch flex flex-col gap-[25px] items-start left-[calc(33.33%+14.67px)] top-[61px]"
            data-name="Name + Columns"
          >
            {/* Name */}
            <div className="flex flex-col font-['Space_Grotesk',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[40px] text-white w-[358px]">
              <p className="leading-[32px]">{FULL_NAME}</p>
              <p className="leading-[20px] text-[16px] mt-2">{t.title}</p>
            </div>

            {/* Intro */}
            <div className="font-['Space_Grotesk',sans-serif] font-normal not-italic relative shrink-0 text-[9px] text-white w-[358px]">
              <p className="leading-[150%]">{t.intro}</p>
            </div>

            {/* Column 2 + 3 */}
            <div
              className="content-stretch flex gap-[20px] items-start relative shrink-0"
              data-name="Column 2 + 3"
            >
              {/* Column 2 — Experience + Languages */}
              <div
                className="content-stretch flex flex-col gap-[33px] items-start relative shrink-0"
                data-name="Column 2"
              >
                {/* Experience */}
                <div
                  className="content-stretch flex flex-col gap-[18px] items-start relative shrink-0"
                  data-name="Experience"
                >
                  <div
                    className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
                    data-name="Headline"
                  >
                    <div
                      className="separator bg-white col-1 h-[0.5px] ml-0 mt-[16px] row-1 w-[169px]"
                      data-name="Separator"
                    />
                    <p className="col-1 font-['Space_Grotesk',sans-serif] leading-[normal] ml-0 mt-0 not-italic relative row-1 text-[9px] text-white uppercase whitespace-nowrap">
                      {t.sections.experience}
                    </p>
                    <p className="col-1 font-['Space_Grotesk',sans-serif] leading-[normal] ml-[152px] mt-0 not-italic relative row-1 text-[9px] text-right text-white uppercase whitespace-nowrap">
                      02
                    </p>
                  </div>
                  {t.experience.map((exp, i) => (
                    <div
                      key={i}
                      className="content-stretch flex flex-col gap-[5px] items-start not-italic relative shrink-0 text-white"
                      data-name="Experience"
                    >
                      <p className="capitalize font-['Space_Grotesk',sans-serif] font-normal leading-[normal] relative shrink-0 text-[8px] w-[169px] whitespace-pre-wrap">
                        {exp.date}
                      </p>
                      <p className="font-['Space_Grotesk',sans-serif] font-medium leading-[normal] relative shrink-0 text-[12px] w-[169px]">
                        {exp.company}
                      </p>
                      <p className="font-['Space_Grotesk',sans-serif] font-normal leading-[115.69953155517578%] relative shrink-0 text-[9px] w-[169px]">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Languages */}
                <div
                  className="content-stretch flex flex-col gap-[15px] items-start relative shrink-0"
                  data-name="Languages"
                >
                  <div
                    className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0"
                    data-name="Headline"
                  >
                    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
                      <div
                        className="separator bg-white col-1 h-[0.5px] ml-0 mt-[16px] row-1 w-[169px]"
                        data-name="Separator"
                      />
                      <p className="col-1 font-['Space_Grotesk',sans-serif] leading-[normal] ml-0 mt-0 not-italic relative row-1 text-[9px] text-white uppercase whitespace-nowrap">
                        {t.sections.languages}
                      </p>
                      <p className="col-1 font-['Space_Grotesk',sans-serif] leading-[normal] ml-[152px] mt-0 not-italic relative row-1 text-[9px] text-right text-white uppercase whitespace-nowrap">
                        03
                      </p>
                    </div>
                  </div>
                  <div
                    className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0"
                    data-name="Languages"
                  >
                    {t.languages.map((language, i) => (
                      <div
                        key={i}
                        className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0"
                        data-name="Language"
                      >
                        <div className="col-1 font-['Space_Grotesk',sans-serif] font-normal grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 not-italic place-items-start relative row-1 text-[9px] text-white">
                          <p className="col-1 leading-[115.69953155517578%] ml-0 mt-0 relative row-1 w-[126px]">
                            {language.name}
                          </p>
                          <p className="col-1 leading-[115.69953155517578%] ml-[95px] mt-0 relative row-1 text-right w-[74px]">
                            {language.level}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Column 3 — Skills + Education */}
              <div
                className="content-stretch flex flex-col gap-[32px] items-start leading-[0] relative shrink-0"
                data-name="Column 3"
              >
                {/* Skills */}
                <div
                  className="content-stretch flex flex-col gap-[15px] items-start relative shrink-0"
                  data-name="Skills"
                >
                  <div
                    className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0"
                    data-name="Headline"
                  >
                    <div
                      className="separator bg-white col-1 h-[0.5px] ml-0 mt-[16px] row-1 w-[169px]"
                      data-name="Separator"
                    />
                    <p className="col-1 font-['Space_Grotesk',sans-serif] leading-[normal] ml-0 mt-0 not-italic relative row-1 text-[9px] text-white uppercase whitespace-nowrap">
                      {t.sections.skills}
                    </p>
                    <p className="col-1 font-['Space_Grotesk',sans-serif] leading-[normal] ml-[151px] mt-0 not-italic relative row-1 text-[9px] text-right text-white uppercase whitespace-nowrap">
                      04
                    </p>
                  </div>
                  <div
                    className="content-stretch flex flex-col font-['Space_Grotesk',sans-serif] font-normal gap-[10px] items-start not-italic relative shrink-0 text-[9px] text-white"
                    data-name="Skills"
                  >
                    {skillGroups.map((group, i) => (
                      <div key={i}>
                        <p className="text-[7px] uppercase tracking-[0.1em] text-white/50 mb-[4px]">{group.category[lang]}</p>
                        <p className="leading-[150%] w-[169px]">{group.items.join(" · ")}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div
                  className="content-stretch flex flex-col gap-[15px] items-start relative shrink-0"
                  data-name="Education"
                >
                  <div
                    className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0"
                    data-name="Headline"
                  >
                    <div
                      className="separator bg-white col-1 h-[0.5px] ml-0 mt-[16px] row-1 w-[169px]"
                      data-name="Separator"
                    />
                    <p className="col-1 font-['Space_Grotesk',sans-serif] leading-[normal] ml-0 mt-0 not-italic relative row-1 text-[9px] text-white uppercase whitespace-nowrap">
                      {t.sections.education}
                    </p>
                    <p className="col-1 font-['Space_Grotesk',sans-serif] leading-[normal] ml-[152px] mt-0 not-italic relative row-1 text-[9px] text-right text-white uppercase whitespace-nowrap">
                      05
                    </p>
                  </div>
                  {t.education.map((edu, i) => (
                    <div
                      key={i}
                      className="content-stretch flex flex-col gap-[5px] items-start not-italic relative shrink-0 text-white"
                      data-name="Education"
                    >
                      <p className="capitalize font-['Space_Grotesk',sans-serif] font-normal leading-[normal] relative shrink-0 text-[8px] w-[169px]">
                        {edu.date}
                      </p>
                      <p className="font-['Space_Grotesk',sans-serif] font-medium leading-[normal] relative shrink-0 text-[12px] w-[169px]">
                        {edu.institution}
                      </p>
                      <p className="font-['Space_Grotesk',sans-serif] font-normal leading-[115.69953155517578%] relative shrink-0 text-[9px] w-[169px]">
                        {edu.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Column 1 — Contact */}
          <div
            className="absolute content-stretch flex flex-col gap-[18px] items-start leading-[0] left-[24px] top-[248px]"
            data-name="Column 1"
          >
            <div
              className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0"
              data-name="Headline"
            >
              <div
                className="separator bg-white col-1 h-[0.5px] ml-0 mt-[16px] row-1 w-[169px]"
                data-name="Separator"
              />
              <p className="col-1 font-['Space_Grotesk',sans-serif] leading-[normal] ml-0 mt-0 not-italic relative row-1 text-[9px] text-white uppercase whitespace-nowrap">
                {t.sections.contact}
              </p>
              <p className="col-1 font-['Space_Grotesk',sans-serif] leading-[normal] ml-[154px] mt-0 not-italic relative row-1 text-[9px] text-right text-white uppercase whitespace-nowrap">
                01
              </p>
            </div>
            <div
              className="content-stretch flex flex-col font-['Space_Grotesk',sans-serif] gap-[8px] items-start not-italic relative shrink-0 text-[8px] text-white uppercase"
              data-name="Contacts"
            >
              <div className="flex flex-col justify-center relative shrink-0 w-[169px]">
                <p className="leading-[normal]">{t.contact.location}</p>
              </div>
              <div className="flex flex-col justify-center relative shrink-0 w-[169px]">
                <p className="leading-[normal]">{t.contact.email}</p>
              </div>
              <div className="flex flex-col justify-center relative shrink-0 w-[169px]">
                <p className="leading-[normal]">{t.contact.phone}</p>
              </div>
              <a href={`https://${t.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 relative shrink-0 w-[169px] text-white underline">
                <Linkedin className="h-3.5 w-3.5" />
                <p className="leading-[normal]">{t.contact.linkedin}</p>
              </a>
              <div className="flex items-center gap-2 relative shrink-0 w-[169px]">
                <Github className="h-3.5 w-3.5" />
                <p className="leading-[normal]">{t.contact.github}</p>
              </div>
            </div>
          </div>

          {/* Profile picture */}
          <div
            className="absolute left-[24px] top-[51px] size-[165px]"
            data-name="Elements"
          >
            <div className="absolute inset-0 overflow-hidden rounded-sm ring-1 ring-white/25">
              <img
                src={profilePic}
                alt="Sacha Riccardo Leone"
                className="size-full object-cover"
                style={{ transform: "scale(1)" }}
              />
            </div>
            <span className="absolute -top-[5px] -left-[5px] w-[16px] h-[16px] border-t-2 border-l-2 border-white/80" />
            <span className="absolute -top-[5px] -right-[5px] w-[16px] h-[16px] border-t-2 border-r-2 border-white/80" />
            <span className="absolute -bottom-[5px] -left-[5px] w-[16px] h-[16px] border-b-2 border-l-2 border-white/80" />
            <span className="absolute -bottom-[5px] -right-[5px] w-[16px] h-[16px] border-b-2 border-r-2 border-white/80" />
          </div>
        </div>
      </div>
    </>
  );
}
