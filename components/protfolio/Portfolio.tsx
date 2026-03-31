import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alex Rivera — Full-Stack Developer & Digital Craftsman",
  description:
    "Professional portfolio of Alex Rivera — Full-Stack Developer specializing in React, Next.js, and Node.js. Building elegant, high-performance web experiences.",
  keywords: [
    "portfolio",
    "developer portfolio",
    "nextjs portfolio",
    "personal website",
    "full stack developer",
    "react developer",
    "web developer",
    "hire developer",
  ],
  authors: [{ name: "Alex Rivera" }],
  openGraph: {
    title: "Alex Rivera — Full-Stack Developer",
    description:
      "Building elegant, high-performance web experiences with React, Next.js & Node.js.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Rivera — Full-Stack Developer",
    description:
      "Building elegant, high-performance web experiences with React, Next.js & Node.js.",
  },
  robots: { index: true, follow: true },
};

// ─── Data ───────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const SKILLS = [
  { name: "React / Next.js", pct: 95, color: "#38bdf8" },
  { name: "TypeScript", pct: 90, color: "#818cf8" },
  { name: "Node.js / Express", pct: 88, color: "#34d399" },
  { name: "UI/UX Design", pct: 82, color: "#fb923c" },
  { name: "PostgreSQL / MongoDB", pct: 80, color: "#f472b6" },
  { name: "DevOps / CI-CD", pct: 75, color: "#facc15" },
];

const PROJECTS = [
  {
    title: "Pulse Analytics",
    desc: "Real-time SaaS dashboard with sub-100 ms data streaming, custom chart library, and role-based access control.",
    tags: ["Next.js", "WebSockets", "Postgres"],
    emoji: "📊",
    gradient: "from-cyan-500/20 to-blue-600/20",
    border: "border-cyan-500/30",
  },
  {
    title: "NovaMart",
    desc: "E-commerce platform processing $2 M/month. Includes inventory, Stripe payments, and AI-powered recommendations.",
    tags: ["React", "Node.js", "Stripe"],
    emoji: "🛒",
    gradient: "from-violet-500/20 to-purple-600/20",
    border: "border-violet-500/30",
  },
  {
    title: "Habitat",
    desc: "Property management app reducing landlord admin by 60 %. Smart lease tracker, maintenance queue, and tenant portal.",
    tags: ["Next.js", "Prisma", "Twilio"],
    emoji: "🏡",
    gradient: "from-emerald-500/20 to-teal-600/20",
    border: "border-emerald-500/30",
  },
  {
    title: "StoryForge AI",
    desc: "Generative storytelling platform with Claude AI. Users craft branching narratives with dynamic character memory.",
    tags: ["React", "Claude API", "MongoDB"],
    emoji: "✍️",
    gradient: "from-amber-500/20 to-orange-600/20",
    border: "border-amber-500/30",
  },
  {
    title: "ThreadSync",
    desc: "Slack-like team messaging app with end-to-end encryption, 30 ms latency, and offline-first architecture.",
    tags: ["Next.js", "WebRTC", "Redis"],
    emoji: "💬",
    gradient: "from-rose-500/20 to-pink-600/20",
    border: "border-rose-500/30",
  },
  {
    title: "LaunchKit",
    desc: "Open-source Next.js SaaS boilerplate: auth, billing, teams, and email out of the box. 4k+ GitHub stars.",
    tags: ["Next.js", "Tailwind", "Open Source"],
    emoji: "🚀",
    gradient: "from-sky-500/20 to-indigo-600/20",
    border: "border-sky-500/30",
  },
];

