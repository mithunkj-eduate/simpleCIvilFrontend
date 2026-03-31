import { PortfolioData } from "@/lib/types";
import {
  Globe,
  Link2,
  ExternalLink,
  // Heart,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

const socialIconMap: Record<string, React.ElementType> = {
  Linkedin: Link2,
  Twitter: ExternalLink,
  Instagram: Globe,
  Youtube: Globe,
  Facebook: Globe,
  Globe: Globe,
  Github: Link2,
};

interface FooterProps {
  data: PortfolioData;
}

export default function Footer({ data }: FooterProps) {
  const { meta, contact, socialLinks } = data;
  const year = new Date().getFullYear();

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Gallery", href: "#gallery" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer
      style={{
        background: "var(--text-primary)",
        color: "var(--surface-2)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                style={{ background: "var(--accent)" }}
              >
                {meta.name.charAt(0)}
              </div>
              <span className="font-bold text-lg text-white">{meta.name}</span>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "#94a3b8" }}>
              {meta.description}
            </p>
            {socialLinks && Array.isArray(socialLinks) && socialLinks.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {socialLinks.map((link, i) => {
                  const Icon = socialIconMap[link.icon] || Globe;
                  return (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                      style={{ background: "#1e293b", color: "#94a3b8" }}
                      title={link.platform}
                    >
                      <Icon size={15} />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm text-white mb-4 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {Array.isArray(navItems) && navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: "#94a3b8" }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-sm text-white mb-4 uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3">
              {contact?.phone && (
                <li>
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-center gap-2 text-sm transition-colors hover:text-white"
                    style={{ color: "#94a3b8" }}
                  >
                    <Phone size={13} style={{ color: "var(--accent)" }} />
                    {contact.phone}
                  </a>
                </li>
              )}
              {contact?.email && (
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-2 text-sm transition-colors hover:text-white"
                    style={{ color: "#94a3b8" }}
                  >
                    <Mail size={13} style={{ color: "var(--accent)" }} />
                    {contact.email}
                  </a>
                </li>
              )}
              {contact?.address && (
                <li className="flex items-start gap-2 text-sm" style={{ color: "#94a3b8" }}>
                  <MapPin
                    size={13}
                    style={{ color: "var(--accent)", marginTop: "3px", flexShrink: 0 }}
                  />
                  {contact.address}
                </li>
              )}
            </ul>
          </div>

          {/* Profession badge */}
          <div>
            <h4 className="font-bold text-sm text-white mb-4 uppercase tracking-wider">
              About
            </h4>
            <div
              className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4"
              style={{ background: "var(--accent-light)", color: "var(--accent)" }}
            >
              {meta.profession}
            </div>
            <p className="text-sm" style={{ color: "#94a3b8" }}>
              {meta.tagline}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: "#1e293b" }}
        >
          <p className="text-xs" style={{ color: "#64748b" }}>
            © {year} {meta.name}. All rights reserved.
          </p>
          {/* <p className="text-xs flex items-center gap-1" style={{ color: "#64748b" }}>
            Made with <Heart size={11} className="text-red-400" /> using Next.js &amp; Tailwind CSS
          </p> */}
        </div>
      </div>
    </footer>
  );
}
