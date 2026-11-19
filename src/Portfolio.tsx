import { useState, type FormEvent } from "react";

/**
 * Portfolio – Ezra Fanantenana Rakotoarimanga
 *
 * INSTALLATION
 * 1. Tailwind CSS (v3 ou v4) déjà configuré dans votre projet React/Vite.
 * 2. Dans index.html, ajoutez les polices :
 *    <link rel="preconnect" href="https://fonts.googleapis.com">
 *    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
 * 3. Mettez votre photo dans /public/profile.jpg
 * 4. Remplacez toutes les valeurs marquées TODO ci-dessous.
 */

// ───────────────────────── CONTENU (à modifier ici) ─────────────────────────

const PROFILE = {
  name: "Ezra Fanantenana Rakotoarimanga",
  handle: "rakotna",
  title: "Ingénieur IA & full-stack",
  pitch:
    "Je conçois des agents IA, des outils d'automatisation et des applications web pour l'agriculture et les PME. Du prototype au déploiement.",
  email: "fanantenanaezra@gmail.com",
  github: "https://github.com/rakotna",
  linkedin: "", // TODO: ex. "https://linkedin.com/in/votre-profil" (laisser vide pour masquer)
  photo: "/profile.png",
  location: "Diego-Suarez, Madagascar",
};

const FACTS = [
      { value: "1 240+", label: "tests automatisés sur Irooa" },
      { value: "F1 0,97", label: "reconnaissance manuscrite, ScolarAI" },
      { value: "3 podiums", label: "Hack4Dev & hackathons (2025–2026)" },
];


const SERVICES = [
  {
    title: "Agents IA et automatisation",
    text: "Agents connectés à vos outils (Pydantic AI, MCP, n8n, Make), recherche web, traitement de documents, tâches répétitives supprimées.",
  },
  {
    title: "Sites web et applications",
    text: "Sites vitrines, boutiques en ligne, tableaux de bord et applications mobiles avec React, Django, FastAPI, Spring Boot et Flutter.",
  },
  {
    title: "Données, satellite et IA appliquée",
    text: "Modèles de prédiction, vision par ordinateur et imagerie satellitaire. Collecte de données publiques dans le respect des conditions d'utilisation.",
  },
];

type Project = {
  name: string;
  tag: string;
  text: string;
  stack: string[];
  links: { label: string; href: string }[];
};

const PROJECTS: Project[] = [
  {
    name: "Irooa",
    tag: "Marketplace agricole B2B",
    text: "Plateforme complète avec agents IA autonomes : streaming, outils dynamiques, recherche web via SearXNG privé, serveur MCP. Sécurité (JWT HttpOnly, CSRF, TOTP) et 1 240+ tests. Migration vers AWS en cours.",
    stack: ["Django", "FastAPI", "Pydantic AI", "React", "PostgreSQL", "Docker"],
    links: [
      // TODO: ajoutez le lien de la démo et du code
      // { label: "Voir la démo", href: "https://..." },
      // { label: "Code", href: "https://github.com/rakotna/..." },
    ],
  },
  {
    name: "Télédétection agricole", // TODO: nom exact du projet
    tag: "Prototype",
    text: "Modèle d'IA qui estime la production selon la culture, la variété de semence, la saison, la météo et l'engrais, à partir de données satellitaires. Traçabilité des cultures incluse. Déployé en ligne.",
    stack: ["Python", "Remote sensing", "Machine Learning", "Vercel", "Render"],
    links: [
      // TODO: { label: "Voir la démo", href: "https://..." },
      // TODO: { label: "Code", href: "https://github.com/rakotna/..." },
    ],
  },
  {
    name: "Hack4Dev 2026",
    tag: "1er prix · Orange Digital Center",
    text: "Classification de l'âge des bâtiments à partir de séries temporelles satellitaires Landsat. Prix Low-Data F1 et Best Average F1. Notebook reproductible livré.",
    stack: ["LightGBM", "Landsat", "Python", "Séries temporelles"],
    links: [],
  },
  {
    name: "ScolarAI",
    tag: "Projet de Master · Vision par ordinateur",
    text: "Numérisation automatique de feuilles d'examen et de bulletins. TrOCR affiné sur l'écriture et les noms malgaches : F1 de 0,97 en reconnaissance, 0,85 sur le pipeline complet.",
    stack: ["YOLO11", "docTR", "TrOCR", "FastAPI", "Flutter"],
    links: [],
  },
];

