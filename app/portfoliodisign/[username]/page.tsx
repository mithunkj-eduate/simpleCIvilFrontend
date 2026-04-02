// app/[username]/page.tsx
// Ready for multi-user/SaaS routing
// Replace the static import with a DB/API fetch based on username param

import { notFound } from "next/navigation";
import type { Metadata } from "next";
// import type { PortfolioData } from "@/types/portfolio";
import { getProfessionTheme } from "@/components/portfoliodisignComponents/lib/theme";
import Navbar from "@/components/portfoliodisignComponents/components/Navbar";
import Footer from "@/components/portfoliodisignComponents/components/Footer";
import HeroSection from "@/components/portfoliodisignComponents/sections/Hero";
import AboutSection from "@/components/portfoliodisignComponents/sections/About";
import ServicesSection from "@/components/portfoliodisignComponents/sections/Services";
import ProjectsSection from "@/components/portfoliodisignComponents/sections/Projects";
import SkillsSection from "@/components/portfoliodisignComponents/sections/Skills";
import CertificationsSection from "@/components/portfoliodisignComponents/sections/Certifications";
import GallerySection from "@/components/portfoliodisignComponents/sections/Gallery";
import TestimonialsSection from "@/components/portfoliodisignComponents/sections/Testimonials";
import FAQSection from "@/components/portfoliodisignComponents/sections/FAQ";
import ContactSection from "@/components/portfoliodisignComponents/sections/Contact";
import BusinessInfoSection from "@/components/portfoliodisignComponents/sections/BusinessInfo";
// import { PortfolioData } from "@/components/portfoliodisignComponents/types/portfolio";
import { getPortfolio } from "@/lib/api/portfolio";
import portfolioData from "@/components/portfoliodisignComponents/data/portfolio";
import { UrlID } from "@/utils/commenTypes";

interface PageProps {
  params: { username: string };
}

// // Replace this with your actual data fetching logic (DB, API, CMS, etc.)
// async function getPortfolioBySlug(slug: string): Promise<PortfolioData | null> {
//   try {
//     // Example: fetch from your API
//     // const res = await fetch(`${process.env.API_URL}/portfolios/${slug}`, { next: { revalidate: 3600 } });
//     // if (!res.ok) return null;
//     // return res.json();

//     // For now, fall back to static data if slug matches
//     const staticData = (
//       await import("@/components/portfoliodisignComponentsdata/portfolio")
//     ).default;
//     if (staticData.meta.slug === slug) return staticData;
//     return null;
//   } catch {
//     return null;
//   }
// }

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  // const data = await getPortfolio(params.username);

  // // const data = await getPortfolioBySlug(params.username);
  // if (!data) return notFound();

  const { username } = await params;

  const apiData = await getPortfolio(username);
  const data = apiData ?? portfolioData;

  return {
    title: data.meta.seo.title,
    description: data.meta.seo.description,
    keywords: data.meta.seo.keywords,
    openGraph: {
      title: data.meta.seo.title,
      description: data.meta.seo.description,
      images: data.hero.image ? [{ url: data.hero.image }] : [],
    },
  };
}

export default async function UserPage({ params }: PageProps) {
  // const data = await getPortfolioBySlug(params.username);

  const { username } = await params;
  // const data = portfolioRegistry[slug];

  const data =
    username === UrlID.DEMO
      ? portfolioData
      : await getPortfolio(params.username);

  if (!data) {
    return notFound();
    // For demo, fall back to sample data instead of 404
    // return <PortfolioPageClient data={samplePortfolioData} />;
  }

  const theme = getProfessionTheme(data.meta.profession, data.meta.accentColor);

  const sectionMap: Record<string, React.ReactNode> = {
    about: <AboutSection key="about" about={data.about} />,
    services: <ServicesSection key="services" services={data.services} />,
    projects: <ProjectsSection key="projects" projects={data.projects} />,
    skills: <SkillsSection key="skills" skills={data.skills} />,
    certifications: (
      <CertificationsSection
        key="certifications"
        certifications={data.certifications}
      />
    ),
    gallery: <GallerySection key="gallery" gallery={data.gallery} />,
    testimonials: (
      <TestimonialsSection
        key="testimonials"
        testimonials={data.testimonials}
      />
    ),
    faq: <FAQSection key="faq" faq={data.faq} />,
    contact: (
      <ContactSection key="contact" contact={data.contact} meta={data.meta} />
    ),
    businessInfo: (
      <BusinessInfoSection
        key="businessInfo"
        businessInfo={data.businessInfo}
      />
    ),
  };

  const orderedSections = theme.sectionOrder
    .filter((s) => s !== "hero")
    .map((s) => sectionMap[s])
    .filter(Boolean);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `:root { --accent: ${data.meta.accentColor}; }`,
        }}
      />
      <Navbar data={data} sectionOrder={theme.sectionOrder} />
      <main>
        <HeroSection hero={data.hero} meta={data.meta} />
        {orderedSections}
      </main>
      <Footer data={data} />
    </>
  );
}
