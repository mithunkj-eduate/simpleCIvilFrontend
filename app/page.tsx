import { ExamplesSection } from "@/components/portfolio/Home/ExapleSection";
import {
  CTASectionButton,
  HeroSectionButtons,
} from "@/components/portfolio/Home/SectionButtons";
import type { Metadata } from "next";
import Image from "next/image";
import icon from "@/assets/icon.png";
import { NavbarProtfolio } from "@/components/portfolio/Home/NavbarProtfolio";

const metadata: Metadata = {
  title: "Create Portfolio Website in Seconds",
  description: "Build and publish your portfolio instantly with AI",
};

// ─── Reusable Components ───────────────────────────────────────────────────

export function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl hover:bg-white/8 hover:border-white/20 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}

export function GradientText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
}

export function PrimaryButton({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      className={`relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wide bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 bg-size-200 hover:bg-right text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105 active:scale-95 transition-all duration-300 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wide border border-white/20 text-white/80 hover:text-white hover:border-white/40 hover:bg-white/5 hover:scale-105 active:scale-95 transition-all duration-300 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// ─── Section: Hero ─────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden pt-16">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-violet-700/20 blur-[120px]" />
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full bg-fuchsia-700/15 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-cyan-700/10 blur-[100px]" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Badge */}
      <div className="relative mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-medium tracking-widest uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
        AI-Powered Portfolio Builder
      </div>

      {/* Headline */}
      <h1 className="relative text-center font-black leading-[1.05] tracking-tight mb-6 max-w-4xl">
        <span className="block text-4xl sm:text-6xl lg:text-7xl text-white mb-2">
          Create Your Portfolio
        </span>
        <span className="block text-4xl sm:text-6xl lg:text-7xl">
          <GradientText>Website in Seconds</GradientText>
        </span>
      </h1>

      {/* Subtext */}
      <p className="relative text-center text-white/50 text-lg sm:text-xl max-w-xl mb-10 leading-relaxed">
        No coding. No design. Just enter your details and publish instantly.
      </p>

      {/* CTA Buttons */}
      {/* <div className="relative flex flex-col sm:flex-row gap-4 items-center">
        <PrimaryButton className="text-base px-8 py-4" >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          Build My Website
        </PrimaryButton>
        <GhostButton className="text-base px-8 py-4">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          View Demo
        </GhostButton>
      </div> */}

      <HeroSectionButtons />
      {/* Social proof */}
      <div className="relative mt-14 flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-white/40 text-sm">
        <div className="flex -space-x-2">
          {[
            "bg-violet-500",
            "bg-fuchsia-500",
            "bg-cyan-500",
            "bg-pink-500",
            "bg-indigo-500",
          ].map((c, i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full border-2 border-black ${c} flex items-center justify-center text-[10px] font-bold text-white`}
            >
              {["A", "B", "C", "D", "E"][i]}
            </div>
          ))}
        </div>
        <span>
          <span className="text-white font-semibold">12,000+</span> portfolios
          published this month
        </span>
        <span className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />
        <span>
          ⭐ <span className="text-white font-semibold">4.9/5</span> from 3,400+
          reviews
        </span>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/20 text-xs animate-bounce">
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </section>
  );
}

// ─── Section: How It Works ──────────────────────────────────────────────────

