// ─── Section: Live Examples ─────────────────────────────────────────────────
"use client";
import { GlassCard, GradientText } from "@/app/page";
import { BASE_URL_FRONTEND_PORTFOILIO } from "@/components/helpers/apiheader";
import { useRouter } from "next/navigation";

const examples = [
  {
    username: "alex-sharma",
    role: "Full Stack Developer",
    tags: ["React", "Node.js", "TypeScript"],
    avatar: "AS",
    color: "from-violet-600 to-fuchsia-600",
    views: "2.4k",
    url: `${BASE_URL_FRONTEND_PORTFOILIO}/alex-sharma`,
  },
  {
    username: "priya-design",
    role: "UI/UX Designer",
    tags: ["Figma", "Webflow", "Motion"],
    avatar: "PD",
    color: "from-fuchsia-600 to-pink-600",
    views: "5.1k",
    url: `${BASE_URL_FRONTEND_PORTFOILIO}/bubbleportfolio/priya-design`,
  },
  {
    username: "rahul-builds",
    role: "Product Manager",
    tags: ["Strategy", "Agile", "GTM"],
    avatar: "RB",
    color: "from-cyan-600 to-violet-600",
    views: "1.8k",
    url: `${BASE_URL_FRONTEND_PORTFOILIO}/cursorportfolio/rahul-builds`,
  },
  {
    username: "sara-codes",
    role: "ML Engineer",
    tags: ["Python", "TensorFlow", "LLMs"],
    avatar: "SC",
    color: "from-pink-600 to-rose-600",
    views: "3.7k",
    url: `${BASE_URL_FRONTEND_PORTFOILIO}/developerportfolio/sara-codes`,
  },
];

export function ExamplesSection() {
  const nav = useRouter();
  return (
    <section id="examples" className="relative py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-cyan-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Real Portfolios
          </p>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            See What People Are <GradientText>Building</GradientText>
          </h2>
          <p className="text-white/40 text-lg max-w-md mx-auto">
            Thousands of professionals already have their portfolio live and
            growing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {examples.map((ex, i) => (
            <GlassCard
              key={i}
              className="p-6 group cursor-pointer overflow-hidden relative"
            >
              {/* Top glow on hover */}
              <div
                className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${ex.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              {/* Avatar */}
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${ex.color} flex items-center justify-center text-white font-black text-lg mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
              >
                {ex.avatar}
              </div>

              {/* Role */}
              <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-1">
                {ex.role}
              </p>

              {/* Domain */}
              <p
                className="text-white font-bold text-sm mb-4 truncate"
                onClick={() => ex.url && nav.push(ex.url)}
              >
                <span className="text-white/40">🌐 </span>

                <span className="text-white/30">shareurinterest.com/</span>
                {ex.username}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {ex.tags.map((t, j) => (
                  <span
                    key={j}
                    className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/50 text-xs font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Views */}
              <div className="flex items-center gap-1.5 text-white/30 text-xs">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                {ex.views} views this week
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
