"use client";

import { useState } from "react";
import { FAQ } from "@/lib/types";
import { ChevronDown } from "lucide-react";

interface FAQProps {
  faqs: FAQ[];
}

function FAQItem({ faq, isOpen, onToggle }: { faq: FAQ; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      className="border rounded-xl overflow-hidden transition-all duration-200"
      style={{
        borderColor: isOpen ? "var(--accent)" : "var(--border)",
        background: "var(--surface)",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
      >
        <span
          className="font-semibold text-sm sm:text-base"
          style={{ color: "var(--text-primary)" }}
        >
          {faq.question}
        </span>
        <ChevronDown
          size={18}
          className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          style={{ color: "var(--accent)" }}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? "500px" : "0" }}
      >
        <div
          className="px-5 pb-5 text-sm leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {faq.answer}
        </div>
      </div>
    </div>
  );
}

export default function FAQSection({ faqs }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs.length) return null;

  return (
    <section
      id="faq"
      className="section"
      style={{ background: "var(--surface-2)" }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="section-label">FAQ</div>
          <h2 className="section-title">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
        </div>
        <div className="space-y-3">
          {Array.isArray(faqs) && faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
