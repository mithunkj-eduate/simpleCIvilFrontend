"use client"
import React, { FC, useState } from 'react';
import type { FAQ as FAQType } from '../types/portfolio';
import { Reveal, SectionTag } from './UI';

interface FAQProps {
  faq: FAQType[];
}

const FAQ: FC<FAQProps> = ({ faq }) => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggle = (i: number): void => {
    setOpenIndex((prev) => (prev === i ? -1 : i));
  };

  return (
    <section className="sec" id="faq">
      <div className="sec-inner">
        <Reveal>
          <SectionTag label="FAQ" />
          <h2 className="sec-h">
            Common <em>Questions</em>
          </h2>
        </Reveal>
        <Reveal delay="d2">
          <div className="faq-wrap">
            {faq.map((item, i) => (
              <div
                key={i}
                className={`faq-item${openIndex === i ? ' faq-open' : ''}`}
              >
                <button
                  className="faq-btn"
                  onClick={() => toggle(i)}
                  aria-expanded={openIndex === i}
                >
                  {item.question}
                  <span className="faq-ico">+</span>
                </button>
                {openIndex === i && (
                  <div className="faq-answer">{item.answer}</div>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default FAQ;