import React, { FC } from 'react';
import type { Certification } from '../types/portfolio';
import { Reveal, SectionTag } from './UI';

interface CertificationsProps {
  certifications: Certification[];
}

const Certifications: FC<CertificationsProps> = ({ certifications }) => (
  <section className="sec" id="certifications">
    <div className="sec-inner">
      <Reveal>
        <SectionTag label="Credentials" />
        <h2 className="sec-h">
          <em>Certified</em> Excellence
        </h2>
      </Reveal>
      <Reveal delay="d2">
        <div className="certs-grid">
          {certifications.map((cert, i) => (
            <div key={i} className="cert-card">
              <div className="cert-icon-box">🏆</div>
              <div>
                <div className="cert-title">{cert.title}</div>
                <div className="cert-meta">
                  {cert.issuer} · {cert.year}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

export default Certifications;