import React, { FC } from 'react';
import type { Skill } from '../types/portfolio';
import { Reveal, SectionTag } from './UI';
import { useSkillAnimation } from '../hooks';

interface SkillsProps {
  skills: Skill[];
}

const Skills: FC<SkillsProps> = ({ skills }) => {
  const [containerRef, animated] = useSkillAnimation<HTMLDivElement>();
  const categories = [...new Set(skills.map((s) => s.category))];

  return (
    <section className="sec" id="skills">
      <div className="sec-inner">
        <Reveal>
          <SectionTag label="Expertise" />
          <h2 className="sec-h">
            Skills & <em>Proficiency</em>
          </h2>
        </Reveal>
        <div ref={containerRef} className="skills-cols">
          {categories.map((category) => (
            <Reveal key={category}>
              <div className="skill-cat-title">{category}</div>
              {skills
                .filter((s) => s.category === category)
                .map((skill, i) => (
                  <div key={i} className="skill-item">
                    <div className="skill-hd">
                      <span className="skill-name-txt">{skill.name}</span>
                      <span className="skill-pct">{skill.level}%</span>
                    </div>
                    <div className="skill-track">
                      <div
                        className="skill-fill"
                        style={{ width: animated ? `${skill.level}%` : '0%' }}
                        aria-valuenow={skill.level}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        role="progressbar"
                      />
                    </div>
                  </div>
                ))}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;