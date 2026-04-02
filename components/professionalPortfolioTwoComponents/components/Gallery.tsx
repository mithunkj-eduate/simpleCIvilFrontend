"use client";

import React, { FC } from "react";
import type { GalleryItem } from "../types/portfolio";
import { Reveal, SectionTag } from "./UI";
import { convertDriveToImageUrl } from "@/lib/utils";
import { SafeImage } from "@/app/utils/SafeImage";

interface GalleryProps {
  gallery: GalleryItem[];
}

const Gallery: FC<GalleryProps> = ({ gallery }) => (
  <section className="sec" id="gallery">
    <div className="sec-inner">
      <Reveal>
        <SectionTag label="Gallery" />
        <h2 className="sec-h">
          Visual <em>Portfolio</em>
        </h2>
      </Reveal>
      <Reveal delay="d2">
        <div className="gallery-grid">
          {gallery.map((item, i) => (
            <div key={i} className="gal-item">
              {item.url && convertDriveToImageUrl(item.url) ? (
                <SafeImage
                  height={200}
                  width={200}
                  src={convertDriveToImageUrl(item.url) ?? item.url}
                  alt={item.alt}
                  className="max-w-full max-h-[85vh] rounded-xl shadow-2xl object-contain"
                
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.url} alt={item.alt} loading="lazy" />
              )}
              <div className="gal-overlay">
                <span className="gal-cat">{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

export default Gallery;
