export type ProfessionTheme = {
  layout: string;
  heroVariant: "centered" | "split" | "minimal" | "bold";
  cardStyle: string;
  fontDisplay: string;
  fontBody: string;
  bgPattern: string;
  sectionOrder: string[];
};

export function getProfessionTheme(profession: string, accentColor: string): ProfessionTheme {
  const p = profession.toLowerCase();

  const base: string[] = [
    "hero",
    "services",
    "projects",
    "about",
    "gallery",
    "testimonials",
    "faq",
    "contact",
  ];

  if (p.includes("doctor") || p.includes("medical") || p.includes("physician") || p.includes("dentist") || p.includes("nurse")) {
    return {
      layout: "medical",
      heroVariant: "split",
      cardStyle: "rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg",
      fontDisplay: "font-serif",
      fontBody: "font-sans",
      bgPattern: "bg-gradient-to-br from-sky-50 via-white to-cyan-50",
      sectionOrder: ["hero", "services", "about", "certifications", "testimonials", "gallery", "faq", "contact"],
    };
  }

  if (p.includes("developer") || p.includes("engineer") || p.includes("programmer") || p.includes("coder") || p.includes("software")) {
    return {
      layout: "tech",
      heroVariant: "bold",
      cardStyle: "rounded-xl border border-zinc-800 bg-zinc-900 hover:border-accent",
      fontDisplay: "font-mono",
      fontBody: "font-sans",
      bgPattern: "bg-zinc-950",
      sectionOrder: ["hero", "skills", "projects", "services", "certifications", "about", "testimonials", "faq", "contact"],
    };
  }

  if (p.includes("farmer") || p.includes("agriculture") || p.includes("grower")) {
    return {
      layout: "earthy",
      heroVariant: "centered",
      cardStyle: "rounded-2xl border border-amber-200 bg-amber-50 hover:shadow-md",
      fontDisplay: "font-serif",
      fontBody: "font-sans",
      bgPattern: "bg-gradient-to-b from-green-50 via-amber-50 to-white",
      sectionOrder: ["hero", "services", "gallery", "about", "testimonials", "faq", "contact"],
    };
  }

  if (p.includes("freelancer") || p.includes("designer") || p.includes("creative") || p.includes("artist")) {
    return {
      layout: "portfolio",
      heroVariant: "centered",
      cardStyle: "rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform",
      fontDisplay: "font-sans tracking-tight",
      fontBody: "font-sans",
      bgPattern: "bg-white",
      sectionOrder: ["hero", "projects", "skills", "services", "gallery", "testimonials", "about", "contact"],
    };
  }

  if (p.includes("rental") || p.includes("real estate") || p.includes("property") || p.includes("landlord") || p.includes("home")) {
    return {
      layout: "property",
      heroVariant: "bold",
      cardStyle: "rounded-xl overflow-hidden shadow-md hover:shadow-xl",
      fontDisplay: "font-serif",
      fontBody: "font-sans",
      bgPattern: "bg-slate-50",
      sectionOrder: ["hero", "services", "projects", "gallery", "about", "businessInfo", "testimonials", "faq", "contact"],
    };
  }

  if (p.includes("teacher") || p.includes("tutor") || p.includes("educator") || p.includes("professor")) {
    return {
      layout: "education",
      heroVariant: "split",
      cardStyle: "rounded-2xl border-l-4 border-accent bg-white shadow-sm hover:shadow-md",
      fontDisplay: "font-serif",
      fontBody: "font-sans",
      bgPattern: "bg-gradient-to-b from-indigo-50 to-white",
      sectionOrder: ["hero", "services", "skills", "certifications", "projects", "testimonials", "about", "faq", "contact"],
    };
  }

  if (p.includes("merchant") || p.includes("business") || p.includes("shop") || p.includes("store") || p.includes("retailer")) {
    return {
      layout: "business",
      heroVariant: "centered",
      cardStyle: "rounded-xl shadow hover:shadow-lg border border-gray-100",
      fontDisplay: "font-sans font-bold",
      fontBody: "font-sans",
      bgPattern: "bg-gray-50",
      sectionOrder: ["hero", "services", "gallery", "testimonials", "about", "businessInfo", "faq", "contact"],
    };
  }

  // Default / generic
  return {
    layout: "default",
    heroVariant: "split",
    cardStyle: "rounded-xl shadow-md hover:shadow-lg",
    fontDisplay: "font-sans",
    fontBody: "font-sans",
    bgPattern: "bg-white",
    sectionOrder: base,
  };
}

export function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "14 165 233";
  return `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}`;
}
