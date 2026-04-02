"use client";
import React, { FC } from "react";
import type { PortfolioData } from "./types/portfolio";

// Data
import portfolioData from "./data/portfolioData";
import "./index.css";

// Components
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import { Divider } from "./components/UI";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import Certifications from "./components/Certifications";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

interface Props {
  data: PortfolioData;
}

const PortfolioComponentsApp = ({ data }: Props) => {
  const d: PortfolioData = data ?? portfolioData;

  return (
    <>
      {d.meta && <Nav meta={d.meta} />}

      <main>
        {d.hero && d.meta && <Hero hero={d.hero} meta={d.meta} />}

        <Divider />

        {d.about && <About about={d.about} />}

        <Divider />
        {d.services && <Services services={d.services} />}

        <Divider />
        {d.projects && <Projects projects={d.projects} />}

        <Divider />
        {d.skills && <Skills skills={d.skills} />}

        <Divider />
        {d.gallery && <Gallery gallery={d.gallery} />}

        <Divider />
        {d.testimonials && <Testimonials testimonials={d.testimonials} />}

        <Divider />
        {d.certifications && (
          <Certifications certifications={d.certifications} />
        )}

        <Divider />
        {d.faq && <FAQ faq={d.faq} />}

        <Divider />
        {d.contact && d.businessInfo && d.socialLinks && (
          <Contact
            contact={d.contact}
            businessInfo={d.businessInfo}
            socialLinks={d.socialLinks}
          />
        )}
      </main>

      {d.meta && <Footer meta={d.meta} />}
    </>
  );
};

export default PortfolioComponentsApp;
