import { Skill } from "@/types/portfolio";

interface SkillsProps {
  skills: Skill[];
}

export default function SkillsSection({ skills }: SkillsProps) {
  if (!skills || skills.length === 0) return null;

  // Group by category
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    const cat = skill.category || "General";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-accent text-sm font-semibold uppercase tracking-widest">Expertise</span>
          <h2 className="font-serif text-4xl font-bold text-gray-900 mt-2">Skills & Proficiency</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {Object.entries(grouped).map(([category, catSkills]) => (
            <div key={category}>
              <h3 className="font-semibold text-gray-400 text-xs uppercase tracking-widest mb-6">
                {category}
              </h3>
              <div className="space-y-5">
                {catSkills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-900">{skill.name}</span>
                      <span className="text-sm font-bold text-accent">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${skill.level}%`,
                          backgroundColor: "var(--accent)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
