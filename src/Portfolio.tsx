import { useState, useEffect, type FormEvent } from "react";

/**
 * Portfolio – Ezra Fanantenana Rakotoarimanga
 *
 * INSTALLATION
 * 1. Tailwind CSS (v3 ou v4) déjà configuré dans votre projet React/Vite.
 * 2. Dans index.html, ajoutez dans <head> :
 *    <title>Ezra Rakotoarimanga · Développeur IA & full-stack</title>
 *    <meta name="description" content="Agents IA, automatisation et applications web pour l'agriculture et les PME. 1er prix Hack4Dev 2026." />
 *    <meta property="og:title" content="Ezra Rakotoarimanga · Développeur IA & full-stack" />
 *    <meta property="og:description" content="Agents IA, automatisation et applications web pour l'agriculture et les PME." />
 *    <meta property="og:image" content="https://VOTRE-DOMAINE/profile.png" />
 *    <link rel="preconnect" href="https://fonts.googleapis.com">
 *    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
 * 3. Photo dans /public/profile.png
 */

// ───────────────────────── CONTENU & TRADUCTIONS ─────────────────────────

export type Lang = "fr" | "en";

const PROFILE = {
  name: "Ezra Fanantenana Rakotoarimanga",
  handle: "rakotna",
  email: "fanantenanaezra@gmail.com",
  github: "https://github.com/rakotna",
  linkedin: "https://www.linkedin.com/in/rakotoarimanga-ezra-fanantenana-85b7093a3/",
  photo: "/profile.png",
  location: "Antananarivo, Madagascar",
};

type Project = {
  name: string;
  tag: string;
  text: string;
  stack: string[];
  links: { label: string; href: string }[];
};

type Content = {
  title: string;
  pitch: string;
  availability: string;
  nav: { href: string; label: string }[];
  ctaProjects: string;
  ctaContact: string;
  facts: { value: string; label: string }[];
  sections: {
    projects: string;
    services: string;
    journey: string;
    education: string;
    recognition: string;
    contact: string;
  };
  moreProjects: string;
  services: { title: string; text: string }[];
  projects: Project[];
  skills: Record<string, string[]>;
  education: { title: string; place: string; period: string }[];
  recognition: string[];
  contactText: string;
  form: {
    terminal: string;
    name: string;
    email: string;
    project: string;
    placeholder: string;
    submit: string;
    opened: string;
  };
};

