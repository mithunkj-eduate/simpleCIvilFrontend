"use client";

import { useState } from "react";
import { FAQ } from "@/types/portfolio";

interface FAQProps {
  faq: FAQ[];
}

export default function FAQSection({ faq }: FAQProps) {
  if (!faq || faq.length === 0) return null;

  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-6 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-accent text-sm font-semibold uppercase tracking-widest">Got Questions?</span>
          <h2 className="font-serif text-4xl font-bold text-gray-900 mt-2">Frequently Asked</h2>
        </div>

        <div className="space-y-3">
          {faq.map((item, i) => (
            <div
              key={i}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                open === i
                  ? "border-accent/30 bg-white shadow-md"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="font-semibold text-gray-900 text-sm sm:text-base">{item.question}</span>
                <span
                  className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white transition-transform duration-300 ${
                    open === i ? "rotate-45" : ""
                  }`}
                  style={{ backgroundColor: open === i ? "var(--accent)" : "#e5e7eb" }}
                >
                  <svg
                    className={`w-4 h-4 ${open === i ? "text-white" : "text-gray-500"}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  open === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="px-6 pb-6 text-gray-500 leading-relaxed text-sm">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
