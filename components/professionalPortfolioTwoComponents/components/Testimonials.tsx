import React, { FC } from 'react';
import type { Testimonial } from '../types/portfolio';
import { Reveal, SectionTag } from './UI';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const Testimonials: FC<TestimonialsProps> = ({ testimonials }) => (
  <section className="sec" id="testimonials">
    <div className="sec-inner">
      <Reveal>
        <SectionTag label="Testimonials" />
        <h2 className="sec-h">
          What <em>clients</em> say
        </h2>
      </Reveal>
      <Reveal delay="d2">
        <div className="testi-grid">
          {testimonials.map((t) => (
            <div key={t.id} className="testi-card">
              <div className="testi-qm">&ldquo;</div>
              <div className="testi-stars">{'★'.repeat(Math.min(t.rating, 5))}</div>
              <p className="testi-text">{t.text}</p>
              <div className="testi-author">
                <div className="testi-avatar">{t.name.charAt(0)}</div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role}</div>
                </div>
                <span className="testi-date">{t.date}</span>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

export default Testimonials;