const SERVICES = [
  {
    icon: "⚡",
    title: "Web Development",
    desc: "Production-grade web apps built with React/Next.js — fast, accessible, and SEO-ready from day one.",
  },
  {
    icon: "🎨",
    title: "UI/UX Design",
    desc: "Pixel-perfect interfaces that convert. Figma → code handoff or design-to-deploy end-to-end.",
  },
  {
    icon: "🔧",
    title: "API & Backend",
    desc: "RESTful & GraphQL APIs, serverless functions, and microservices architectures that scale.",
  },
  {
    icon: "☁️",
    title: "Cloud & DevOps",
    desc: "CI/CD pipelines, Docker, Kubernetes, and Vercel/AWS deployments with zero-downtime releases.",
  },
  {
    icon: "📈",
    title: "Performance Audits",
    desc: "Core Web Vitals optimisation — from lazy loading to bundle splitting for lighthouse-perfect scores.",
  },
  {
    icon: "🤝",
    title: "Technical Consulting",
    desc: "Architecture reviews, tech-stack selection, and team mentoring for startups and scale-ups.",
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    role: "CPO @ Pulse Analytics",
    body: "Alex shipped our entire dashboard in 6 weeks — pixel-perfect and faster than our old app by 40%. Truly exceptional.",
    avatar: "PS",
    color: "from-cyan-500 to-blue-600",
  },
  {
    name: "James O'Brien",
    role: "Founder @ NovaMart",
    body: "Revenue doubled after the re-platform. Alex's attention to UX detail and checkout performance was a game-changer.",
    avatar: "JO",
    color: "from-violet-500 to-purple-600",
  },
  {
    name: "Lin Wei",
    role: "CTO @ ThreadSync",
    body: "Best technical collaborator we've ever hired. Delivered 30 ms real-time messaging with rock-solid reliability.",
    avatar: "LW",
    color: "from-emerald-500 to-teal-600",
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function GradientOrb({
  className,
  color,
}: {
  className?: string;
  color: string;
}) {
  return (
    <div
      className={`absolute rounded-full blur-3xl opacity-20 pointer-events-none ${className}`}
      style={{ background: color }}
      aria-hidden="true"
    />
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-white/5 border border-white/10 text-slate-300 mb-4">
      {children}
    </span>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
      {children}
    </h2>
  );
}

// ─── Sections ────────────────────────────────────────────────────────────────

function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#080b14]/80 backdrop-blur-xl border-b border-white/5">
      <nav
        className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <a
          href="#hero"
          className="text-xl font-black tracking-tight text-white hover:text-cyan-400 transition-colors"
        >
          alex<span className="text-cyan-400">.</span>dev
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-slate-400 hover:text-white transition-colors font-medium"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500 text-[#080b14] text-sm font-bold hover:bg-cyan-400 transition-all hover:scale-105 shadow-lg shadow-cyan-500/25"
        >
          Hire Me
        </a>

        {/* Mobile hamburger placeholder — pure CSS trick */}
        <label htmlFor="nav-toggle" className="md:hidden cursor-pointer p-2">
          <span className="block w-5 h-0.5 bg-white mb-1" />
          <span className="block w-5 h-0.5 bg-white mb-1" />
          <span className="block w-5 h-0.5 bg-white" />
        </label>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      <GradientOrb
        className="w-[700px] h-[700px] -top-32 -left-40"
        color="radial-gradient(circle, #06b6d4, transparent)"
      />
      <GradientOrb
        className="w-[600px] h-[600px] bottom-0 right-0"
        color="radial-gradient(circle, #6366f1, transparent)"
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Available for freelance work
        </div>

        <h1 className="text-6xl md:text-8xl font-black text-white leading-none tracking-tight mb-6">
          Hi, I&apos;m{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
            Alex Rivera
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto mb-4 leading-relaxed font-light">
          Full-Stack Developer crafting{" "}
          <span className="text-white font-semibold">
            fast, elegant, revenue-driving
          </span>{" "}
          web experiences.
        </p>

        <p className="text-slate-500 text-base mb-10 max-w-xl mx-auto">
          5+ years · 40+ shipped products · React · Next.js · Node.js
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-bold text-base hover:opacity-90 hover:scale-105 transition-all shadow-xl shadow-cyan-500/20"
          >
            View My Work →
          </a>
          <a
            href="#contact"
            className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-base hover:bg-white/10 hover:scale-105 transition-all backdrop-blur-sm"
          >
            Get In Touch
          </a>
        </div>

        {/* Stats bar */}
        <div className="mt-20 grid grid-cols-3 gap-6 max-w-lg mx-auto">
          {[
            { n: "40+", l: "Projects" },
            { n: "5+", l: "Years" },
            { n: "98%", l: "Satisfaction" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="text-3xl font-black text-white">{s.n}</div>
              <div className="text-slate-500 text-sm mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
        <span className="text-xs text-slate-400 tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-slate-400 to-transparent" />
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative py-28 overflow-hidden">
      <GradientOrb
        className="w-[500px] h-[500px] top-0 right-0"
        color="radial-gradient(circle, #6366f1, transparent)"
      />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Avatar area */}
          <div className="relative flex justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/30 to-indigo-600/30 rotate-6 scale-105" />
              <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-cyan-900/40 to-indigo-900/40 flex items-center justify-center">
                <span className="text-9xl select-none" aria-hidden="true">
                  👨‍💻
                </span>
              </div>
              {/* floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-[#0f1629] border border-white/10 rounded-2xl px-4 py-3 shadow-2xl">
                <div className="text-2xl font-black text-white">5+</div>
                <div className="text-xs text-slate-400">Years exp.</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <SectionLabel>About Me</SectionLabel>
            <SectionHeading>
              I build things for the{" "}
              <span className="text-cyan-400">web</span>.
            </SectionHeading>
            <p className="mt-6 text-slate-400 text-lg leading-relaxed">
              I&apos;m a full-stack developer based in Bengaluru, India with a
              passion for turning complex problems into clean, performant
              products. I care deeply about developer experience, accessibility,
              and shipping things that actually move metrics.
            </p>
            <p className="mt-4 text-slate-400 leading-relaxed">
              When I&apos;m not shipping code, I&apos;m contributing to
              open-source, writing about web performance, or experimenting with
              the latest AI APIs.
            </p>

            {/* Highlights */}
            <ul className="mt-8 grid grid-cols-2 gap-3">
              {[
                "Next.js Expert",
                "TypeScript Advocate",
                "Open-Source Contributor",
                "Performance Obsessed",
                "Figma → Code",
                "Remote Friendly",
              ].map((h) => (
                <li
                  key={h}
                  className="flex items-center gap-2 text-sm text-slate-300"
                >
                  <span className="text-cyan-400 text-lg">✦</span> {h}
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all text-sm"
            >
              Download Resume ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="relative py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionLabel>What I Do</SectionLabel>
          <SectionHeading>
            Services I <span className="text-indigo-400">Offer</span>
          </SectionHeading>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto">
            End-to-end digital product development — from architecture decisions
            to final pixel polish.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <article
              key={s.title}
              className="group p-7 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.06] hover:border-white/20 hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 cursor-default"
            >
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="relative py-28 overflow-hidden">
      <GradientOrb
        className="w-[500px] h-[500px] bottom-0 left-0"
        color="radial-gradient(circle, #06b6d4, transparent)"
      />
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionLabel>Portfolio</SectionLabel>
          <SectionHeading>
            Selected <span className="text-cyan-400">Projects</span>
          </SectionHeading>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto">
            A curated set of products I&apos;ve designed, built, and shipped —
            from zero to production.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p) => (
            <article
              key={p.title}
              className={`group relative p-7 rounded-2xl bg-gradient-to-br ${p.gradient} border ${p.border} hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-default`}
            >
              {/* bg texture */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #fff 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
                aria-hidden="true"
              />
              <div className="relative">
                <div className="text-4xl mb-4">{p.emoji}</div>
                <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-5">
                  {p.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full bg-white/10 text-xs text-slate-300 font-medium border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="relative py-28 overflow-hidden">
      <GradientOrb
        className="w-[500px] h-[500px] top-0 right-0"
        color="radial-gradient(circle, #a855f7, transparent)"
      />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel>Expertise</SectionLabel>
            <SectionHeading>
              My <span className="text-violet-400">Skill Set</span>
            </SectionHeading>
            <p className="mt-6 text-slate-400 leading-relaxed">
              Years of deliberate practice across the full stack — from
              meticulously typed TypeScript to battle-tested DevOps pipelines.
            </p>
            <p className="mt-4 text-slate-400 leading-relaxed">
              I pick the right tool for the job, not the trendiest one. Shipped
              products beat impressive tech demos every time.
            </p>
          </div>

          <div className="space-y-6">
            {SKILLS.map((sk) => (
              <div key={sk.name}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white font-semibold">{sk.name}</span>
                  <span className="text-slate-400">{sk.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${sk.pct}%`,
                      background: `linear-gradient(90deg, ${sk.color}cc, ${sk.color})`,
                      boxShadow: `0 0 12px ${sk.color}66`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className="relative py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionLabel>Social Proof</SectionLabel>
          <SectionHeading>
            What Clients <span className="text-emerald-400">Say</span>
          </SectionHeading>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <blockquote
              key={t.name}
              className="group p-7 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.06] hover:scale-[1.02] transition-all duration-300 flex flex-col gap-5"
            >
              <div className="text-3xl text-slate-600 leading-none select-none">
                &ldquo;
              </div>
              <p className="text-slate-300 text-sm leading-relaxed flex-1">
                {t.body}
              </p>
              <footer className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-black flex-shrink-0`}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">
                    {t.name}
                  </div>
                  <div className="text-slate-500 text-xs">{t.role}</div>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative py-28 overflow-hidden">
      <GradientOrb
        className="w-[600px] h-[600px] bottom-0 left-1/2 -translate-x-1/2"
        color="radial-gradient(circle, #06b6d4, #6366f1, transparent)"
      />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <SectionLabel>Let&apos;s Work Together</SectionLabel>
          <SectionHeading>
            Ready to Build{" "}
            <span className="text-cyan-400">Something Great?</span>
          </SectionHeading>
          <p className="mt-6 text-slate-400 text-lg leading-relaxed">
            Whether you have a project in mind or just want to say hello —
            my inbox is always open.
          </p>

          {/* Contact cards */}
          <div className="mt-12 grid sm:grid-cols-2 gap-4 text-left">
            <a
              href="mailto:hello@alexrivera.dev"
              className="group p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.07] hover:scale-[1.02] transition-all"
            >
              <div className="text-2xl mb-3">✉️</div>
              <div className="text-white font-semibold text-sm mb-1">Email</div>
              <div className="text-slate-400 text-sm group-hover:text-cyan-400 transition-colors">
                hello@alexrivera.dev
              </div>
            </a>
            <a
              href="tel:+919900000000"
              className="group p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.07] hover:scale-[1.02] transition-all"
            >
              <div className="text-2xl mb-3">📞</div>
              <div className="text-white font-semibold text-sm mb-1">Phone</div>
              <div className="text-slate-400 text-sm group-hover:text-cyan-400 transition-colors">
                +91 99000 00000
              </div>
            </a>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hello@alexrivera.dev"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-bold hover:opacity-90 hover:scale-105 transition-all shadow-xl shadow-cyan-500/20"
            >
              Send Me a Message →
            </a>
            <a
              href="#projects"
              className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 hover:scale-105 transition-all"
            >
              View Projects
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="text-xl font-black text-white">
            alex<span className="text-cyan-400">.</span>dev
          </div>
          <p className="text-slate-500 text-sm mt-1">
            © {year} Alex Rivera. All rights reserved.
          </p>
        </div>

        {/* Social links */}
        <nav aria-label="Social links">
          <ul className="flex items-center gap-4">
            {[
              {
                label: "GitHub",
                href: "https://github.com",
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                ),
              },
              {
                label: "LinkedIn",
                href: "https://linkedin.com",
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                ),
              },
              {
                label: "Twitter / X",
                href: "https://twitter.com",
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                ),
              },
            ].map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:scale-110 transition-all"
                >
                  {s.icon}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Protfolio() {
  return (
    <div
      className="min-h-screen text-white"
      style={{ background: "#080b14" }}
    >
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Skills />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}