import React, { FC } from 'react';
import type { Contact as ContactType, BusinessInfo, SocialLink } from '../types/portfolio';
import { Reveal, SectionTag } from './UI';

interface ContactProps {
  contact: ContactType;
  businessInfo: BusinessInfo;
  socialLinks: SocialLink[];
}

const Contact: FC<ContactProps> = ({ contact, businessInfo, socialLinks }) => {
  const whatsappNumber = contact.whatsapp.replace(/\D/g, '');

  const contactDetails: Array<{ icon: string; label: string; content: React.ReactNode }> = [
    {
      icon: '📧',
      label: 'Email',
      content: <a href={`mailto:${contact.email}`}>{contact.email}</a>,
    },
    {
      icon: '📞',
      label: 'Phone',
      content: <a href={`tel:${contact.phone}`}>{contact.phone}</a>,
    },
    {
      icon: '💬',
      label: 'WhatsApp',
      content: (
        <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">
          {contact.whatsapp}
        </a>
      ),
    },
    {
      icon: '📍',
      label: 'Address',
      content: <span>{contact.address}</span>,
    },
  ];

  const bizRows: Array<[string, string]> = [
    ['Owner', businessInfo.ownerName],
    ['Registration', businessInfo.registrationNumber],
    ['GST', businessInfo.gst],
    ['License', businessInfo.licenseNumber],
    ...businessInfo.additionalInfo.map<[string, string]>((x) => [x.label, x.value]),
  ];

  return (
    <section className="sec" id="contact">
      <div className="sec-inner contact-layout">
        <Reveal>
          <SectionTag label="Contact" />
          <h2 className="sec-h">
            Let's build something <em>remarkable</em>
          </h2>
          <p className="sec-p">
            Ready to begin? Schedule a complimentary 45-minute consultation to discuss your
            vision, timeline, and budget.
          </p>

          <div className="contact-rows">
            {contactDetails.map((row, i) => (
              <div key={i} className="contact-row">
                <div className="contact-icon-box">{row.icon}</div>
                <div>
                  <div className="contact-label">{row.label}</div>
                  <div className="contact-val">{row.content}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="hours-section">
            <div className="hours-title">Studio Hours</div>
            {contact.workingHours.map((h, i) => (
              <div key={i} className="hours-row">
                <span className="hours-day">{h.day}</span>
                {h.closed ? (
                  <span className="hours-closed">Closed</span>
                ) : (
                  <span className="hours-time">{h.hours}</span>
                )}
              </div>
            ))}
          </div>

          <div className="socials">
            {socialLinks.map((s, i) => (
              <a
                key={i}
                href={s.url}
                className="social-btn"
                target="_blank"
                rel="noreferrer"
                aria-label={s.platform}
              >
                {s.icon} {s.platform}
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay="d2">
          <div className="biz-card">
            <div className="biz-hd">
              <div className="biz-hd-label">Business Information</div>
              <div className="biz-hd-name">Mehta Architects LLP</div>
            </div>
            {bizRows.map(([key, value], i) => (
              <div key={i} className="biz-row">
                <span className="biz-key">{key}</span>
                <span className="biz-val">{value}</span>
              </div>
            ))}
            <div className="biz-est">
              <div className="biz-est-label">Established</div>
              <span className="biz-est-val">{businessInfo.established}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;