"use client";

import { useEffect, useRef, useState } from "react";
import { Skill, Certification } from "@/lib/types";
import { Award, ExternalLink } from "lucide-react";

interface SkillsProps {
  skills: Skill[];
}

interface CertificationsProps {
  certifications: Certification[];
}

function SkillBar({ skill }: { skill: Skill }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
          {skill.name}
        </span>
        <span className="text-sm font-bold" style={{ color: "var(--accent)" }}>
          {skill.level}%
        </span>
      </div>
      <div
        className="h-2 rounded-full overflow-hidden"
        style={{ background: "var(--surface-3)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: visible ? `${skill.level}%` : "0%",
            background: "linear-gradient(90deg, var(--accent) 0%, var(--accent-dark) 100%)",
          }}
        />
      </div>
    </div>
  );
}

export function Skills({ skills }: SkillsProps) {
  if (!skills.length) return null;

  // Group by category
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    const cat = skill.category || "General";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  return (
    <section
      id="skills"
      className="section"
      style={{ background: "var(--surface-2)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="section-label">Expertise</div>
          <h2 className="section-title">
            Skills &amp; <span className="gradient-text">Competencies</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(grouped).map(([category, catSkills]) => (
            <div key={category} className="card p-6">
              <h3
                className="font-bold text-base mb-6 pb-3 border-b"
                style={{
                  color: "var(--text-primary)",
                  borderColor: "var(--border)",
                }}
              >
                {category}
              </h3>
              {catSkills.map((skill, i) => (
                <SkillBar key={i} skill={skill} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Certifications({ certifications }: CertificationsProps) {
  if (!certifications.length) return null;

  return (
    <section
      id="certifications"
      className="section"
      style={{ background: "var(--surface)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="section-label">Credentials</div>
          <h2 className="section-title">
            Certifications &amp;{" "}
            <span className="gradient-text">Achievements</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certifications.map((cert, i) => (
            <div key={i} className="card p-5 flex flex-col items-start gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "var(--accent-light)",
                  color: "var(--accent)",
                }}
              >
                <Award size={20} />
              </div>
              <div>
                <h4
                  className="font-bold text-sm mb-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  {cert.title}
                </h4>
                <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                  {cert.issuer}
                </p>
                <p
                  className="text-xs mt-1 font-medium"
                  style={{ color: "var(--accent)" }}
                >
                  {cert.year}
                </p>
              </div>
              {cert.credential && (
                <a
                  href={cert.credential}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-xs"
                  style={{ color: "var(--accent)" }}
                >
                  <ExternalLink size={11} /> View Certificate
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