const steps = [
  {
    number: "01",
    title: "Enter Details",
    description:
      "Fill in your name, role, bio, skills, and links. Takes less than 2 minutes.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    ),
    color: "from-violet-500 to-fuchsia-500",
    glow: "shadow-violet-500/20",
  },
  {
    number: "02",
    title: "AI Generates Website",
    description:
      "Our AI instantly crafts a stunning, personalized portfolio tailored to your profile.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
    color: "from-fuchsia-500 to-pink-500",
    glow: "shadow-fuchsia-500/20",
  },
  {
    number: "03",
    title: "Publish Instantly",
    description:
      "Go live with your own subdomain in one click. Share your portfolio with the world.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    color: "from-cyan-500 to-violet-500",
    glow: "shadow-cyan-500/20",
  },
];

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-violet-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Simple Process
          </p>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            How It <GradientText>Works</GradientText>
          </h2>
          <p className="text-white/40 text-lg max-w-md mx-auto">
            Three steps. Zero hassle. A portfolio you&apos;ll be proud to share.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Connector line */}
          <div className="hidden md:block absolute top-[52px] left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px bg-gradient-to-r from-violet-500/30 via-fuchsia-500/30 to-cyan-500/30" />

          {steps.map((step, i) => (
            <GlassCard key={i} className="p-8 relative overflow-hidden group">
              {/* Background glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500 ${step.color}`}
              />

              {/* Step number */}
              <div className="text-[80px] font-black leading-none text-white/[0.04] absolute top-4 right-6 select-none font-mono">
                {step.number}
              </div>

              {/* Icon */}
              <div
                className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white mb-6 shadow-lg ${step.glow} group-hover:scale-110 transition-transform duration-300`}
              >
                {step.icon}
              </div>

              <h3 className="text-white font-bold text-xl mb-3">
                {step.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {step.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Features ──────────────────────────────────────────────────────

const features = [
  {
    title: "Instant Website Creation",
    description:
      "Go from zero to published in under 60 seconds. No waiting, no queue.",
    icon: "⚡",
    color: "from-yellow-500/20 to-orange-500/10",
    border: "border-yellow-500/20",
  },
  {
    title: "Free Hosting",
    description:
      "Your site is hosted on our blazing-fast CDN at absolutely no cost.",
    icon: "☁️",
    color: "from-cyan-500/20 to-blue-500/10",
    border: "border-cyan-500/20",
  },
  //   {
  //     title: "Subdomain Support",
  //     description:
  //       "Get your own branded URL like you.shareurinterest.com instantly.",
  //     icon: "🔗",
  //     color: "from-violet-500/20 to-purple-500/10",
  //     border: "border-violet-500/20",
  //   },
  {
    title: "SEO Optimized",
    description:
      "Built-in meta tags, structured data, and fast load times for top rankings.",
    icon: "🔍",
    color: "from-green-500/20 to-emerald-500/10",
    border: "border-green-500/20",
  },
  {
    title: "Mobile Friendly",
    description:
      "Pixel-perfect on every screen — phones, tablets, and desktops.",
    icon: "📱",
    color: "from-pink-500/20 to-rose-500/10",
    border: "border-pink-500/20",
  },
  {
    title: "Beautiful UI",
    description:
      "Professionally designed templates that make you stand out from the crowd.",
    icon: "✨",
    color: "from-fuchsia-500/20 to-pink-500/10",
    border: "border-fuchsia-500/20",
  },
];

function FeaturesSection() {
  return (
    <section id="features" className="relative py-28 px-4">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[600px] rounded-full bg-fuchsia-700/10 blur-[150px]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-fuchsia-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Everything You Need
          </p>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Packed with <GradientText>Powerful Features</GradientText>
          </h2>
          <p className="text-white/40 text-lg max-w-md mx-auto">
            Every tool you need to build a standout portfolio — included by
            default.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <GlassCard
              key={i}
              className={`p-7 border ${f.border} group cursor-default`}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300`}
              >
                {f.icon}
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">
                {f.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: CTA ──────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section className="relative py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-950/80 via-fuchsia-950/60 to-black p-16 text-center">
          {/* Orbs */}
          <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-violet-600/20 blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-fuchsia-600/20 blur-[80px] pointer-events-none" />

          {/* Decorative ring */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 rounded-3xl border border-violet-500/10" />
          </div>

          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-medium tracking-widest uppercase mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              Free Forever Plan Available
            </div>

            <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
              Start building your
              <br />
              <GradientText>website now</GradientText>
            </h2>

            <p className="text-white/45 text-lg max-w-md mx-auto mb-10 leading-relaxed">
              Join 50,000+ professionals who launched their portfolio with
              ShareUrInterest.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* <PrimaryButton className="text-base px-10 py-4 text-base">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Create My Website
              </PrimaryButton> */}
              <CTASectionButton />

              <span className="text-white/25 text-sm">
                No credit card required
              </span>
            </div>

            {/* Stats row */}
            <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
              {[
                { value: "50K+", label: "Portfolios Created" },
                { value: "99.9%", label: "Uptime Guarantee" },
                { value: "< 1min", label: "Time to Publish" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-black text-white mb-1">
                    <GradientText>{stat.value}</GradientText>
                  </div>
                  <div className="text-white/35 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Component: Footer ──────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          {/* <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
            <svg
              className="w-3.5 h-3.5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div> */}
          <Image
            alt=""
            src={icon ? icon : ""} // Adjust the path to your logo
            className="h-5 w-auto"
            width={200} // Adjust width as needed
            height={200} // Adjust height as needed
          />
          <span className="text-white/70 font-semibold text-sm">
            ShareUrInterest
          </span>
        </div>

        {/* Nav links */}
        <div className="flex flex-wrap justify-center gap-6 text-white/30 text-sm">
          {[
            { title: "Privacy Policy", url: "/legal/privacy-policy" },
            { title: "Terms of Service", url: "/legal/terms-of-service" },
            { title: "Help Center", url: "/legal/help-center" },
            { title: "Contact", url: "/legal/contact" },
          ].map((l, i) => (
            <a
              key={i}
              href={l.url}
              className="hover:text-white/60 transition-colors duration-200"
            >
              {l.title}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Copyright */}
        <p className="text-white/20 text-xs">
          © 2026 ShareUrInterest. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-black antialiased scroll-smooth selection:bg-violet-500/30 selection:text-violet-200">
        {/* <Navbar NavType={LicenseTypes.USER} /> */}
        <NavbarProtfolio />
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <ExamplesSection />
        <CTASection />
        <Footer />
      </main>
    </>
  );
}
