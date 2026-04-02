"use client"
import React, { FC } from 'react';
import type { PortfolioData } from './types/portfolio';

// Data
import portfolioData from './data/portfolioData';

// Components
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Certifications from './components/Certifications';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Divider } from './components/UI';

const PortfolioComponentsApp: FC = () => {
  const d: PortfolioData = portfolioData;

  return (
    <>
      <Nav meta={d.meta} />

      <main>
        <Hero hero={d.hero} meta={d.meta} />

        <Divider />
        <About about={d.about} />

        <Divider />
        <Services services={d.services} />

        <Divider />
        <Projects projects={d.projects} />

        <Divider />
        <Skills skills={d.skills} />

        <Divider />
        <Gallery gallery={d.gallery} />

        <Divider />
        <Testimonials testimonials={d.testimonials} />

        <Divider />
        <Certifications certifications={d.certifications} />

        <Divider />
        <FAQ faq={d.faq} />

        <Divider />
        <Contact
          contact={d.contact}
          businessInfo={d.businessInfo}
          socialLinks={d.socialLinks}
        />
      </main>

      <Footer meta={d.meta} />
    </>
  );
};

export default PortfolioComponentsApp;