const CONTENT: Record<Lang, Content> = {
  fr: {
    title: "Développeur IA & full-stack",
    pitch:
      "Je conçois des agents IA, des outils d'automatisation et des applications web pour l'agriculture et les PME. Du prototype au déploiement.",
    availability: "Disponible · Antananarivo, Madagascar · à distance",
    nav: [
      { href: "#projets", label: "Projets" },
      { href: "#services", label: "Services" },
      { href: "#parcours", label: "Parcours" },
      { href: "#contact", label: "Contact" },
    ],
    ctaProjects: "Voir mes projets",
    ctaContact: "Me contacter",
    facts: [
      { value: "1 240+", label: "tests automatisés sur Irooa" },
      { value: "F1 0,97", label: "reconnaissance manuscrite, ScolarAI" },
      { value: "3 podiums", label: "Hack4Dev et hackathons (2025–2026)" },
    ],
    sections: {
      projects: "Projets",
      services: "Services",
      journey: "Parcours",
      education: "Formation",
      recognition: "Distinctions et certifications",
      contact: "Contact",
    },
    moreProjects: "Autres projets et code source sur",
    services: [
      {
        title: "Agents IA et automatisation",
        text: "Agents connectés à vos outils (Pydantic AI, MCP, n8n, Make), recherche web, traitement de documents, tâches répétitives supprimées.",
      },
      {
        title: "Sites web et applications",
        text: "Sites vitrines, boutiques en ligne, tableaux de bord et applications mobiles avec React, Angular, Django, FastAPI, Spring Boot et Flutter.",
      },
      {
        title: "Données, satellite et IA appliquée",
        text: "Modèles de prédiction, vision par ordinateur et imagerie satellitaire. Collecte de données publiques dans le respect des conditions d'utilisation.",
      },
    ],
    projects: [
      {
        name: "Irooa",
        tag: "Marketplace agricole B2B",
        text: "Plateforme complète avec agents IA autonomes : streaming, outils dynamiques, recherche web via SearXNG privé, serveur MCP. Sécurité (JWT HttpOnly, CSRF, TOTP) et 1 240+ tests. Migration vers AWS en cours.",
        stack: ["Django", "FastAPI", "Pydantic AI", "React", "PostgreSQL", "Docker"],
        links: [{ label: "Voir la démo", href: "https://irooa.com" }],
      },
      {
        name: "Arovoly",
        tag: "Prototype · Télédétection agricole",
        text: "Modèle d'IA qui estime la production selon la culture, la variété de semence, la saison, la météo et l'engrais, à partir de données satellitaires. Traçabilité des cultures incluse. Déployé en ligne.",
        stack: ["Python", "Remote sensing", "Machine Learning", "Vercel", "Render"],
        links: [
          { label: "Voir la démo", href: "https://arovoly.vercel.app" },
          { label: "Code", href: "https://github.com/rakotna/arovoly" },
        ],
      },
      {
        name: "Hack4Dev 2026",
        tag: "1er prix · Orange Digital Center",
        text: "Classification de l'âge des bâtiments à partir de séries temporelles satellitaires Landsat. Prix Low-Data F1 et Best Average F1. Notebook reproductible livré.",
        stack: ["LightGBM", "Landsat", "Python", "Séries temporelles"],
        links: [
          {
            label: "Notebook Kaggle",
            href: "https://www.kaggle.com/code/fanantenanaezra/building-age-classification",
          },
        ],
      },
      {
        name: "ScolarAI",
        tag: "Projet de Master · Vision par ordinateur",
        text: "Numérisation automatique de feuilles d'examen et de bulletins. TrOCR affiné sur l'écriture et les noms malgaches : F1 de 0,97 en reconnaissance, 0,85 sur le pipeline complet.",
        stack: ["YOLO11", "docTR", "TrOCR", "FastAPI", "Flutter"],
        links: [
          { label: "Code backend", href: "https://github.com/rakotna/ScolarAi_Back" },
          { label: "Code mobile", href: "https://github.com/rakotna/M1-projet" },
        ],
      },
    ],
    skills: {
      IA: ["Pydantic AI", "OpenRouter", "MCP", "n8n", "YOLO", "TrOCR", "LightGBM"],
      "Back-end": ["Python", "Django / DRF", "FastAPI", "Spring Boot", "Node.js"],
      "Front-end": ["React", "Angular", "TypeScript", "Tailwind", "Flutter", "React Native"],
      Cloud: ["AWS (en cours)", "Docker", "GitHub Actions", "Vercel", "Cloudflare"],
      Données: ["PostgreSQL", "Redis", "MongoDB", "MySQL"],
      IoT: ["ESP32", "Arduino", "C/C++"],
    },
    education: [
      {
        title: "Master 2, Sécurité informatique et IA",
        place: "Université d'Antsiranana",
        period: "en cours",
      },
      {
        title: "École 42 Antananarivo",
        place: "Cursus par projets",
        period: "depuis 2026",
      },
      {
        title: "Licence Mathématiques-Informatique",
        place: "Université d'Antsiranana, major de promotion, mention Très Bien",
        period: "2021 – 2024",
      },
    ],
    recognition: [
      "1er prix Hack4Dev 2026, Data Science (Low-Data F1 et Best Average F1)",
      "1er prix Hackathon North Doany Discovery 2025 (RedShalk)",
      "2e prix Orange Summer Challenge 2026",
      "Formation installation de caméras HIKVISION, certificat 2025",
      "Programme Héros AWS, en cours",
    ],
    contactText:
      "Un projet d'automatisation, d'agent IA ou d'application ? Décrivez votre besoin, je réponds par email.",
    form: {
      terminal: "nouveau-message",
      name: "Nom",
      email: "Email",
      project: "Votre projet",
      placeholder: "Décrivez votre besoin et votre délai.",
      submit: "Envoyer le message",
      opened: "Votre application mail s'est ouverte. Si rien ne s'affiche, écrivez directement à",
    },
  },
  en: {
    title: "AI & Full-Stack Developer",
    pitch:
      "I build AI agents, automation tools, and web applications for agriculture and SMEs. From prototype to production.",
    availability: "Available · Antananarivo, Madagascar · Remote",
    nav: [
      { href: "#projets", label: "Projects" },
      { href: "#services", label: "Services" },
      { href: "#parcours", label: "Journey" },
      { href: "#contact", label: "Contact" },
    ],
    ctaProjects: "View my projects",
    ctaContact: "Get in touch",
    facts: [
      { value: "1,240+", label: "automated tests on Irooa" },
      { value: "F1 0.97", label: "handwriting recognition, ScolarAI" },
      { value: "3 podiums", label: "Hack4Dev & hackathons (2025–2026)" },
    ],
    sections: {
      projects: "Projects",
      services: "Services",
      journey: "Journey",
      education: "Education",
      recognition: "Awards & Certifications",
      contact: "Contact",
    },
    moreProjects: "More projects and source code on",
    services: [
      {
        title: "AI Agents & Automation",
        text: "Agents connected to your tools (Pydantic AI, MCP, n8n, Make), live web search, document parsing, eliminating repetitive tasks.",
      },
      {
        title: "Web & Mobile Applications",
        text: "Showcase sites, online stores, interactive dashboards, and mobile apps built with React, Angular, Django, FastAPI, Spring Boot, and Flutter.",
      },
      {
        title: "Data, Satellite & Applied AI",
        text: "Predictive models, computer vision, and satellite imagery analysis. Compliant public data extraction and ML pipelines.",
      },
    ],
    projects: [
      {
        name: "Irooa",
        tag: "B2B Agri Marketplace",
        text: "Full-scale platform powered by autonomous AI agents: real-time streaming, dynamic tools, web search via private SearXNG, MCP server. Robust security (JWT HttpOnly, CSRF, TOTP) and 1,240+ tests. AWS migration underway.",
        stack: ["Django", "FastAPI", "Pydantic AI", "React", "PostgreSQL", "Docker"],
        links: [{ label: "Live Demo", href: "https://irooa.com" }],
      },
      {
        name: "Arovoly",
        tag: "Prototype · Agri Remote Sensing",
        text: "AI model that estimates crop production based on crop type, seed variety, season, weather, and fertilizer from satellite imagery. Includes crop traceability. Deployed live.",
        stack: ["Python", "Remote sensing", "Machine Learning", "Vercel", "Render"],
        links: [
          { label: "Live Demo", href: "https://arovoly.vercel.app" },
          { label: "Source Code", href: "https://github.com/rakotna/arovoly" },
        ],
      },
      {
        name: "Hack4Dev 2026",
        tag: "1st Prize · Orange Digital Center",
        text: "Building age classification using Landsat satellite time series. Low-Data F1 and Best Average F1 awards. Delivered with a fully reproducible notebook.",
        stack: ["LightGBM", "Landsat", "Python", "Time Series"],
        links: [
          {
            label: "Kaggle Notebook",
            href: "https://www.kaggle.com/code/fanantenanaezra/building-age-classification",
          },
        ],
      },
      {
        name: "ScolarAI",
        tag: "Master's Project · Computer Vision",
        text: "Automated grading sheet and student report card digitization. TrOCR fine-tuned on Malagasy handwriting and names: 0.97 recognition F1, 0.85 full-pipeline F1.",
        stack: ["YOLO11", "docTR", "TrOCR", "FastAPI", "Flutter"],
        links: [
          { label: "Backend Code", href: "https://github.com/rakotna/ScolarAi_Back" },
          { label: "Mobile Code", href: "https://github.com/rakotna/M1-projet" },
        ],
      },
    ],
    skills: {
      AI: ["Pydantic AI", "OpenRouter", "MCP", "n8n", "YOLO", "TrOCR", "LightGBM"],
      "Back-end": ["Python", "Django / DRF", "FastAPI", "Spring Boot", "Node.js"],
      "Front-end": ["React", "Angular", "TypeScript", "Tailwind", "Flutter", "React Native"],
      Cloud: ["AWS (ongoing)", "Docker", "GitHub Actions", "Vercel", "Cloudflare"],
      Data: ["PostgreSQL", "Redis", "MongoDB", "MySQL"],
      IoT: ["ESP32", "Arduino", "C/C++"],
    },
    education: [
      {
        title: "Master 2 in Cybersecurity & AI",
        place: "University of Antsiranana",
        period: "in progress",
      },
      {
        title: "42 Antananarivo",
        place: "Project-based curriculum",
        period: "since 2026",
      },
      {
        title: "Bachelor's in Mathematics & Computer Science",
        place: "University of Antsiranana, Valedictorian, Summa Cum Laude",
        period: "2021 – 2024",
      },
    ],
    recognition: [
      "1st Prize Hack4Dev 2026, Data Science (Low-Data F1 & Best Average F1)",
      "1st Prize Hackathon North Doany Discovery 2025 (RedShalk)",
      "2nd Prize Orange Summer Challenge 2026",
      "HIKVISION Camera Installation Certified, 2025",
      "AWS Community Hero Program, ongoing",
    ],
    contactText:
      "Have an automation project, AI agent, or application in mind? Tell me about your needs, I reply promptly by email.",
    form: {
      terminal: "new-message",
      name: "Name",
      email: "Email",
      project: "Your project",
      placeholder: "Describe your project requirements, scope, and timeline.",
      submit: "Send message",
      opened: "Your email client has opened. If nothing shows up, write directly to",
    },
  },
};

