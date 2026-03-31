// ============================================================
// app/page.tsx — JSON-Driven Portfolio Landing Page
// Next.js 14+ App Router · TypeScript · Tailwind CSS
// ============================================================
// HOW TO CUSTOMISE: Edit PORTFOLIO_DATA below.
// Every section renders dynamically from that single object.
// ============================================================

import type { Metadata } from "next";

// ─── 1. PORTFOLIO DATA (edit this to make it yours) ────────────────────────

const PORTFOLIO_DATA1 = {
  meta: {
    title: "Jordan Lee — Full-Stack Developer & Product Engineer",
    description:
      "Personal portfolio of Jordan Lee — a full-stack developer who builds fast, accessible, and revenue-driving digital products with React, Next.js and Node.js.",
    keywords: [
      "portfolio",
      "developer portfolio",
      "nextjs portfolio",
      "full stack developer",
      "react developer",
      "hire developer",
      "personal website",
    ],
    ogImage: "/og-image.png",
    siteUrl: "https://jordanlee.dev",
    twitterHandle: "@jordanlee_dev",
  },
  navbar: {
    brand: "jordan.dev",
    links: [
      { label: "About",        href: "#about" },
      { label: "Services",     href: "#services" },
      { label: "Projects",     href: "#projects" },
      { label: "Skills",       href: "#skills" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Contact",      href: "#contact" },
    ],
    ctaLabel: "Hire Me",
    ctaHref: "#contact",
  },
  hero: {
    availabilityBadge: "Open to new opportunities",
    greeting: "Hi, I'm",
    name: "Jordan Lee",
    tagline: "I craft fast, elegant, revenue-driving web products.",
    subTagline: "6+ years · 50+ shipped products · React · Next.js · Node.js",
    primaryCta:   { label: "View My Work →", href: "#projects" },
    secondaryCta: { label: "Get In Touch",   href: "#contact" },
    stats: [
      { value: "50+", label: "Projects" },
      { value: "6+",  label: "Years" },
      { value: "99%", label: "Satisfaction" },
    ],
  },
  about: {
    sectionLabel: "About Me",
    heading: "I build things for the",
    headingAccent: "web",
    emoji: "🧑‍💻",
    paragraphs: [
      "I'm a full-stack developer based in San Francisco, CA, passionate about turning complex problems into clean, performant products. I obsess over developer experience, accessibility, and shipping features that actually move metrics.",
      "When I'm not coding I write about web performance, contribute to open-source, and explore the latest LLM tooling.",
    ],
    highlights: [
      "Next.js Expert",
      "TypeScript Advocate",
      "Open-Source Contributor",
      "Performance Obsessed",
      "Figma → Code",
      "Remote Friendly",
    ],
    resumeLabel: "Download Resume ↓",
    resumeHref: "#",
    badge: { value: "6+", label: "Years exp." },
  },
  services: {
    sectionLabel: "What I Do",
    heading: "Services I",
    headingAccent: "Offer",
    subheading:
      "End-to-end digital product development — from architecture decisions to final pixel polish.",
    items: [
      { icon: "⚡", title: "Web Development",     desc: "Production-grade web apps built with React/Next.js — fast, accessible, SEO-ready from day one." },
      { icon: "🎨", title: "UI/UX Design",         desc: "Pixel-perfect interfaces that convert. Figma-to-code handoff or design-to-deploy end-to-end." },
      { icon: "🔧", title: "API & Backend",         desc: "RESTful & GraphQL APIs, serverless functions, and microservices architectures that scale." },
      { icon: "☁️", title: "Cloud & DevOps",       desc: "CI/CD pipelines, Docker, Kubernetes, and Vercel/AWS deployments with zero-downtime releases." },
      { icon: "📈", title: "Performance Audits",   desc: "Core Web Vitals optimisation — lazy loading to bundle splitting for perfect Lighthouse scores." },
      { icon: "🤝", title: "Technical Consulting", desc: "Architecture reviews, tech-stack selection, and team mentoring for startups and scale-ups." },
    ],
  },
  projects: {
    sectionLabel: "Portfolio",
    heading: "Selected",
    headingAccent: "Projects",
    subheading:
      "A curated set of products I've designed, built, and shipped — from zero to production.",
    items: [
      {
        emoji: "📊", title: "Pulse Analytics",
        desc: "Real-time SaaS dashboard with sub-100 ms data streaming, custom chart library, and RBAC.",
        tags: ["Next.js", "WebSockets", "Postgres"],
        gradient: "from-cyan-500/20 to-blue-600/20", border: "border-cyan-500/30",
        liveUrl: "#", repoUrl: "#",
      },
      {
        emoji: "🛒", title: "NovaMart",
        desc: "E-commerce platform processing $2M/month with inventory management, Stripe payments, and AI recommendations.",
        tags: ["React", "Node.js", "Stripe"],
        gradient: "from-violet-500/20 to-purple-600/20", border: "border-violet-500/30",
        liveUrl: "#", repoUrl: "#",
      },
      {
        emoji: "🏡", title: "Habitat",
        desc: "Property management app reducing landlord admin by 60% — smart lease tracker, maintenance queue, tenant portal.",
        tags: ["Next.js", "Prisma", "Twilio"],
        gradient: "from-emerald-500/20 to-teal-600/20", border: "border-emerald-500/30",
        liveUrl: "#", repoUrl: "#",
      },
      {
        emoji: "✍️", title: "StoryForge AI",
        desc: "Generative storytelling platform powered by Claude AI with branching narratives and dynamic character memory.",
        tags: ["React", "Claude API", "MongoDB"],
        gradient: "from-amber-500/20 to-orange-600/20", border: "border-amber-500/30",
        liveUrl: "#", repoUrl: "#",
      },
      {
        emoji: "💬", title: "ThreadSync",
        desc: "Slack-like messaging app with end-to-end encryption, 30 ms latency, and offline-first architecture.",
        tags: ["Next.js", "WebRTC", "Redis"],
        gradient: "from-rose-500/20 to-pink-600/20", border: "border-rose-500/30",
        liveUrl: "#", repoUrl: "#",
      },
      {
        emoji: "🚀", title: "LaunchKit",
        desc: "Open-source Next.js SaaS boilerplate: auth, billing, teams, email out of the box. 4k+ GitHub stars.",
        tags: ["Next.js", "Tailwind", "Open Source"],
        gradient: "from-sky-500/20 to-indigo-600/20", border: "border-sky-500/30",
        liveUrl: "#", repoUrl: "#",
      },
    ],
  },
  skills: {
    sectionLabel: "Expertise",
    heading: "My",
    headingAccent: "Skill Set",
    paragraphs: [
      "Years of deliberate practice across the full stack — from meticulously typed TypeScript to battle-tested DevOps pipelines.",
      "I pick the right tool for the job, not the trendiest one. Shipped products beat impressive tech demos every time.",
    ],
    items: [
      { name: "React / Next.js",      pct: 95, color: "#38bdf8" },
      { name: "TypeScript",           pct: 90, color: "#818cf8" },
      { name: "Node.js / Express",    pct: 88, color: "#34d399" },
      { name: "UI/UX Design",         pct: 82, color: "#fb923c" },
      { name: "PostgreSQL / MongoDB", pct: 80, color: "#f472b6" },
      { name: "DevOps / CI-CD",       pct: 75, color: "#facc15" },
    ],
  },
  testimonials: {
    sectionLabel: "Social Proof",
    heading: "What Clients",
    headingAccent: "Say",
    items: [
      {
        name: "Priya Sharma", role: "CPO @ Pulse Analytics",
        body: "Jordan shipped our entire dashboard in 6 weeks — pixel-perfect and 40% faster than our old app. Truly exceptional work.",
        avatar: "PS", gradient: "from-cyan-500 to-blue-600",
      },
      {
        name: "James O'Brien", role: "Founder @ NovaMart",
        body: "Revenue doubled after the re-platform. Jordan's UX focus and checkout performance obsession was a genuine game-changer.",
        avatar: "JO", gradient: "from-violet-500 to-purple-600",
      },
      {
        name: "Lin Wei", role: "CTO @ ThreadSync",
        body: "Best technical collaborator we've ever hired. Delivered 30 ms real-time messaging with rock-solid reliability.",
        avatar: "LW", gradient: "from-emerald-500 to-teal-600",
      },
    ],
  },
  contact: {
    sectionLabel: "Let's Work Together",
    heading: "Ready to Build",
    headingAccent: "Something Great?",
    subheading:
      "Whether you have a project in mind or just want to say hello — my inbox is always open.",
    cards: [
      { icon: "✉️", label: "Email", value: "hello@jordanlee.dev", href: "mailto:hello@jordanlee.dev" },
      { icon: "📞", label: "Phone", value: "+1 (415) 000-0000",   href: "tel:+14150000000" },
    ],
    primaryCta:   { label: "Send Me a Message →", href: "mailto:hello@jordanlee.dev" },
    secondaryCta: { label: "View Projects",        href: "#projects" },
  },
  footer: {
    brand: "jordan.dev",
    tagline: "Building the web, one product at a time.",
    social: [
      {
        label: "GitHub",
        href: "https://github.com",
        svgPath: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
      },
      {
        label: "LinkedIn",
        href: "https://linkedin.com",
        svgPath: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
      },
      {
        label: "Twitter / X",
        href: "https://twitter.com",
        svgPath: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
      },
    ],
  },
} as const;

const PORTFOLIO_DATA= {
  meta: {
    title: "Mithun K J — Full-Stack MERN Developer",
    description:
      "Personal portfolio of Mithun K J — a full-stack MERN developer specializing in building scalable web applications using React, Next.js, Node.js, and MongoDB.",
    keywords: [
      "portfolio",
      "mern developer",
      "full stack developer",
      "react developer",
      "nextjs developer",
      "nodejs developer",
      "hire developer",
      "personal website",
    ],
    ogImage: "/og-image.png",
    siteUrl: "https://mithunkj.dev",
    twitterHandle: "@mithunkj_dev",
  },

  navbar: {
    brand: "mithun.dev",
    links: [
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Projects", href: "#projects" },
      { label: "Skills", href: "#skills" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Contact", href: "#contact" },
    ],
    ctaLabel: "Hire Me",
    ctaHref: "#contact",
  },

  hero: {
    availabilityBadge: "Open to opportunities",
    greeting: "Hi, I'm",
    name: "Mithun K J",
    tagline: "I build scalable, high-performance web applications.",
    subTagline:
      "2+ years · MERN Stack · Next.js · GraphQL · MongoDB",
    primaryCta: { label: "View My Work →", href: "#projects" },
    secondaryCta: { label: "Get In Touch", href: "#contact" },
    stats: [
      { value: "15+", label: "Projects" },
      { value: "2+", label: "Years" },
      { value: "100%", label: "Delivery" },
    ],
  },

  about: {
    sectionLabel: "About Me",
    heading: "I build modern apps for the",
    headingAccent: "web",
    emoji: "💻",
    paragraphs: [
      "I'm a MERN stack developer with 2+ years of experience building scalable and production-ready applications. I specialize in React, Next.js, Node.js, and MongoDB, with strong experience in API integrations and performance optimization.",
      "Currently working on real-world platforms like a civil construction marketplace and advanced Apollo GraphQL setups. I enjoy solving complex problems and building efficient systems.",
    ],
    highlights: [
      "MERN Stack Expert",
      "Next.js & SSR",
      "GraphQL & Apollo",
      "MongoDB & PostgreSQL",
      "REST API Integration",
      "Problem Solver",
    ],
    resumeLabel: "Download Resume ↓",
    resumeHref: "#",
    badge: { value: "2+", label: "Years exp." },
  },

  services: {
    sectionLabel: "What I Do",
    heading: "Services I",
    headingAccent: "Offer",
    subheading:
      "End-to-end development from frontend UI to backend architecture.",
    items: [
      {
        icon: "⚡",
        title: "Frontend Development",
        desc: "Responsive and high-performance UI using React, Next.js, Tailwind, and modern best practices.",
      },
      {
        icon: "🔧",
        title: "Backend Development",
        desc: "Robust backend systems using Node.js, Express, MongoDB, and REST/GraphQL APIs.",
      },
      {
        icon: "📡",
        title: "API Integration",
        desc: "Secure API integrations with authentication, token handling, and real-time data flows.",
      },
      {
        icon: "☁️",
        title: "Deployment",
        desc: "Deploy applications using Vercel, Docker, and cloud services with CI/CD pipelines.",
      },
      {
        icon: "📊",
        title: "Database Design",
        desc: "Efficient schema design using MongoDB & PostgreSQL with optimized queries.",
      },
      {
        icon: "🤝",
        title: "Consulting",
        desc: "Helping startups choose the right tech stack and architecture for scalable systems.",
      },
    ],
  },

  projects: {
    sectionLabel: "Portfolio",
    heading: "My",
    headingAccent: "Projects",
    subheading:
      "Real-world applications I have built and contributed to.",
    items: [
      {
        emoji: "📸",
        title: "ShareMyInterest",
        desc: "Instagram-like social platform with posts, likes, comments, and user interactions.",
        tags: ["React", "Node.js", "MongoDB"],
        gradient: "from-cyan-500/20 to-blue-600/20",
        border: "border-cyan-500/30",
        liveUrl: "#",
        repoUrl: "#",
      },
      {
        emoji: "🏗️",
        title: "Construction Marketplace",
        desc: "Marketplace for rentals, material resale, vendor management, and order tracking.",
        tags: ["Next.js", "MongoDB", "Express"],
        gradient: "from-emerald-500/20 to-teal-600/20",
        border: "border-emerald-500/30",
        liveUrl: "#",
        repoUrl: "#",
      },
      {
        emoji: "📦",
        title: "Inventory & Rental System",
        desc: "System for equipment tracking, rental workflows, and vendor coordination.",
        tags: ["Node.js", "MongoDB", "REST API"],
        gradient: "from-violet-500/20 to-purple-600/20",
        border: "border-violet-500/30",
        liveUrl: "#",
        repoUrl: "#",
      },
      {
        emoji: "📊",
        title: "Excel Report Generator",
        desc: "Advanced Excel generation using ExcelJS with styling, images, and nested data.",
        tags: ["Node.js", "ExcelJS"],
        gradient: "from-amber-500/20 to-orange-600/20",
        border: "border-amber-500/30",
        liveUrl: "#",
        repoUrl: "#",
      },
    ],
  },

  skills: {
    sectionLabel: "Expertise",
    heading: "My",
    headingAccent: "Skills",
    paragraphs: [
      "Strong foundation in full-stack development with focus on real-world applications.",
      "Experienced in modern tools, frameworks, and scalable architecture design.",
    ],
    items: [
      { name: "React / Next.js", pct: 90, color: "#38bdf8" },
      { name: "JavaScript / TypeScript", pct: 88, color: "#818cf8" },
      { name: "Node.js / Express", pct: 85, color: "#34d399" },
      { name: "MongoDB / PostgreSQL", pct: 80, color: "#f472b6" },
      { name: "GraphQL / Apollo", pct: 75, color: "#fb923c" },
      { name: "DevOps / Deployment", pct: 70, color: "#facc15" },
    ],
  },

  testimonials: {
    sectionLabel: "Social Proof",
    heading: "What Clients",
    headingAccent: "Say",
    items: [
      {
        name: "Kiran",
        role: "Team Member",
        body: "Mithun is a highly reliable developer who consistently delivers clean and efficient code.",
        avatar: "K",
        gradient: "from-cyan-500 to-blue-600",
      },
      {
        name: "Project Client",
        role: "Startup Founder",
        body: "Delivered our platform on time with excellent performance and scalability.",
        avatar: "C",
        gradient: "from-violet-500 to-purple-600",
      },
    ],
  },

  contact: {
    sectionLabel: "Let's Work Together",
    heading: "Ready to Build",
    headingAccent: "Something?",
    subheading:
      "Feel free to reach out for collaborations or opportunities.",
    cards: [
      {
        icon: "✉️",
        label: "Email",
        value: "mithunkj.dev@gmail.com",
        href: "mailto:mithunkj.dev@gmail.com",
      },
      {
        icon: "📞",
        label: "Phone",
        value: "+91-XXXXXXXXXX",
        href: "tel:+91XXXXXXXXXX",
      },
    ],
    primaryCta: {
      label: "Send Message →",
      href: "mailto:mithunkj.dev@gmail.com",
    },
    secondaryCta: { label: "View Projects", href: "#projects" },
  },

  footer: {
    brand: "mithun.dev",
    tagline: "Building scalable applications with MERN stack.",
    social: [
      {
        label: "GitHub",
        href: "https://github.com/mithunkj",
        svgPath: "M12 .297c-6.63 0-12 5.373-12 12...",
      },
      {
        label: "LinkedIn",
        href: "https://linkedin.com",
        svgPath: "M20.447 20.452h-3.554v-5.569...",
      },
    ],
  },
} as const;
const PORTFOLIO_DATA3 = {
  meta: {
    title: "Mithun K J — Software Engineer | MERN | Node.js | Microservices",
    description:
      "Portfolio of Mithun K J — Software Engineer with 3.5 years of experience in MERN stack, Node.js, Golang, and microservices architecture. متخصص in scalable backend systems and full-stack applications.",
    keywords: [
      "Mithun K J",
      "MERN developer",
      "Node.js developer",
      "Golang developer",
      "full stack developer",
      "microservices",
      "GraphQL",
      "MongoDB",
      "portfolio",
    ],
    ogImage: "/og-image.png",
    siteUrl: "https://mithun.shareurinterest.com/",
    twitterHandle: "@mithunkj_dev",
  },

  navbar: {
    brand: "mithun.dev",
    links: [
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Projects", href: "#projects" },
      { label: "Skills", href: "#skills" },
      { label: "Experience", href: "#experience" },
      { label: "Contact", href: "#contact" },
    ],
    ctaLabel: "Hire Me",
    ctaHref: "#contact",
  },

  hero: {
    availabilityBadge: "Open to opportunities",
    greeting: "Hi, I'm",
    name: "Mithun K J",
    tagline:
      "Software Engineer building scalable backend systems & modern web apps.",
    subTagline:
      "3.5 Years · MERN · Node.js · Golang · Microservices · GraphQL",
    primaryCta: { label: "View Projects →", href: "#projects" },
    secondaryCta: { label: "Contact Me", href: "#contact" },
    stats: [
      { value: "3.5+", label: "Years Experience" },
      { value: "20+", label: "Projects" },
      { value: "100%", label: "Delivery" },
    ],
  },

  about: {
    sectionLabel: "About Me",
    heading: "I build scalable systems for the",
    headingAccent: "web",
    emoji: "🚀",
    paragraphs: [
      "Results-driven Software Engineer with 3.5 years of experience building scalable backend and full-stack applications using Node.js, MERN stack, and Golang.",
      "Strong expertise in REST APIs, GraphQL services, and microservices architecture. Experienced with MongoDB and PostgreSQL fundamentals including schema design, indexing, and optimization.",
      "Passionate about building high-performance systems and continuously learning new technologies like event-driven architecture and RabbitMQ.",
    ],
    highlights: [
      "MERN Stack",
      "Node.js & Golang",
      "Microservices Architecture",
      "GraphQL (Apollo)",
      "MongoDB & PostgreSQL",
      "AWS (EC2, S3)",
    ],
    resumeLabel: "Download Resume ↓",
    resumeHref: "#",
    badge: { value: "3.5+", label: "Years exp." },
  },

  services: {
    sectionLabel: "What I Do",
    heading: "Services I",
    headingAccent: "Offer",
    subheading:
      "End-to-end product development with scalable architecture and clean UI.",
    items: [
      {
        icon: "⚡",
        title: "Full-Stack Development",
        desc: "Building complete web applications using MERN stack with scalable architecture.",
      },
      {
        icon: "🔧",
        title: "Backend Engineering",
        desc: "Designing RESTful and GraphQL APIs with Node.js, Golang, and microservices.",
      },
      {
        icon: "📡",
        title: "API & Integration",
        desc: "Secure integrations with token-based auth, GraphQL Apollo, and third-party APIs.",
      },
      {
        icon: "☁️",
        title: "Cloud & Deployment",
        desc: "Deploying applications using AWS (EC2, S3), Docker, and CI/CD pipelines.",
      },
      {
        icon: "📊",
        title: "Database Design",
        desc: "Efficient schema design and optimization using MongoDB & PostgreSQL.",
      },
      {
        icon: "🧩",
        title: "Microservices",
        desc: "Designing modular, scalable backend systems using microservices architecture.",
      },
    ],
  },

  projects: {
    sectionLabel: "Portfolio",
    heading: "Key",
    headingAccent: "Projects",
    subheading:
      "Production-level applications and platforms I have built.",
    items: [
      {
        emoji: "🏗️",
        title: "Multi-Vendor Marketplace",
        desc: "Platform for vendors, resellers, and rentals with wallet system, order lifecycle, and admin dashboard.",
        tags: ["React", "Node.js", "MongoDB", "Express"],
        gradient: "from-emerald-500/20 to-teal-600/20",
        border: "border-emerald-500/30",
        liveUrl: "https://apisr.shareurinterest.com/",
        repoUrl: "#",
      },
      {
        emoji: "📸",
        title: "ShareMyInterest",
        desc: "Instagram-like social platform with feeds, likes, authentication, and scalable backend APIs.",
        tags: ["React", "Node.js", "MongoDB"],
        gradient: "from-cyan-500/20 to-blue-600/20",
        border: "border-cyan-500/30",
        liveUrl: "https://snap.shareurinterest.com/",
        repoUrl: "#",
      },
      {
        emoji: "⚙️",
        title: "TransformTMC",
        desc: "Enterprise-grade app with GraphQL, Golang, and Entgo for structured relational data handling.",
        tags: ["React", "TypeScript", "GraphQL", "Golang"],
        gradient: "from-violet-500/20 to-purple-600/20",
        border: "border-violet-500/30",
        liveUrl: "#",
        repoUrl: "#",
      },
      {
        emoji: "🏢",
        title: "SRH (Sriranganatha Hardwares)",
        desc: "Business website with modern UI and backend integration.",
        tags: ["Next.js", "MongoDB"],
        gradient: "from-amber-500/20 to-orange-600/20",
        border: "border-amber-500/30",
        liveUrl: "#",
        repoUrl: "#",
      },
    ],
  },

  skills: {
    sectionLabel: "Expertise",
    heading: "Technical",
    headingAccent: "Skills",
    paragraphs: [
      "Strong experience across backend, frontend, and cloud technologies.",
      "Focused on building scalable, maintainable, and high-performance systems.",
    ],
    items: [
      { name: "Node.js / Express", pct: 90, color: "#34d399" },
      { name: "React / Next.js", pct: 88, color: "#38bdf8" },
      { name: "Golang", pct: 75, color: "#818cf8" },
      { name: "GraphQL (Apollo)", pct: 85, color: "#fb923c" },
      { name: "MongoDB", pct: 85, color: "#f472b6" },
      { name: "AWS / DevOps", pct: 70, color: "#facc15" },
    ],
  },

  experience: {
    sectionLabel: "Experience",
    heading: "Work",
    headingAccent: "Experience",
    items: [
      {
        company: "Eduate Pvt. Ltd.",
        role: "Software Engineer",
        duration: "Nov 2024 – Present",
        points: [
          "Developed scalable frontend apps using React.js & TypeScript",
          "Integrated Google Maps API for real-time tracking",
          "Built backend services using Golang & Entgo",
          "Implemented secure auth with access/refresh tokens",
          "Worked with GraphQL Apollo for optimized data fetching",
          "Designed microservices-based backend architecture",
        ],
      },
      {
        company: "Bubblesort Tech LLP",
        role: "Software Engineer",
        duration: "Jan 2023 – Nov 2024",
        points: [
          "Built full-stack MERN applications",
          "Implemented JWT authentication systems",
          "Developed e-commerce features and REST APIs",
          "Designed scalable database schemas",
          "Worked across full SDLC lifecycle",
        ],
      },
    ],
  },


  testimonials: {
    sectionLabel: "Social Proof",
    heading: "What Clients",
    headingAccent: "Say",
    items: [
      {
        name: "Kiran",
        role: "Team Member",
        body: "Mithun is a highly reliable developer who consistently delivers clean and efficient code.",
        avatar: "K",
        gradient: "from-cyan-500 to-blue-600",
      },
      {
        name: "Project Client",
        role: "Startup Founder",
        body: "Delivered our platform on time with excellent performance and scalability.",
        avatar: "C",
        gradient: "from-violet-500 to-purple-600",
      },
    ],
  },

  contact: {
    sectionLabel: "Contact",
    heading: "Get In",
    headingAccent: "Touch",
    subheading:
      "Let's connect and build something amazing together.",
    cards: [
      {
        icon: "✉️",
        label: "Email",
        value: "mithunkj1996@gmail.com",
        href: "mailto:mithunkj1996@gmail.com",
      },
      {
        icon: "📞",
        label: "Phone",
        value: "+91 63618 49001",
        href: "tel:+916361849001",
      },
    ],
    primaryCta: {
      label: "Send Email →",
      href: "mailto:mithunkj1996@gmail.com",
    },
    secondaryCta: {
      label: "GitHub",
      href: "https://github.com/mithunkj-eduate",
    },
  },

  footer: {
    brand: "mithun.dev",
    tagline: "Building scalable systems with modern technologies.",
    social: [
      {
        label: "GitHub",
        href: "https://github.com/mithunkj-eduate",
        svgPath: "M12 .297c-6.63 0-12 5.373-12 12...",
      },
      {
        label: "LinkedIn",
        href: "https://linkedin.com/in/mithun-k-j-8118b9274",
        svgPath: "M20.447 20.452h-3.554v-5.569...",
      },
    ],
  },
} as const;
// ─── 2. METADATA (driven from JSON) ────────────────────────────────────────

export const metadata: Metadata = {
  title: PORTFOLIO_DATA.meta.title,
  description: PORTFOLIO_DATA.meta.description,
  keywords: [...PORTFOLIO_DATA.meta.keywords],
  authors: [{ name: PORTFOLIO_DATA.navbar.brand }],
  metadataBase: new URL(PORTFOLIO_DATA.meta.siteUrl),
  openGraph: {
    title: PORTFOLIO_DATA.meta.title,
    description: PORTFOLIO_DATA.meta.description,
    type: "website",
    locale: "en_US",
    url: PORTFOLIO_DATA.meta.siteUrl,
    images: [{ url: PORTFOLIO_DATA.meta.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: PORTFOLIO_DATA.meta.title,
    description: PORTFOLIO_DATA.meta.description,
    creator: PORTFOLIO_DATA.meta.twitterHandle,
    images: [PORTFOLIO_DATA.meta.ogImage],
  },
  robots: { index: true, follow: true },
};

// ─── 3. PRIMITIVE COMPONENTS ───────────────────────────────────────────────

const BG = "#07090f";

type OrbProps = { className?: string; color: string };
function GradientOrb({ className = "", color }: OrbProps) {
  return (
    <div
      aria-hidden="true"
      className={`absolute rounded-full blur-3xl opacity-[0.17] pointer-events-none ${className}`}
      style={{ background: color }}
    />
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase bg-white/5 border border-white/10 text-slate-300 mb-4">
      {children}
    </span>
  );
}

type HeadingProps = { plain: string; accent: string; accentColor?: string };
function SectionHeading({ plain, accent, accentColor = "text-cyan-400" }: HeadingProps) {
  return (
    <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
      {plain} <span className={accentColor}>{accent}</span>
    </h2>
  );
}

function Chip({ label }: { label: string }) {
  return (
    <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs text-slate-300 font-medium">
      {label}
    </span>
  );
}

// ─── 4. NAVBAR ─────────────────────────────────────────────────────────────

function Navbar() {
  const { brand, links, ctaLabel, ctaHref } = PORTFOLIO_DATA.navbar;
  const [name, ext] = brand.split(".");
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#07090f]/80 backdrop-blur-xl border-b border-white/[0.06]">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between" aria-label="Main navigation">
        <a href="#hero" className="text-xl font-black tracking-tight text-white hover:text-cyan-400 transition-colors">
          {name}<span className="text-cyan-400">.</span>{ext}
        </a>

        <ul className="hidden md:flex items-center gap-7" role="list">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm text-slate-400 hover:text-white font-medium transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={ctaHref}
          className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full bg-cyan-500 text-[#07090f] text-sm font-bold hover:bg-cyan-400 hover:scale-105 transition-all shadow-lg shadow-cyan-500/25"
        >
          {ctaLabel}
        </a>

        {/* Mobile indicator */}
        <div className="md:hidden flex flex-col gap-1.5 p-2" aria-label="Menu">
          <span className="block w-5 h-0.5 bg-white rounded" />
          <span className="block w-5 h-0.5 bg-white rounded" />
          <span className="block w-4 h-0.5 bg-white rounded" />
        </div>
      </nav>
    </header>
  );
}

// ─── 5. HERO ───────────────────────────────────────────────────────────────

function Hero() {
  const { availabilityBadge, greeting, name, tagline, subTagline, primaryCta, secondaryCta, stats } = PORTFOLIO_DATA.hero;
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <GradientOrb className="w-[700px] h-[700px] -top-40 -left-40" color="radial-gradient(circle, #06b6d4, transparent)" />
      <GradientOrb className="w-[600px] h-[600px] bottom-0 right-0"  color="radial-gradient(circle, #6366f1, transparent)" />

      {/* Dot grid */}
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.035]"
        style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
          {availabilityBadge}
        </div>

        <h1 className="text-6xl md:text-[5.5rem] font-black text-white leading-none tracking-tight mb-6">
          {greeting}{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
            {name}
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto mb-3 leading-relaxed font-light">
          {tagline}
        </p>
        <p className="text-slate-500 text-sm mb-12 max-w-xl mx-auto">{subTagline}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={primaryCta.href} className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-bold text-base hover:opacity-90 hover:scale-105 transition-all shadow-xl shadow-cyan-500/20">
            {primaryCta.label}
          </a>
          <a href={secondaryCta.href} className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-base hover:bg-white/10 hover:scale-105 transition-all backdrop-blur-sm">
            {secondaryCta.label}
          </a>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-3 gap-6 max-w-sm mx-auto">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-black text-white">{s.value}</div>
              <div className="text-slate-500 text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div aria-hidden="true" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-25 pointer-events-none">
        <span className="text-[10px] text-slate-400 tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-slate-400 to-transparent" />
      </div>
    </section>
  );
}

// ─── 6. ABOUT ──────────────────────────────────────────────────────────────

function About() {
  const { sectionLabel, heading, headingAccent, emoji, paragraphs, highlights, resumeLabel, resumeHref, badge } = PORTFOLIO_DATA.about;
  return (
    <section id="about" className="relative py-28 overflow-hidden">
      <GradientOrb className="w-[500px] h-[500px] top-0 right-0" color="radial-gradient(circle, #6366f1, transparent)" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Avatar card */}
          <div className="relative flex justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/30 to-indigo-600/30 rotate-6 scale-105" />
              <div className="relative w-full h-full rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-900/40 to-indigo-900/40 flex items-center justify-center text-9xl select-none">
                {emoji}
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[#0f1629] border border-white/10 rounded-2xl px-4 py-3 shadow-2xl">
                <div className="text-2xl font-black text-white">{badge.value}</div>
                <div className="text-xs text-slate-400">{badge.label}</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <SectionLabel>{sectionLabel}</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              {heading} <span className="text-cyan-400">{headingAccent}</span>.
            </h2>
            {paragraphs.map((p, i) => (
              <p key={i} className="mt-5 text-slate-400 leading-relaxed text-lg">{p}</p>
            ))}
            <ul className="mt-8 grid grid-cols-2 gap-3" role="list">
              {highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-sm text-slate-300">
                  <span className="text-cyan-400 text-base" aria-hidden="true">✦</span> {h}
                </li>
              ))}
            </ul>
            <a href={resumeHref} className="mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 hover:scale-105 transition-all text-sm">
              {resumeLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 7. SERVICES ───────────────────────────────────────────────────────────

function Services() {
  const { sectionLabel, heading, headingAccent, subheading, items } = PORTFOLIO_DATA.services;
  return (
    <section id="services" className="relative py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionLabel>{sectionLabel}</SectionLabel>
          <SectionHeading plain={heading} accent={headingAccent} accentColor="text-indigo-400" />
          <p className="mt-4 text-slate-400 max-w-xl mx-auto">{subheading}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <article key={item.title} className="group p-7 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/20 hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
              <div className="text-4xl mb-4" aria-hidden="true">{item.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 8. PROJECTS ───────────────────────────────────────────────────────────

function Projects() {
  const { sectionLabel, heading, headingAccent, subheading, items } = PORTFOLIO_DATA.projects;
  return (
    <section id="projects" className="relative py-28 overflow-hidden">
      <GradientOrb className="w-[500px] h-[500px] bottom-0 left-0" color="radial-gradient(circle, #06b6d4, transparent)" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionLabel>{sectionLabel}</SectionLabel>
          <SectionHeading plain={heading} accent={headingAccent} accentColor="text-cyan-400" />
          <p className="mt-4 text-slate-400 max-w-xl mx-auto">{subheading}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <article key={item.title} className={`group relative p-7 rounded-2xl bg-gradient-to-br ${item.gradient} border ${item.border} hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 overflow-hidden`}>
              {/* Dot texture */}
              <div aria-hidden="true" className="absolute inset-0 opacity-[0.04]"
                style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
              <div className="relative">
                <div className="text-4xl mb-4" aria-hidden="true">{item.emoji}</div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-5">{item.desc}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {item.tags.map((t) => <Chip key={t} label={t} />)}
                </div>
                <div className="flex gap-3">
                  <a href={item.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-white/70 hover:text-white border border-white/10 px-3 py-1.5 rounded-full hover:bg-white/10 transition-all font-medium">Live ↗</a>
                  <a href={item.repoUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-white/70 hover:text-white border border-white/10 px-3 py-1.5 rounded-full hover:bg-white/10 transition-all font-medium">Repo ↗</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 9. SKILLS ─────────────────────────────────────────────────────────────

function Skills() {
  const { sectionLabel, heading, headingAccent, paragraphs, items } = PORTFOLIO_DATA.skills;
  return (
    <section id="skills" className="relative py-28 overflow-hidden">
      <GradientOrb className="w-[500px] h-[500px] top-0 right-0" color="radial-gradient(circle, #a855f7, transparent)" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel>{sectionLabel}</SectionLabel>
            <SectionHeading plain={heading} accent={headingAccent} accentColor="text-violet-400" />
            {paragraphs.map((p, i) => (
              <p key={i} className="mt-5 text-slate-400 leading-relaxed">{p}</p>
            ))}
          </div>
          <div className="space-y-6">
            {items.map((sk) => (
              <div key={sk.name}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white font-semibold">{sk.name}</span>
                  <span className="text-slate-400">{sk.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${sk.pct}%`,
                      background: `linear-gradient(90deg, ${sk.color}bb, ${sk.color})`,
                      boxShadow: `0 0 10px ${sk.color}55`,
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

// ─── 10. TESTIMONIALS ──────────────────────────────────────────────────────

function Testimonials() {
  const { sectionLabel, heading, headingAccent, items } = PORTFOLIO_DATA.testimonials;
  return (
    <section id="testimonials" className="relative py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionLabel>{sectionLabel}</SectionLabel>
          <SectionHeading plain={heading} accent={headingAccent} accentColor="text-emerald-400" />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item) => (
            <blockquote key={item.name} className="p-7 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:scale-[1.02] transition-all duration-300 flex flex-col gap-5">
              <span className="text-3xl text-slate-700 leading-none select-none" aria-hidden="true">&ldquo;</span>
              <p className="text-slate-300 text-sm leading-relaxed flex-1">{item.body}</p>
              <footer className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white text-xs font-black flex-shrink-0`} aria-hidden="true">
                  {item.avatar}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{item.name}</div>
                  <div className="text-slate-500 text-xs">{item.role}</div>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 11. CONTACT ───────────────────────────────────────────────────────────

function Contact() {
  const { sectionLabel, heading, headingAccent, subheading, cards, primaryCta, secondaryCta } = PORTFOLIO_DATA.contact;
  return (
    <section id="contact" className="relative py-28 overflow-hidden">
      <GradientOrb className="w-[600px] h-[600px] bottom-0 left-1/2 -translate-x-1/2" color="radial-gradient(circle, #06b6d4, #6366f1, transparent)" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <SectionLabel>{sectionLabel}</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
            {heading} <span className="text-cyan-400">{headingAccent}</span>
          </h2>
          <p className="mt-6 text-slate-400 text-lg leading-relaxed">{subheading}</p>

          <div className="mt-12 grid sm:grid-cols-2 gap-4 text-left">
            {cards.map((card) => (
              <a key={card.label} href={card.href} className="group p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.07] hover:scale-[1.02] transition-all">
                <div className="text-2xl mb-3" aria-hidden="true">{card.icon}</div>
                <div className="text-white font-semibold text-sm mb-1">{card.label}</div>
                <div className="text-slate-400 text-sm group-hover:text-cyan-400 transition-colors">{card.value}</div>
              </a>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a href={primaryCta.href} className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-bold hover:opacity-90 hover:scale-105 transition-all shadow-xl shadow-cyan-500/20">
              {primaryCta.label}
            </a>
            <a href={secondaryCta.href} className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 hover:scale-105 transition-all">
              {secondaryCta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 12. FOOTER ────────────────────────────────────────────────────────────

function Footer() {
  const { brand, tagline, social } = PORTFOLIO_DATA.footer;
  const [name, ext] = brand.split(".");
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/[0.05] py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <div className="text-xl font-black text-white">
            {name}<span className="text-cyan-400">.</span>{ext}
          </div>
          <p className="text-slate-500 text-sm mt-1">{tagline}</p>
          <p className="text-slate-600 text-xs mt-0.5">© {year} All rights reserved.</p>
        </div>
        <nav aria-label="Social links">
          <ul className="flex items-center gap-3" role="list">
            {social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:scale-110 transition-all">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                    <path d={s.svgPath} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}

// ─── 13. PAGE ROOT ─────────────────────────────────────────────────────────

export default function PortfolioJson() {
  return (
    <>
      <style>{`html { scroll-behavior: smooth; }`}</style>
      <div className="min-h-screen text-white" style={{ background: BG }}>
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
    </>
  );
}