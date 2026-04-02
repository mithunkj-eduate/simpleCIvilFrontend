import React, { FC } from 'react';
import type { Meta } from '../types/portfolio';
import { useScrolled } from '../hooks';

interface NavProps {
  meta: Meta;
}

const NAV_SECTIONS = ['about', 'services', 'projects', 'gallery', 'testimonials', 'contact'] as const;

const Nav: FC<NavProps> = ({ meta }) => {
  const scrolled = useScrolled();
  const [firstName, ...rest] = meta.name.split(' ');

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-logo">
        {firstName}<span>.</span>{rest.join(' ')}
      </div>
      <ul className="nav-links">
        {NAV_SECTIONS.map((section) => (
          <li key={section}>
            <a href={`#${section}`}>
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          </li>
        ))}
      </ul>
      <a href="#contact" className="nav-hire">Hire Me</a>
    </nav>
  );
};

export default Nav;