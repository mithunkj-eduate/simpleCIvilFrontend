import portfolioData from "@/components/portfoliodisignComponents/data/portfolio";
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


export default function Page() {
  const data = portfolioData;
  const theme = getProfessionTheme(data.meta.profession, data.meta.accentColor);

  const sectionMap: Record<string, React.ReactNode> = {
    about: <AboutSection key="about" about={data.about} />,
    services: <ServicesSection key="services" services={data.services} />,
    projects: <ProjectsSection key="projects" projects={data.projects} />,
    skills: <SkillsSection key="skills" skills={data.skills} />,
    certifications: <CertificationsSection key="certifications" certifications={data.certifications} />,
    gallery: <GallerySection key="gallery" gallery={data.gallery} />,
    testimonials: <TestimonialsSection key="testimonials" testimonials={data.testimonials} />,
    faq: <FAQSection key="faq" faq={data.faq} />,
    contact: <ContactSection key="contact" contact={data.contact} meta={data.meta} />,
    businessInfo: <BusinessInfoSection key="businessInfo" businessInfo={data.businessInfo} />,
  };

  const orderedSections = theme.sectionOrder
    .filter((s) => s !== "hero")
    .map((s) => sectionMap[s])
    .filter(Boolean);

  return (
    <>
      <Navbar data={data} sectionOrder={theme.sectionOrder} />
      <main>
        <HeroSection hero={data.hero} meta={data.meta} />
        {orderedSections}
      </main>
      <Footer data={data} />
    </>
  );
}
