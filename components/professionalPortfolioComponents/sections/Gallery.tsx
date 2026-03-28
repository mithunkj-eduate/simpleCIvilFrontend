"use client";

import { useState } from "react";
import { GalleryImage } from "@/lib/types";
import { X, ZoomIn } from "lucide-react";

interface GalleryProps {
  images: GalleryImage[];
}

export default function Gallery({ images }: GalleryProps) {
  const [selected, setSelected] = useState<GalleryImage | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  if (!images.length) return null;

  const categories = [
    "All",
    ...Array.from(new Set(images.map((img) => img.category).filter(Boolean))),
  ] as string[];

  const filtered =
    activeCategory === "All"
      ? images
      : images.filter((img) => img.category === activeCategory);

  return (
    <section
      id="gallery"
      className="section"
      style={{ background: "var(--surface-2)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="section-label">Gallery</div>
          <h2 className="section-title">
            Our <span className="gradient-text">Gallery</span>
          </h2>
        </div>

        {/* Filter tabs */}
        {categories.length > 2 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                style={
                  activeCategory === cat
                    ? {
                        background: "var(--accent)",
                        color: "white",
                      }
                    : {
                        background: "var(--surface)",
                        color: "var(--text-secondary)",
                        border: "1px solid var(--border)",
                      }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        <div className="gallery-grid">
          {filtered.map((img, i) => (
            <div
              key={i}
              className="group relative rounded-xl overflow-hidden cursor-pointer"
              style={{ paddingBottom: "75%", background: "var(--surface-3)" }}
              onClick={() => setSelected(img)}
            >
              <img
                src={img.url}
                alt={img.alt}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <ZoomIn
                  className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100"
                  size={28}
                />
              </div>
              {img.category && (
                <div className="absolute bottom-2 left-2 badge text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                  {img.category}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={() => setSelected(null)}
          >
            <X size={20} />
          </button>
          <img
            src={selected.url}
            alt={selected.alt}
            className="max-w-full max-h-[85vh] rounded-xl shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          {selected.alt && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
              {selected.alt}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
