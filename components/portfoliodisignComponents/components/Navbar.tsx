"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PortfolioData } from "@/types/portfolio";

interface NavbarProps {
  data: PortfolioData;
  sectionOrder: string[];
}

const sectionLabels: Record<string, string> = {
  hero: "Home",
  about: "About",
  services: "Services",
  projects: "Projects",
  skills: "Skills",
  certifications: "Certifications",
  gallery: "Gallery",
  testimonials: "Testimonials",
  faq: "FAQ",
  contact: "Contact",
  businessInfo: "Business",
};

export default function Navbar({ data, sectionOrder }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = sectionOrder.filter((s) => s !== "hero").map((s) => ({
    href: `#${s}`,
    label: sectionLabels[s] || s,
  }));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="#hero" className="flex items-center gap-2 group">
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
            style={{ backgroundColor: "var(--accent)" }}
          >
            {data.meta.name.charAt(0)}
          </span>
          <span
            className={`font-serif font-semibold text-lg transition-colors ${
              scrolled ? "text-gray-900" : "text-white"
            }`}
          >
            {data.meta.name}
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.slice(0, 6).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                scrolled ? "text-gray-600" : "text-white/90"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="ml-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Contact
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className={`md:hidden p-2 rounded-lg transition-colors ${
            scrolled ? "text-gray-700" : "text-white"
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 font-medium py-1 hover:text-accent transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
