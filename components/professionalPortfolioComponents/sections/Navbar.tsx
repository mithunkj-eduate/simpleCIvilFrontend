"use client";

import { useState, useEffect } from "react";
import { PortfolioData } from "@/lib/types";
import {
  Menu,
  X,
  Sun,
  Moon,
  Phone,
} from "lucide-react";

interface NavbarProps {
  data: PortfolioData;
}

const navItems = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ data }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const filteredNav = navItems.filter((item) => {
    if (item.href === "#services" && !data.services?.length) return false;
    if (item.href === "#projects" && !data.projects?.length) return false;
    if (item.href === "#gallery" && !data.gallery?.length) return false;
    if (item.href === "#testimonials" && !data.testimonials?.length)
      return false;
    return true;
  });

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm"
              style={{ background: "var(--accent)" }}
            >
              {data.meta.name.charAt(0)}
            </div>
            <span className="font-bold text-base text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors hidden sm:block">
              {data.meta.name}
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {filteredNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--accent-light)] transition-all duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {data.contact?.phone && (
              <a
                href={`tel:${data.contact.phone}`}
                className="hidden lg:flex items-center gap-2 btn-primary text-sm py-2 px-4"
              >
                <Phone size={14} />
                {data.contact.phone}
              </a>
            )}
            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--surface-2)] hover:text-[var(--accent)] transition-all"
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--surface-2)] transition-all"
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden py-4 border-t border-[var(--border)] bg-[var(--surface)]">
            {filteredNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--surface-2)] rounded-lg transition-colors"
              >
                {item.label}
              </a>
            ))}
            {data.contact?.phone && (
              <a
                href={`tel:${data.contact.phone}`}
                className="mt-2 mx-4 btn-primary justify-center text-sm"
              >
                <Phone size={14} />
                Call Now
              </a>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
