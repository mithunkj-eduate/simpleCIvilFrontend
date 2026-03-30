"use client";

import { PortfolioData } from "@/lib/types";
import Navbar from "@/components/professionalPortfolioComponents/sections/Navbar";
import Hero from "@/components/professionalPortfolioComponents/sections/Hero";
import About from "@/components/professionalPortfolioComponents/sections/About";
import BusinessInfo from "@/components/professionalPortfolioComponents/sections/BusinessInfo";
import Services from "@/components/professionalPortfolioComponents/sections/Services";
import Products from "@/components/professionalPortfolioComponents/sections/Products";
import Projects from "@/components/professionalPortfolioComponents/sections/Projects";
import {
  Skills,
  Certifications,
} from "@/components/professionalPortfolioComponents/sections/SkillsAndCerts";
import Gallery from "@/components/professionalPortfolioComponents/sections/Gallery";
import Testimonials from "@/components/professionalPortfolioComponents/sections/Testimonials";
import FAQSection from "@/components/professionalPortfolioComponents/sections/FAQ";
import Contact from "@/components/professionalPortfolioComponents/sections/Contact";
import Footer from "@/components/professionalPortfolioComponents/sections/Footer";
import WhatsAppFAB from "@/components/professionalPortfolioComponents/ui/WhatsAppFAB";

interface PortfolioPageClientProps {
  data: PortfolioData;
}

export default function PortfolioPageClient({
  data,
}: PortfolioPageClientProps) {
  console.log(data, "data");
  return (
    <div
      className="min-h-screen"
      style={
        {
          "--accent": data.meta.accentColor ?? "#0ea5e9",
          "--accent-dark": shadeColor(data.meta.accentColor ?? "#0ea5e9", -20),
          "--accent-light": lightenColor(data.meta.accentColor ?? "#0ea5e9"),
        } as React.CSSProperties
      }
    >
      {/* Sticky Navbar */}
      <Navbar data={data} />

      {/* Hero */}
      <Hero
        hero={data.hero}
        name={data.meta.name}
        tagline={data.meta.tagline}
        profession={data.meta.profession}
      />

      {/* About */}
      {data.about && <About about={data.about} />}

      {/* Business Info */}
      {data.businessInfo && <BusinessInfo info={data.businessInfo} />}

      {/* Services */}
      {data.services && data.services.length > 0 && (
        <Services services={data.services} profession={data.meta.profession} />
      )}

      {/* Products */}
      {data.products && data.products.length > 0 && (
        <Products products={data.products} />
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <Projects projects={data.projects} />
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && <Skills skills={data.skills} />}

      {/* Certifications */}
      {data.certifications && data.certifications.length > 0 && (
        <Certifications certifications={data.certifications} />
      )}

      {/* Gallery */}
      {data.gallery && data.gallery.length > 0 && (
        <Gallery images={data.gallery} />
      )}

      {/* Testimonials */}
      {data.testimonials && data.testimonials.length > 0 && (
        <Testimonials testimonials={data.testimonials} />
      )}

      {/* FAQ */}
      {data.faq && data.faq.length > 0 && <FAQSection faqs={data.faq} />}

      {/* Contact */}
      {data.contact && (
        <Contact
          contact={data.contact}
          socialLinks={data.socialLinks}
          name={data.meta.name}
        />
      )}

      {/* Footer */}
      <Footer data={data} />

      {/* WhatsApp FAB */}
      {data.contact?.whatsapp && (
        <WhatsAppFAB phone={data.contact.whatsapp} name={data.meta.name} />
      )}
    </div>
  );
}

// Utility: darken/lighten hex color
function shadeColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, Math.max(0, (num >> 16) + amt));
  const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amt));
  const B = Math.min(255, Math.max(0, (num & 0x0000ff) + amt));
  return `#${((1 << 24) | (R << 16) | (G << 8) | B).toString(16).slice(1)}`;
}

function lightenColor(hex: string): string {
  // Returns a very light tint (10% opacity equivalent)
  const num = parseInt(hex.replace("#", ""), 16);
  const R = Math.min(255, ((num >> 16) & 0xff) + 220);
  const G = Math.min(255, ((num >> 8) & 0xff) + 230);
  const B = Math.min(255, (num & 0xff) + 235);
  return `rgb(${R},${G},${B})`;
}
