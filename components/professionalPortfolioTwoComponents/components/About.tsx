import React, { FC } from 'react';
import type { About as AboutType } from '../types/portfolio';
import { Reveal, SectionTag } from './UI';

interface AboutProps {
  about: AboutType;
  yearsExperience?: number;
}

const About: FC<AboutProps> = ({ about, yearsExperience = 14 }) => {
  const [before, after] = about.title.split('inspire');

  return (
    <section className="sec" id="about">
      <div className="sec-inner about-grid">
        <Reveal>
          <div className="about-img-wrap">
            <div className="about-frame">
              <img src={about.image} alt="About" loading="lazy" />
            </div>
            <div className="about-accent" />
            <div className="yrs-badge">
              <span className="yrs-n">{yearsExperience}</span>
              <span className="yrs-l">Years</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay="d2">
          <SectionTag label="About" />
          <h2 className="sec-h">
            {before}
            <em>inspire</em>
            {after}
          </h2>
          <p className="sec-p">{about.description}</p>
          <div className="hl-grid">
            {about.highlights.map((h, i) => (
              <div key={i} className="hl-card">
                <div className="hl-icon">{h.icon}</div>
                <div className="hl-title">{h.title}</div>
                <div className="hl-val">{h.value}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default About;