// ───────────────────────── COMPOSANTS ─────────────────────────

const mono = "font-['JetBrains_Mono',ui-monospace,monospace]";
const sans = "font-['Inter',system-ui,sans-serif]";

function TerminalBar({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-[#30363D] bg-[#161B22] px-4 py-2.5">
      <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" aria-hidden />
      <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" aria-hidden />
      <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" aria-hidden />
      <span className={`${mono} ml-2 truncate text-xs text-[#8B949E]`}>{title}</span>
    </div>
  );
}

function SectionTitle({ children, id }: { children: string; id: string }) {
  return (
    <h2 id={id} className={`${mono} mb-8 text-2xl font-bold text-[#E6EDF3] md:text-3xl`}>
      <span className="text-[#22D3EE]">&gt; </span>
      {children}
    </h2>
  );
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-[#30363D] bg-[#0D1117] transition-colors hover:border-[#22D3EE]/60">
      <TerminalBar title={p.name.toLowerCase().replace(/\s+/g, "-")} />
      <div className="flex flex-1 flex-col p-5">
        <p className={`${mono} mb-1 text-xs text-[#22D3EE]`}>{p.tag}</p>
        <h3 className={`${mono} mb-3 text-lg font-bold text-[#E6EDF3]`}>{p.name}</h3>
        <p className={`${sans} mb-5 text-[15px] leading-relaxed text-[#C9D1D9]`}>{p.text}</p>
        <ul className="mt-auto flex flex-wrap gap-2" aria-label="Technologies">
          {p.stack.map((s) => (
            <li key={s} className={`${mono} rounded bg-[#161B22] px-2 py-1 text-xs text-[#8B949E]`}>
              {s}
            </li>
          ))}
        </ul>
        {p.links.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
            {p.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${mono} text-sm text-[#22D3EE] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#22D3EE]`}
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

function ContactForm({ form }: { form: Content["form"] }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [opened, setOpened] = useState(false);

  // Ouvre le client mail du visiteur avec le message prérempli.
  // Pour un envoi sans client mail, remplacez par Formspree ou Web3Forms.
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Projet : message de ${name}`);
    const body = encodeURIComponent(`${message}\n\n${name}\n${email}`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    setOpened(true);
  }

  const field =
    "w-full rounded-md border border-[#30363D] bg-[#0D1117] px-3 py-2.5 text-[#E6EDF3] placeholder-[#6E7681] focus:border-[#22D3EE] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#22D3EE]";

  return (
    <form onSubmit={onSubmit} className="overflow-hidden rounded-lg border border-[#30363D] bg-[#0D1117]">
      <TerminalBar title={form.terminal} />
      <div className="space-y-4 p-5">
        <div>
          <label htmlFor="name" className={`${mono} mb-1.5 block text-sm text-[#22D3EE]`}>
            {form.name}
          </label>
          <input
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`${field} ${sans}`}
          />
        </div>
        <div>
          <label htmlFor="email" className={`${mono} mb-1.5 block text-sm text-[#22D3EE]`}>
            {form.email}
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`${field} ${sans}`}
          />
        </div>
        <div>
          <label htmlFor="message" className={`${mono} mb-1.5 block text-sm text-[#22D3EE]`}>
            {form.project}
          </label>
          <textarea
            id="message"
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={form.placeholder}
            className={`${field} ${sans} resize-none`}
          />
        </div>
        <button
          type="submit"
          className={`${mono} w-full rounded-md bg-[#22D3EE] px-4 py-3 text-sm font-bold text-[#0D1117] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22D3EE]`}
        >
          {form.submit}
        </button>
        {opened && (
          <p role="status" className={`${sans} text-sm text-[#8B949E]`}>
            {form.opened}{" "}
            <a href={`mailto:${PROFILE.email}`} className="text-[#22D3EE] underline">
              {PROFILE.email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}

// ───────────────────────── PAGE ─────────────────────────

export default function Portfolio() {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolio_lang") as Lang | null;
      if (saved === "fr" || saved === "en") return saved;
      if (navigator.language?.startsWith("en")) return "en";
    }
    return "fr";
  });

  useEffect(() => {
    localStorage.setItem("portfolio_lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const c = CONTENT[lang];

  const link =
    "text-[#E6EDF3] underline-offset-4 hover:text-[#22D3EE] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#22D3EE]";

  return (
    <div className={`${sans} min-h-screen bg-[#0D1117] text-[#C9D1D9] antialiased selection:bg-[#22D3EE] selection:text-[#0D1117]`}>
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-[#30363D] bg-[#0D1117]/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
          <a href="#top" className={`${mono} font-bold text-[#E6EDF3]`}>
            <span className="text-[#22D3EE]">&gt; </span>
            {PROFILE.handle}
          </a>

          <nav aria-label="Navigation principale" className="hidden items-center gap-6 md:flex">
            {c.nav.map((n) => (
              <a key={n.href} href={n.href} className={`${mono} text-sm text-[#8B949E] hover:text-[#E6EDF3]`}>
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Bouton de changement de langue */}
            <div
              className={`${mono} flex items-center rounded border border-[#30363D] bg-[#161B22] p-0.5 text-xs`}
              role="group"
              aria-label="Sélection de la langue"
            >
              <button
                type="button"
                onClick={() => setLang("fr")}
                className={`rounded px-2.5 py-1 font-bold transition-all ${
                  lang === "fr"
                    ? "bg-[#22D3EE] text-[#0D1117] shadow-sm"
                    : "text-[#8B949E] hover:text-[#E6EDF3]"
                }`}
                aria-pressed={lang === "fr"}
                aria-label="Passer en français"
              >
                FR
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`rounded px-2.5 py-1 font-bold transition-all ${
                  lang === "en"
                    ? "bg-[#22D3EE] text-[#0D1117] shadow-sm"
                    : "text-[#8B949E] hover:text-[#E6EDF3]"
                }`}
                aria-pressed={lang === "en"}
                aria-label="Switch to English"
              >
                EN
              </button>
            </div>

            <a
              href="#contact"
              className={`${mono} rounded-md bg-[#22D3EE] px-3.5 py-1.5 text-sm font-bold text-[#0D1117] hover:opacity-90`}
            >
              {c.ctaContact}
            </a>
          </div>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-6xl px-5">
        {/* Hero */}
        <section className="grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className={`${mono} mb-4 text-sm text-[#22D3EE]`}>
              &gt; whoami
              <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-[#22D3EE]" aria-hidden />
            </p>
            <h1 className={`${mono} mb-3 text-3xl font-bold leading-tight text-[#E6EDF3] md:text-5xl`}>
              {PROFILE.name}
            </h1>
            <p className={`${mono} mb-5 text-lg text-[#22D3EE]`}>{c.title}</p>
            <p className="mb-8 max-w-xl text-base leading-relaxed md:text-lg">{c.pitch}</p>
            <div className="mb-10 flex flex-wrap gap-3">
              <a
                href="#projets"
                className={`${mono} rounded-md bg-[#22D3EE] px-5 py-2.5 text-sm font-bold text-[#0D1117] hover:opacity-90`}
              >
                {c.ctaProjects}
              </a>
              <a
                href="#contact"
                className={`${mono} rounded-md border border-[#30363D] px-5 py-2.5 text-sm text-[#E6EDF3] hover:border-[#22D3EE]`}
              >
                {c.ctaContact}
              </a>
            </div>
            <dl className="grid max-w-xl grid-cols-3 gap-4 border-t border-[#30363D] pt-6">
              {c.facts.map((f) => (
                <div key={f.label}>
                  <dt className={`${mono} text-xl font-bold text-[#E6EDF3] md:text-2xl`}>{f.value}</dt>
                  <dd className="mt-1 text-xs leading-snug text-[#8B949E]">{f.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mx-auto w-full max-w-sm overflow-hidden rounded-lg border border-[#22D3EE]/50 bg-[#0D1117]">
            <TerminalBar title="profile.png" />
            <img
              src={PROFILE.photo}
              alt={`Portrait de ${PROFILE.name}`}
              className="aspect-square w-full object-cover object-top"
            />
            <div className={`${mono} flex items-center gap-2 border-t border-[#30363D] px-4 py-2.5 text-xs text-[#8B949E]`}>
              <span className="h-2 w-2 rounded-full bg-[#27C93F]" aria-hidden />
              {c.availability}
            </div>
          </div>
        </section>

        {/* Projets */}
        <section aria-labelledby="projets" className="scroll-mt-20 py-12">
          <SectionTitle id="projets">{c.sections.projects}</SectionTitle>
          <div className="grid gap-6 md:grid-cols-2">
            {c.projects.map((p) => (
              <ProjectCard key={p.name} p={p} />
            ))}
          </div>
          <p className="mt-6 text-sm text-[#8B949E]">
            {c.moreProjects}{" "}
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#22D3EE] underline-offset-4 hover:underline"
            >
              GitHub
            </a>
            .
          </p>
        </section>

        {/* Services */}
        <section aria-labelledby="services" className="scroll-mt-20 py-12">
          <SectionTitle id="services">{c.sections.services}</SectionTitle>
          <div className="grid gap-6 md:grid-cols-3">
            {c.services.map((s) => (
              <div key={s.title} className="rounded-lg border border-[#30363D] bg-[#161B22]/50 p-5">
                <h3 className={`${mono} mb-3 text-base font-bold text-[#E6EDF3]`}>{s.title}</h3>
                <p className="text-[15px] leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Parcours */}
        <section aria-labelledby="parcours" className="scroll-mt-20 py-12">
          <SectionTitle id="parcours">{c.sections.journey}</SectionTitle>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-8">
              <div>
                <h3 className={`${mono} mb-4 text-sm text-[#22D3EE]`}>{c.sections.education}</h3>
                <ul className="space-y-4">
                  {c.education.map((e) => (
                    <li key={e.title} className="border-l-2 border-[#30363D] pl-4">
                      <p className="font-semibold text-[#E6EDF3]">{e.title}</p>
                      <p className="text-sm text-[#8B949E]">
                        {e.place} · {e.period}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className={`${mono} mb-4 text-sm text-[#22D3EE]`}>{c.sections.recognition}</h3>
                <ul className="space-y-2 text-[15px]">
                  {c.recognition.map((r) => (
                    <li key={r} className="flex gap-2">
                      <span className="text-[#27C93F]" aria-hidden>✓</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-[#30363D] bg-[#0D1117]">
              <TerminalBar title="stack.txt" />
              <div className="space-y-4 p-5">
                {Object.entries(c.skills).map(([group, items]) => (
                  <div key={group}>
                    <p className={`${mono} mb-2 text-xs text-[#8B949E]`}>{group}</p>
                    <ul className="flex flex-wrap gap-2">
                      {items.map((i) => (
                        <li key={i} className={`${mono} rounded bg-[#161B22] px-2.5 py-1 text-xs text-[#E6EDF3]`}>
                          {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section aria-labelledby="contact" className="scroll-mt-20 py-12 pb-20">
          <SectionTitle id="contact">{c.sections.contact}</SectionTitle>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="mb-6 max-w-md text-base leading-relaxed">{c.contactText}</p>
              <ul className={`${mono} space-y-3 text-sm`}>
                <li>
                  <a href={`mailto:${PROFILE.email}`} className={link}>
                    {PROFILE.email}
                  </a>
                </li>
                <li>
                  <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className={link}>
                    github.com/{PROFILE.handle}
                  </a>
                </li>
                {PROFILE.linkedin && (
                  <li>
                    <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className={link}>
                      LinkedIn
                    </a>
                  </li>
                )}
              </ul>
            </div>
            <ContactForm form={c.form} />
          </div>
        </section>
      </main>

      <footer className="border-t border-[#30363D] py-6 text-center">
        <p className={`${mono} text-xs text-[#6E7681]`}>
          © {new Date().getFullYear()} {PROFILE.name}
        </p>
      </footer>
    </div>
  );
}