const SKILLS: Record<string, string[]> = {
  "IA": ["Pydantic AI", "OpenRouter", "MCP", "n8n", "YOLO", "TrOCR", "LightGBM"],
  "Back-end": ["Python", "Django / DRF", "FastAPI", "Spring Boot", "Node.js"],
  "Front-end": ["React", "TypeScript", "Tailwind", "Flutter", "React Native"],
  "Cloud": ["AWS (en cours)", "Docker", "GitHub Actions", "Vercel", "Cloudflare"],
  "Données": ["PostgreSQL", "Redis", "MongoDB", "MySQL"],
  "IoT": ["ESP32", "Arduino", "C/C++"],
};

const EDUCATION = [
  { title: "Master 2, Sécurité informatique et IA", place: "Université d'Antsiranana", period: "2026" },
  { title: "École 42 Antananarivo", place: "Cursus par projets", period: "depuis 2026" }, // TODO: année + niveau validé
  { title: "Licence Mathématiques-Informatique", place: "Université d'Antsiranana, major de promotion, mention Très Bien", period: "2021 – 2024" },
];

   const RECOGNITION = [
      "1er prix Hack4Dev 2026, Data Science (Low-Data F1 & Best Average F1)",
      "1er prix Hackathon RedShalk Hackathon North Doany Discovery inter-universités  2025",
      "2e prix Orange Summer Challenge 2026",
      "Formation installation caméras HIKVISION, certificat 2025",
      "Programme Héros AWS, en cours",
    ];


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
          <div className="mt-5 flex gap-4">
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

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [opened, setOpened] = useState(false);

  // Ouvre le client mail de l'utilisateur avec le message prérempli.
  // Pour un envoi sans client mail, remplacez par un service comme Formspree ou Web3Forms.
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
      <TerminalBar title="nouveau-message" />
      <div className="space-y-4 p-5">
        <div>
          <label htmlFor="name" className={`${mono} mb-1.5 block text-sm text-[#22D3EE]`}>Nom</label>
          <input id="name" required value={name} onChange={(e) => setName(e.target.value)} className={`${field} ${sans}`} />
        </div>
        <div>
          <label htmlFor="email" className={`${mono} mb-1.5 block text-sm text-[#22D3EE]`}>Email</label>
          <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={`${field} ${sans}`} />
        </div>
        <div>
          <label htmlFor="message" className={`${mono} mb-1.5 block text-sm text-[#22D3EE]`}>Votre projet</label>
          <textarea
            id="message"
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Décrivez votre besoin et votre délai."
            className={`${field} ${sans} resize-none`}
          />
        </div>
        <button
          type="submit"
          className={`${mono} w-full rounded-md bg-[#22D3EE] px-4 py-3 text-sm font-bold text-[#0D1117] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22D3EE]`}
        >
          Envoyer le message
        </button>
        {opened && (
          <p role="status" className={`${sans} text-sm text-[#8B949E]`}>
            Votre application mail s'est ouverte. Si rien ne s'affiche, écrivez directement à {PROFILE.email}.
          </p>
        )}
      </div>
    </form>
  );
}

// ───────────────────────── PAGE ─────────────────────────

