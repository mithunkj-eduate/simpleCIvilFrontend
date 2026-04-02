
import React, { FC } from 'react';
import type { Project } from '../types/portfolio';
import { Reveal, SectionTag } from './UI';

interface ProjectsProps {
  projects: Project[];
}

const Projects: FC<ProjectsProps> = ({ projects }) => (
  <section className="sec" id="projects">
    <div className="sec-inner">
      <Reveal>
        <SectionTag label="Featured Work" />
        <h2 className="sec-h">
          Projects that <em>define</em> skylines
        </h2>
      </Reveal>
      <Reveal delay="d1">
        <p className="sec-p">
          A curated selection of landmark works spanning residential, commercial, and urban
          design domains.
        </p>
      </Reveal>
      <Reveal delay="d2">
        <div className="proj-list">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className={`proj-row${i % 2 === 1 ? ' even' : ''}`}
              onClick={() => window.open(project.link, '_blank')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && window.open(project.link, '_blank')}
            >
              <div className="proj-img-col">
                {project.images[0] && (
                  <img
                    src={project.images[0].url}
                    alt={project.images[0].alt}
                    loading="lazy"
                  />
                )}
                <span className="proj-cat-tag">{project.category}</span>
              </div>
              <div className="proj-body">
                <div className="proj-year">{project.year}</div>
                <div className="proj-title">{project.title}</div>
                <p className="proj-desc">{project.description}</p>
                <div className="proj-tags">
                  {project.tags.map((tag, j) => (
                    <span key={j} className="proj-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="proj-link">
                  View Case Study <span className="proj-arrow">→</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

export default Projects;