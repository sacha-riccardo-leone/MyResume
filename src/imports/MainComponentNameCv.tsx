import { useState, useEffect, useRef } from "react";
import { Linkedin, Github, Printer, MapPin, Mail, Phone, ChevronDown } from "lucide-react";
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
        date: "4–24 mai 2026",
        company: "Xefi",
        description:
          "Stage en ESN — pilotage et configuration d'un déploiement Odoo 19 : analyse fonctionnelle, paramétrage des modules métier et gestion de projet client.",
      },
      {
        date: "2025 – présent",
        company: "Ordine AI",
        description:
          "Conception et développement d'un produit SaaS full-stack : frontend Next.js, backend FastAPI (Python), base de données vectorielle, IA générative et intégrations tierces (OAuth, APIs Microsoft, Google Cloud).",
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
          "Immersion interdisciplinaire en design, couture et industrie. Utilisation d'outils numériques pour la recherche documentaire, la retouche d'image et les calculs de conception.",
      },
      {
        date: "2023 – présent",
        company: "SourShots",
        description:
          "Création de contenus visuels pour un groupe de musique local : photoshoots, montages vidéo, affiches, brochures et posts réseaux sociaux. Outils : Krita, Sony.",
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
        institution: "École secondaire — Le Landeron (NE) & Erlach (BE)",
        description: "PRIMA bilingue FR/DE · Immersion 100% allemand à Erlach (BE)",
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
        date: "4–24 May 2026",
        company: "Xefi",
        description:
          "Internship at an IT services firm — led configuration of an Odoo 19 ERP deployment: functional analysis, business module setup and client project management.",
      },
      {
        date: "2025 – present",
        company: "Ordine AI",
        description:
          "Design and development of a full-stack SaaS product: Next.js frontend, FastAPI (Python) backend, vector database, generative AI and third-party integrations (OAuth, Microsoft APIs, Google Cloud).",
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
          "Interdisciplinary immersion in design, fashion and industry. Use of digital tools for documentation, image editing and measurement calculations.",
      },
      {
        date: "2023 – present",
        company: "SourShots",
        description:
          "Visual content creation for a local music band: photoshoots, video editing, posters, brochures and social media posts. Tools: Krita, Sony.",
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
        institution: "Secondary School — Le Landeron (NE) & Erlach (BE)",
        description: "PRIMA bilingual programme (FR/DE) · 100% German immersion in Erlach (BE)",
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
        date: "4.–24. Mai 2026",
        company: "Xefi",
        description:
          "Praktikum bei einem IT-Dienstleister — Steuerung und Konfiguration eines Odoo-19-ERP-Deployments: Funktionsanalyse, Modulkonfiguration und Projektmanagement.",
      },
      {
        date: "2025 – heute",
        company: "Ordine AI",
        description:
          "Konzeption und Entwicklung eines Full-Stack-SaaS-Produkts: Next.js-Frontend, FastAPI (Python)-Backend, Vektordatenbank, generative KI und Drittanbieter-Integrationen (OAuth, Microsoft-APIs, Google Cloud).",
      },
      {
        date: "Apr. 2025 – Jun. 2025",
        company: "CPNE-TI – IPA",
        description:
          "Entwicklung einer digitalisierten Version von \"Wer bin ich?\" in C#/Raylib, mit einem Algorithmus zur Generierung einzigartiger Charaktere durch DNS-Profilvergleich und einem Seltenheitssystem für Kleidung. Note: 5,5/6.",
      },
      {
        date: "Aug. 2025 – Jan. 2026",
        company: "CPNE-AA",
        description:
          "Interdisziplinäre Vertiefung in Design, Mode und Industrie. Einsatz digitaler Werkzeuge für Dokumentenrecherche, Bildbearbeitung und Berechnungen.",
      },
      {
        date: "2023 – heute",
        company: "SourShots",
        description:
          "Erstellung visueller Inhalte für eine lokale Musikband: Fotoshootings, Videobearbeitung, Plakate, Broschüren und Social-Media-Posts. Tools: Krita, Sony.",
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
        institution: "Sekundarschule — Le Landeron (NE) & Erlach (BE)",
        description: "PRIMA (FR/DE) · 100% Deutschimmersion in Erlach (BE)",
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
        date: "4–24 maggio 2026",
        company: "Xefi",
        description:
          "Stage presso un'ESN — configurazione e gestione di un deployment Odoo 19: analisi funzionale, parametrizzazione dei moduli aziendali e gestione del progetto cliente.",
      },
      {
        date: "2025 – presente",
        company: "Ordine AI",
        description:
          "Progettazione e sviluppo di un prodotto SaaS full-stack: frontend Next.js, backend FastAPI (Python), database vettoriale, IA generativa e integrazioni di terze parti (OAuth, API Microsoft, Google Cloud).",
      },
      {
        date: "apr. 2025 – giu. 2025",
        company: "CPNE-TI – LPI",
        description:
          "Sviluppo in C#/Raylib di una versione digitale del gioco \"Indovina chi?\", con un algoritmo di generazione di personaggi unici tramite confronto di profili DNA e un sistema di rarità dell'abbigliamento. Voto: 5,5/6.",
      },
      {
        date: "ago. 2025 – gen. 2026",
        company: "CPNE-AA",
        description:
          "Immersione interdisciplinare in design, moda e industria. Utilizzo di strumenti digitali per la ricerca documentale, il ritocco di immagini e i calcoli di progettazione.",
      },
      {
        date: "2023 – presente",
        company: "SourShots",
        description:
          "Creazione di contenuti visivi per un gruppo musicale locale: servizi fotografici, montaggi video, manifesti, brochure e post sui social media. Strumenti: Krita, Sony.",
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
        institution: "Scuola secondaria — Le Landeron (NE) & Erlach (BE)",
        description: "PRIMA bilingue FR/DE · Immersione 100% tedesco a Erlach (BE)",
      },
    ],
  },
};

