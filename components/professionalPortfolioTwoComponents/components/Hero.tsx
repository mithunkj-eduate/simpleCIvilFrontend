"use client";

import React, { FC } from "react";
import type { Hero as HeroType, Meta } from "../types/portfolio";
import { SafeImage } from "@/app/utils/SafeImage";
import { convertDriveToImageUrl } from "@/lib/utils";

interface HeroProps {
  hero: HeroType;
  meta: Meta;
}

const Hero: FC<HeroProps> = ({ hero, meta }) => {
  return (
    <section className="hero" id="home">
      <div className="hero-bg" />
      <div className="hero-grid-lines" />

      <div className="hero-left">
        <div className="eyebrow">
          <div className="eyebrow-dash" />
          <span className="eyebrow-txt">{meta.profession}</span>
        </div>

        <h1 className="hero-name">{hero.heading}</h1>
        <div className="hero-role">{hero.subheading}</div>
        <p className="hero-desc">{meta.description}</p>

        <div className="hero-ctas">
          {hero.cta.map((c, i) => (
            <a
              key={i}
              href={c.href}
              className={c.variant === "primary" ? "btn-gold" : "btn-outline"}
            >
              {c.label}
              {c.icon && <span className="btn-icon">{c.icon}</span>}
            </a>
          ))}
        </div>

        <div className="hero-stats">
          {hero.stats.map((s, i) => (
            <div key={i} className="hero-stat">
              <span className="stat-val">{s.value}</span>
              <div className="stat-lbl">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-right">
        {hero.image && convertDriveToImageUrl(hero.image) ? (
          <SafeImage
            height={500}
            width={500}
            src={convertDriveToImageUrl(hero.image) ?? hero.image}
            alt={meta.name}
            className="max-w-full max-h-[85vh] rounded-xl shadow-2xl object-contain"
            // onClick={(e) => e.stopPropagation()}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={hero.image} alt={meta.name} />
        )}
        <div className="hero-right-overlay" />
        <div className="hero-badge">
          <div className="badge-name">{meta.name}</div>
          <div className="badge-role-row">
            <span className="pulse-dot" />
            Available for Projects
          </div>
        </div>
      </div>

      <div className="scroll-hint">
        <span>Scroll</span>
        <div className="scroll-line-anim" />
      </div>
    </section>
  );
};

export default Hero;
