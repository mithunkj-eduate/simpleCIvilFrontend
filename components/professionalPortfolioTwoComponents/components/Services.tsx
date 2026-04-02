import React, { FC } from 'react';
import type { Service } from '../types/portfolio';
import { Reveal, SectionTag } from './UI';

interface ServicesProps {
  services: Service[];
}

const Services: FC<ServicesProps> = ({ services }) => (
  <section className="sec" id="services">
    <div className="sec-inner">
      <Reveal>
        <SectionTag label="Services" />
        <h2 className="sec-h">
          What I <em>create</em> for you
        </h2>
      </Reveal>
      <Reveal delay="d1">
        <p className="sec-p">
          From intimate residences to urban masterplans — each project receives obsessive attention
          to craft, context, and client vision.
        </p>
      </Reveal>
      <Reveal delay="d2">
        <div className="srv-grid">
          {services.map((service, i) => (
            <div key={service.id} className="srv-card">
              <span className="srv-num">0{i + 1}</span>
              {service.badge && (
                <div>
                  <span className="srv-bdg">{service.badge}</span>
                </div>
              )}
              <div className="srv-title">{service.title}</div>
              <p className="srv-desc">{service.description}</p>
              <div className="srv-price-row">
                <span className="srv-price">{service.price}</span>
                <span className="srv-dur">{service.duration}</span>
              </div>
              <ul className="srv-feats">
                {service.features.map((feat, j) => (
                  <li key={j}>{feat}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

export default Services;