export default function Portfolio() {
  const nav = [
    { href: "#projets", label: "Projets" },
    { href: "#services", label: "Services" },
    { href: "#parcours", label: "Parcours" },
    { href: "#contact", label: "Contact" },
  ];

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
            {nav.map((n) => (
              <a key={n.href} href={n.href} className={`${mono} text-sm text-[#8B949E] hover:text-[#E6EDF3]`}>
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className={`${mono} rounded-md bg-[#22D3EE] px-3.5 py-1.5 text-sm font-bold text-[#0D1117] hover:opacity-90`}
          >
            Me contacter
          </a>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-6xl px-5">
        {/* Hero */}
        <section className="grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className={`${mono} mb-4 text-sm text-[#22D3EE]`}>
              &gt; whoami<span className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-[#22D3EE]" aria-hidden />
            </p>
            <h1 className={`${mono} mb-3 text-3xl font-bold leading-tight text-[#E6EDF3] md:text-5xl`}>{PROFILE.name}</h1>
            <p className={`${mono} mb-5 text-lg text-[#22D3EE]`}>{PROFILE.title}</p>
            <p className="mb-8 max-w-xl text-base leading-relaxed md:text-lg">{PROFILE.pitch}</p>
            <div className="mb-10 flex flex-wrap gap-3">
              <a href="#projets" className={`${mono} rounded-md bg-[#22D3EE] px-5 py-2.5 text-sm font-bold text-[#0D1117] hover:opacity-90`}>
                Voir mes projets
              </a>
              <a href="#contact" className={`${mono} rounded-md border border-[#30363D] px-5 py-2.5 text-sm text-[#E6EDF3] hover:border-[#22D3EE]`}>
                Me contacter
              </a>
            </div>
            <dl className="grid max-w-xl grid-cols-3 gap-4 border-t border-[#30363D] pt-6">
              {FACTS.map((f) => (
                <div key={f.label}>
                  <dt className={`${mono} text-xl font-bold text-[#E6EDF3] md:text-2xl`}>{f.value}</dt>
                  <dd className="mt-1 text-xs leading-snug text-[#8B949E]">{f.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mx-auto w-full max-w-sm overflow-hidden rounded-lg border border-[#22D3EE]/50 bg-[#0D1117]">
            <TerminalBar title="profile.jpg" />
            <img
              src={PROFILE.photo}
              alt={`Portrait de ${PROFILE.name}`}
              className="aspect-square w-full object-cover object-top"
            />
            <div className={`${mono} flex items-center gap-2 border-t border-[#30363D] px-4 py-2.5 text-xs text-[#8B949E]`}>
              <span className="h-2 w-2 rounded-full bg-[#27C93F]" aria-hidden />
              Disponible · {PROFILE.location} · à distance
            </div>
          </div>
        </section>

        {/* Projets */}
        <section aria-labelledby="projets" className="scroll-mt-20 py-12">
          <SectionTitle id="projets">Projets</SectionTitle>
          <div className="grid gap-6 md:grid-cols-2">
            {PROJECTS.map((p) => (
              <ProjectCard key={p.name} p={p} />
            ))}
          </div>
          <p className="mt-6 text-sm text-[#8B949E]">
            Autres projets et code source sur{" "}
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="text-[#22D3EE] underline-offset-4 hover:underline">
              GitHub
            </a>
            .
          </p>
        </section>

        {/* Services */}
        <section aria-labelledby="services" className="scroll-mt-20 py-12">
          <SectionTitle id="services">Services</SectionTitle>
          <div className="grid gap-6 md:grid-cols-3">
            {SERVICES.map((s) => (
              <div key={s.title} className="rounded-lg border border-[#30363D] bg-[#161B22]/50 p-5">
                <h3 className={`${mono} mb-3 text-base font-bold text-[#E6EDF3]`}>{s.title}</h3>
                <p className="text-[15px] leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Parcours */}
        <section aria-labelledby="parcours" className="scroll-mt-20 py-12">
          <SectionTitle id="parcours">Parcours</SectionTitle>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-8">
              <div>
                <h3 className={`${mono} mb-4 text-sm text-[#22D3EE]`}>Formation</h3>
                <ul className="space-y-4">
                  {EDUCATION.map((e) => (
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
                <h3 className={`${mono} mb-4 text-sm text-[#22D3EE]`}>Distinctions et certifications</h3>
                <ul className="space-y-2 text-[15px]">
                  {RECOGNITION.map((r) => (
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
                {Object.entries(SKILLS).map(([group, items]) => (
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
          <SectionTitle id="contact">Contact</SectionTitle>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="mb-6 max-w-md text-base leading-relaxed">
                Un projet d'automatisation, d'agent IA ou d'application ? Décrivez votre besoin, je réponds par email.
              </p>
              <ul className={`${mono} space-y-3 text-sm`}>
                <li>
                  <a href={`mailto:${PROFILE.email}`} className="text-[#E6EDF3] underline-offset-4 hover:text-[#22D3EE] hover:underline">
                    {PROFILE.email}
                  </a>
                </li>
                <li>
                  <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="text-[#E6EDF3] underline-offset-4 hover:text-[#22D3EE] hover:underline">
                    github.com/{PROFILE.handle}
                  </a>
                </li>
                {PROFILE.linkedin && (
                  <li>
                    <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#E6EDF3] underline-offset-4 hover:text-[#22D3EE] hover:underline">
                      LinkedIn
                    </a>
                  </li>
                )}
              </ul>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="border-t border-[#30363D] py-6 text-center">
        <p className={`${mono} text-xs text-[#6E7681]`}>© {new Date().getFullYear()} {PROFILE.name}</p>
      </footer>
    </div>
  );
}
