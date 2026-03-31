import {
  ContactSection as ContactSectionType,
  SocialLink,
  WorkingHours,
} from "@/lib/types";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Globe,
  Link2,
  ExternalLink,
} from "lucide-react";
import { getWhatsAppLink } from "@/lib/utils";

const socialIconMap: Record<string, React.ElementType> = {
  Linkedin: Link2,
  Twitter: ExternalLink,
  Instagram: Globe,
  Youtube: Globe,
  Facebook: Globe,
  Globe: Globe,
  Github: Link2,
};

interface ContactProps {
  contact: ContactSectionType;
  socialLinks?: SocialLink[];
  name: string;
}

function WorkingHoursTable({ hours }: { hours: WorkingHours[] }) {
  return (
    <div className="space-y-2">
      {Array.isArray(hours) &&
        hours?.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-2 border-b last:border-0"
            style={{ borderColor: "var(--border)" }}
          >
            <span
              className="text-sm font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              {item.day}
            </span>
            <span
              className={`text-sm font-semibold ${item.closed ? "text-red-400" : ""}`}
              style={!item.closed ? { color: "var(--text-primary)" } : {}}
            >
              {item.hours}
            </span>
          </div>
        ))}
    </div>
  );
}

export default function Contact({ contact, socialLinks, name }: ContactProps) {
  const mapSrc = contact.map
    ? `https://maps.google.com/maps?q=${contact.map.lat},${contact.map.lng}&z=${contact.map.zoom ?? 15}&output=embed`
    : null;

  return (
    <section
      id="contact"
      className="section"
      style={{ background: "var(--surface)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="section-label">Get in Touch</div>
          <h2 className="section-title">
            Contact <span className="gradient-text">Us</span>
          </h2>
          <p
            className="mt-4 text-base max-w-xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            We&apos;re here to help. Reach out through any of the channels below
            and we&apos;ll get back to you promptly.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Contact info cards */}
          <div className="space-y-4">
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="card p-5 flex items-center gap-4 hover:border-[var(--accent)] group transition-all"
                style={{ display: "flex" }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                  style={{
                    background: "var(--accent-light)",
                    color: "var(--accent)",
                  }}
                >
                  <Mail size={20} />
                </div>
                <div>
                  <div
                    className="text-xs font-medium mb-0.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Email Us
                  </div>
                  <div
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {contact.email}
                  </div>
                </div>
              </a>
            )}

            {contact.phone && (
              <a
                href={`tel:${contact.phone}`}
                className="card p-5 flex items-center gap-4 hover:border-[var(--accent)] group transition-all"
                style={{ display: "flex" }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                  style={{
                    background: "var(--accent-light)",
                    color: "var(--accent)",
                  }}
                >
                  <Phone size={20} />
                </div>
                <div>
                  <div
                    className="text-xs font-medium mb-0.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Call Us
                  </div>
                  <div
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {contact.phone}
                  </div>
                </div>
              </a>
            )}

            {contact.whatsapp && (
              <a
                href={getWhatsAppLink(
                  contact.whatsapp,
                  `Hello ${name}, I'd like to get in touch.`,
                )}
                target="_blank"
                rel="noreferrer"
                className="card p-5 flex items-center gap-4 hover:border-emerald-400 group transition-all"
                style={{ display: "flex" }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform bg-emerald-50 text-emerald-500">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <div
                    className="text-xs font-medium mb-0.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    WhatsApp
                  </div>
                  <div
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Chat with us
                  </div>
                </div>
              </a>
            )}

            {contact.address && (
              <div className="card p-5 flex items-start gap-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "var(--accent-light)",
                    color: "var(--accent)",
                  }}
                >
                  <MapPin size={20} />
                </div>
                <div>
                  <div
                    className="text-xs font-medium mb-0.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Address
                  </div>
                  <div
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {contact.address}
                  </div>
                </div>
              </div>
            )}

            {/* Social Links */}
            {socialLinks &&Array.isArray(socialLinks) && socialLinks.length > 0 && (
              <div className="card p-5">
                <div
                  className="text-xs font-medium mb-3"
                  style={{ color: "var(--text-muted)" }}
                >
                  Follow Us
                </div>
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map((link, i) => {
                    const Icon = socialIconMap[link.icon] || Globe;
                    return (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                        style={{
                          background: "var(--surface-2)",
                          color: "var(--text-secondary)",
                        }}
                        title={link.platform}
                      >
                        <Icon size={16} />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Working Hours */}
          {contact.workingHours && contact.workingHours.length > 0 && (
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: "var(--accent-light)",
                    color: "var(--accent)",
                  }}
                >
                  <Clock size={18} />
                </div>
                <h3
                  className="font-bold text-base"
                  style={{ color: "var(--text-primary)" }}
                >
                  Working Hours
                </h3>
              </div>
              <WorkingHoursTable hours={contact.workingHours} />

              <div
                className="mt-5 p-3 rounded-xl text-center text-sm font-medium"
                style={{
                  background: "var(--accent-light)",
                  color: "var(--accent)",
                }}
              >
                📞 Available for emergencies 24/7
              </div>
            </div>
          )}

          {/* Map */}
          <div className="card overflow-hidden">
            {mapSrc ? (
              <iframe
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "300px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              />
            ) : (
              <div className="map-placeholder h-full min-h-[300px]">
                <MapPin size={32} style={{ color: "var(--accent)" }} />
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {contact.address || "Location"}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
