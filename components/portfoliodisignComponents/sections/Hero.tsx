"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Hero as HeroType, Meta } from "@/types/portfolio";

const iconMap: Record<string, React.ReactNode> = {
  calendar: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  "arrow-right": (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  ),
  phone: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
};

interface HeroProps {
  hero: HeroType;
  meta: Meta;
}

export default function HeroSection({ hero, meta }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = hero.carousel && hero.carousel.length > 0 ? hero.carousel : hero.image ? [hero.image] : [];

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label={`${meta.name} – ${meta.tagline}`}
    >
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0">
        {images.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: i === currentSlide ? 1 : 0 }}
          >
            <Image
              src={src}
              alt={`${meta.name} background ${i + 1}`}
              fill
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-900/70 to-gray-950/40" />
      </div>

      {/* Slide indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentSlide ? "w-8 bg-white" : "w-2 bg-white/40"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        <div>
          {/* Profession badge */}
          <div className="inline-flex items-center gap-2 mb-6 opacity-0 animate-fade-up animate-delay-100">
            <span
              className="px-4 py-1.5 rounded-full text-sm font-semibold text-white border border-white/20 backdrop-blur-sm"
              style={{ backgroundColor: "color-mix(in srgb, var(--accent) 30%, transparent)" }}
            >
              {meta.profession}
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 opacity-0 animate-fade-up animate-delay-200">
            {hero.heading}
          </h1>

          <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-8 max-w-xl opacity-0 animate-fade-up animate-delay-300">
            {hero.subheading}
          </p>

          {/* CTA Buttons */}
          {hero.cta && hero.cta.length > 0 && (
            <div className="flex flex-wrap gap-4 mb-12 opacity-0 animate-fade-up animate-delay-400">
              {hero.cta.map((btn) => (
                <Link
                  key={btn.label}
                  href={btn.href}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    btn.variant === "primary"
                      ? "text-white shadow-lg hover:opacity-90 hover:-translate-y-0.5"
                      : "bg-white/10 text-white border border-white/30 hover:bg-white/20 backdrop-blur-sm"
                  }`}
                  style={
                    btn.variant === "primary"
                      ? { backgroundColor: "var(--accent)" }
                      : {}
                  }
                >
                  {btn.icon && iconMap[btn.icon]}
                  {btn.label}
                </Link>
              ))}
            </div>
          )}

          {/* Stats */}
          {hero.stats && hero.stats.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 opacity-0 animate-fade-up animate-delay-400">
              {hero.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-center"
                >
                  <p className="text-2xl font-bold text-white font-serif">{stat.value}</p>
                  <p className="text-xs text-white/70 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile image */}
        {hero.image && (
          <div className="hidden lg:flex justify-end opacity-0 animate-fade-up animate-delay-200">
            <div className="relative w-80 h-96">
              <div
                className="absolute inset-0 rounded-3xl opacity-20 blur-2xl"
                style={{ backgroundColor: "var(--accent)" }}
              />
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl">
                <Image
                  src={hero.image}
                  alt={meta.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-4 py-3 shadow-xl flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-semibold text-gray-900">Available Now</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
