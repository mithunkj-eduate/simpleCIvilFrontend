import React, { FC } from 'react';
import type { GalleryItem } from '../types/portfolio';
import { Reveal, SectionTag } from './UI';

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
              <img src={item.url} alt={item.alt} loading="lazy" />
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