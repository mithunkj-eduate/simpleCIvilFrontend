"use client";

import { useState } from "react";
import Image from "next/image";
import { GalleryItem } from "@/types/portfolio";

interface GalleryProps {
  gallery: GalleryItem[];
}

export default function GallerySection({ gallery }: GalleryProps) {
  if (!gallery || gallery.length === 0) return null;

  const categories = ["All", ...Array.from(new Set(gallery.map((g) => g.category).filter(Boolean)))];
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const filtered = active === "All" ? gallery : gallery.filter((g) => g.category === active);

  return (
    <section id="gallery" className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-accent text-sm font-semibold uppercase tracking-widest">Visual</span>
          <h2 className="font-serif text-4xl font-bold text-gray-900 mt-2">Gallery</h2>
        </div>

        {/* Filter tabs */}
        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  active === cat
                    ? "text-white shadow-md"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-accent hover:text-accent"
                }`}
                style={active === cat ? { backgroundColor: "var(--accent)" } : {}}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
          {filtered.map((item, i) => (
            <div
              key={i}
              className="relative break-inside-avoid rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => setLightbox(item)}
            >
              <Image
                src={item.url}
                alt={item.alt || `Gallery image ${i + 1}`}
                width={400}
                height={300}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {lightbox && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
              onClick={() => setLightbox(null)}
              aria-label="Close"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative max-w-4xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
              <Image
                src={lightbox.url}
                alt={lightbox.alt || "Gallery image"}
                width={1200}
                height={800}
                className="rounded-xl object-contain max-h-[85vh] w-full"
              />
              {lightbox.alt && (
                <p className="text-white/70 text-center text-sm mt-3">{lightbox.alt}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
