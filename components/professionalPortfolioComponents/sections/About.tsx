import { AboutSection as AboutSectionType } from "@/lib/types";
import {
  GraduationCap,
  Award,
  MapPin,
  Languages,
  Star,
  Briefcase,
  Clock,
  Shield,
  Heart,
  Users,
  CheckCircle,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  GraduationCap,
  Award,
  MapPin,
  Languages,
  Star,
  Briefcase,
  Clock,
  Shield,
  Heart,
  Users,
  CheckCircle,
};

interface AboutProps {
  about: AboutSectionType;
}

export default function About({ about }: AboutProps) {
  return (
    <section id="about" className="section" style={{ background: "var(--surface)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          {about.image && (
            <div className="relative order-2 lg:order-1">
              <div
                className="absolute inset-0 rounded-3xl rotate-3"
                style={{ background: "var(--accent-light)" }}
              />
              <img
                src={about.image}
                alt={about.title}
                className="relative rounded-3xl w-full object-cover shadow-xl"
                style={{ maxHeight: "500px" }}
                loading="lazy"
              />
              <div
                className="card absolute -bottom-5 -right-5 p-5 hidden sm:block"
                style={{ maxWidth: "180px" }}
              >
                <div
                  className="text-3xl font-extrabold"
                  style={{ color: "var(--accent)" }}
                >
                  15+
                </div>
                <div
                  className="text-sm mt-1"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Years of Excellence
                </div>
              </div>
            </div>
          )}

          {/* Content */}
          <div className={about.image ? "order-1 lg:order-2" : "col-span-2"}>
            <div className="section-label">About</div>
            <h2 className="section-title mb-6">{about.title}</h2>
            <p
              className="text-base lg:text-lg leading-relaxed mb-8"
              style={{ color: "var(--text-secondary)" }}
            >
              {about.description}
            </p>

            {/* Highlights */}
            {about.highlights && about.highlights.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-4">
                {about.highlights.map((highlight, i) => {
                  const Icon = iconMap[highlight.icon] || CheckCircle;
                  return (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 rounded-xl"
                      style={{ background: "var(--surface-2)" }}
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background: "var(--accent-light)",
                          color: "var(--accent)",
                        }}
                      >
                        <Icon size={18} />
                      </div>
                      <div>
                        <div
                          className="text-xs font-semibold uppercase tracking-wider mb-0.5"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {highlight.title}
                        </div>
                        <div
                          className="text-sm font-semibold"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {highlight.value}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
