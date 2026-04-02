import React, { FC, ReactNode } from 'react';
import { useReveal } from '../hooks';

// ── Reveal ─────────────────────────────────────────────────────────────────
interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: '' | 'd1' | 'd2' | 'd3' | 'd4';
}

export const Reveal: FC<RevealProps> = ({ children, className = '', delay = '' }) => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${delay} ${className}`.trim()}>
      {children}
    </div>
  );
};

// ── SectionTag ────────────────────────────────────────────────────────────
interface SectionTagProps {
  label: string;
}

export const SectionTag: FC<SectionTagProps> = ({ label }) => (
  <div className="sec-tag">
    <span>{label}</span>
  </div>
);

// ── Divider ───────────────────────────────────────────────────────────────
export const Divider: FC = () => <hr className="divider" />;