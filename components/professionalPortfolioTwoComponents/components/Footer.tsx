import React, { FC } from 'react';
import type { Meta } from '../types/portfolio';

interface FooterProps {
  meta: Meta;
}

const FOOTER_LINKS = ['about', 'services', 'projects', 'contact'] as const;

const Footer: FC<FooterProps> = ({ meta }) => {
  const [firstName, ...rest] = meta.name.split(' ');
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-brand">
        {firstName}
        <span>.</span>
        {rest.join(' ')}
      </div>
      <div className="footer-links">
        {FOOTER_LINKS.map((link) => (
          <a key={link} href={`#${link}`}>
            {link.charAt(0).toUpperCase() + link.slice(1)}
          </a>
        ))}
      </div>
      <p className="footer-copy">
        © {year} Mehta Architects LLP. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;