const skillGroups = [
  {
    category: { fr: "POO", en: "OOP", de: "OOP", it: "OOP" },
    color: "#60a5fa",
    items: [
      { name: "C#", level: 80 },   // 4/5
      { name: "PHP", level: 75 },  // 4/5
    ],
  },
  {
    category: { fr: "Web", en: "Web", de: "Web", it: "Web" },
    color: "#34d399",
    items: [
      { name: "Python", level: 60 },      // 3/5
      { name: "JavaScript", level: 65 },  // 3/5
      { name: "HTML/CSS", level: 85 },    // 4/5
      { name: "FastAPI", level: 60 },     // 3/5
    ],
  },
  {
    category: { fr: "Base de données", en: "Databases", de: "Datenbanken", it: "Database" },
    color: "#fbbf24",
    items: [{ name: "SQL/NoSQL", level: 60 }],  // 3/5
  },
  {
    category: { fr: "Outils", en: "Tools", de: "Werkzeuge", it: "Strumenti" },
    color: "#a78bfa",
    items: [
      { name: "Git", level: 82 },           // 4/5
      { name: "Krita", level: 95 },         // 5/5
      { name: "Microsoft 365", level: 95 },  // 5/5
    ],
  },
  {
    category: { fr: "IA", en: "AI", de: "KI", it: "IA" },
    color: "#22d3ee",
    items: [
      { name: "Meta-prompting", level: 82 },
      { name: "Few-shot Prompting", level: 78 },
      { name: "System Prompting", level: 80 },
    ],
  },
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
        return (
          <div
            key={i}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: "50%",
              background: isFull
                ? color
                : isHalf
                ? `linear-gradient(to right, ${color} 50%, ${emptyColor} 50%)`
                : emptyColor,
              flexShrink: 0,
            }}
          />
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
                <SkillDots filled={Math.round(skill.level / 20)} color={group.color} />
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
                  <p className="text-sm leading-relaxed mt-4 max-w-xl text-white/30" style={fadeIn(250)}>
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
          <div className="flex justify-center pb-8" style={fadeIn(600)}>
            <ChevronDown className="h-5 w-5 text-white/20 animate-bounce" />
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

          {/* 03 — Skills (dots) */}
          <ScrollReveal>
            <SectionHead title={t.sections.skills} num="03" />
            <SkillSection groups={skillGroups} lang={lang} />
          </ScrollReveal>

          {/* 04 — Languages (dots) */}
          <ScrollReveal>
            <SectionHead title={t.sections.languages} num="04" />
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
              <SectionHead title={t.sections.education} num="05" />
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
          PRINT LAYOUT — A4 portrait, fixed positioning
          ═══════════════════════════════════════════════════════ */}
      <div className="print-only">
        <div
          className="bg-[#262626] relative"
          style={{ width: "210mm", height: "297mm", overflow: "hidden" }}
          data-name="Main Component - Name - CV"
        >
          {/* Name + Columns */}
          <div
            className="absolute content-stretch flex flex-col gap-[25px] items-start left-[calc(33.33%+14.67px)] top-[61px]"
            data-name="Name + Columns"
          >
            {/* Name */}
            <div className="flex flex-col font-['Geist',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[40px] text-white w-[358px]">
              <p className="leading-[32px]">{FULL_NAME}</p>
              <p className="leading-[20px] text-[16px] mt-2">{t.title}</p>
            </div>

            {/* Intro */}
            <div className="font-['Geist',sans-serif] font-normal not-italic relative shrink-0 text-[9px] text-white w-[358px]">
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
                    <p className="col-1 font-['Geist',sans-serif] leading-[normal] ml-0 mt-0 not-italic relative row-1 text-[9px] text-white uppercase whitespace-nowrap">
                      {t.sections.experience}
                    </p>
                    <p className="col-1 font-['Geist',sans-serif] leading-[normal] ml-[152px] mt-0 not-italic relative row-1 text-[9px] text-right text-white uppercase whitespace-nowrap">
                      02
                    </p>
                  </div>
                  {t.experience.map((exp, i) => (
                    <div
                      key={i}
                      className="content-stretch flex flex-col gap-[5px] items-start not-italic relative shrink-0 text-white"
                      data-name="Experience"
                    >
                      <p className="capitalize font-['Geist',sans-serif] font-normal leading-[normal] relative shrink-0 text-[8px] w-[169px] whitespace-pre-wrap">
                        {exp.date}
                      </p>
                      <p className="font-['Geist',sans-serif] font-medium leading-[normal] relative shrink-0 text-[12px] w-[169px]">
                        {exp.company}
                      </p>
                      <p className="font-['Geist',sans-serif] font-normal leading-[115.69953155517578%] relative shrink-0 text-[9px] w-[169px]">
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
                      <p className="col-1 font-['Geist',sans-serif] leading-[normal] ml-0 mt-0 not-italic relative row-1 text-[9px] text-white uppercase whitespace-nowrap">
                        {t.sections.languages}
                      </p>
                      <p className="col-1 font-['Geist',sans-serif] leading-[normal] ml-[152px] mt-0 not-italic relative row-1 text-[9px] text-right text-white uppercase whitespace-nowrap">
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
                        className="flex items-center justify-between w-[169px]"
                        data-name="Language"
                      >
                        <div className="font-['Geist',sans-serif] font-normal not-italic text-white">
                          <p className="text-[9px] leading-[130%]">{language.name}</p>
                          <p className="text-[7px] leading-[130%] text-white/50">{language.level}</p>
                        </div>
                        <SkillDots filled={getLangDots(language.level)} color="rgba(255,255,255,0.85)" emptyColor="rgba(255,255,255,0.18)" size={5} gap={3} />
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
                    <p className="col-1 font-['Geist',sans-serif] leading-[normal] ml-0 mt-0 not-italic relative row-1 text-[9px] text-white uppercase whitespace-nowrap">
                      {t.sections.skills}
                    </p>
                    <p className="col-1 font-['Geist',sans-serif] leading-[normal] ml-[151px] mt-0 not-italic relative row-1 text-[9px] text-right text-white uppercase whitespace-nowrap">
                      04
                    </p>
                  </div>
                  <div
                    className="content-stretch flex flex-col font-['Geist',sans-serif] font-normal gap-[10px] items-start not-italic relative shrink-0 text-[9px] text-white"
                    data-name="Skills"
                  >
                    {skillGroups.map((group, i) => (
                      <div key={i}>
                        <p className="text-[7px] uppercase tracking-[0.1em] text-white/50 mb-[4px]">{group.category[lang]}</p>
                        <div className="flex flex-col gap-[4px]">
                          {group.items.map((skill, si) => (
                            <div key={si} className="flex items-center justify-between w-[169px]">
                              <span className="text-[9px]">{skill.name}</span>
                              <SkillDots filled={Math.round(skill.level / 20)} color={group.color} emptyColor="rgba(255,255,255,0.18)" size={5} gap={3} />
                            </div>
                          ))}
                        </div>
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
                    <p className="col-1 font-['Geist',sans-serif] leading-[normal] ml-0 mt-0 not-italic relative row-1 text-[9px] text-white uppercase whitespace-nowrap">
                      {t.sections.education}
                    </p>
                    <p className="col-1 font-['Geist',sans-serif] leading-[normal] ml-[152px] mt-0 not-italic relative row-1 text-[9px] text-right text-white uppercase whitespace-nowrap">
                      05
                    </p>
                  </div>
                  {t.education.map((edu, i) => (
                    <div
                      key={i}
                      className="content-stretch flex flex-col gap-[5px] items-start not-italic relative shrink-0 text-white"
                      data-name="Education"
                    >
                      <p className="capitalize font-['Geist',sans-serif] font-normal leading-[normal] relative shrink-0 text-[8px] w-[169px]">
                        {edu.date}
                      </p>
                      <p className="font-['Geist',sans-serif] font-medium leading-[normal] relative shrink-0 text-[12px] w-[169px]">
                        {edu.institution}
                      </p>
                      <p className="font-['Geist',sans-serif] font-normal leading-[115.69953155517578%] relative shrink-0 text-[9px] w-[169px]">
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
              <p className="col-1 font-['Geist',sans-serif] leading-[normal] ml-0 mt-0 not-italic relative row-1 text-[9px] text-white uppercase whitespace-nowrap">
                {t.sections.contact}
              </p>
              <p className="col-1 font-['Geist',sans-serif] leading-[normal] ml-[154px] mt-0 not-italic relative row-1 text-[9px] text-right text-white uppercase whitespace-nowrap">
                01
              </p>
            </div>
            <div
              className="content-stretch flex flex-col font-['Geist',sans-serif] gap-[8px] items-start not-italic relative shrink-0 text-[8px] text-white uppercase"
              data-name="Contacts"
            >
              <div className="flex items-center gap-2 relative shrink-0 w-[169px]">
                <MapPin className="h-3 w-3 shrink-0" />
                <p className="leading-[normal]">{t.contact.location}</p>
              </div>
              <div className="flex items-center gap-2 relative shrink-0 w-[169px]">
                <Mail className="h-3 w-3 shrink-0" />
                <p className="leading-[normal]">{t.contact.email}</p>
              </div>
              <div className="flex items-center gap-2 relative shrink-0 w-[169px]">
                <Phone className="h-3 w-3 shrink-0" />
                <p className="leading-[normal]">{t.contact.phone}</p>
              </div>
              <a href={`https://${t.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 relative shrink-0 w-[169px] text-white underline">
                <Linkedin className="h-3.5 w-3.5" />
                <p className="leading-[normal]">{t.contact.linkedin}</p>
              </a>
              <a href={`https://github.com/${t.contact.github.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 relative shrink-0 w-[169px] text-white underline">
                <Github className="h-3.5 w-3.5" />
                <p className="leading-[normal]">{t.contact.github}</p>
              </a>
            </div>
          </div>

          {/* Profile picture */}
          <div
            className="absolute left-[24px] top-[51px] size-[165px]"
            data-name="Elements"
          >
            <div className="absolute inset-0 overflow-hidden rounded-2xl ring-2 ring-white/25">
              <img
                src={profilePic}
                alt="Sacha Riccardo Leone"
                className="size-full object-cover"
                style={{ transform: "scale(1)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
