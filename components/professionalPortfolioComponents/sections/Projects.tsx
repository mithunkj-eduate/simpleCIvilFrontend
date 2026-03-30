"use client";

import { useState } from "react";
import { Project } from "@/lib/types";
import {
  ExternalLink,
  Tag,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { convertDriveToImageUrl } from "@/lib/utils";
import { SafeImage } from "@/app/utils/SafeImage";

interface ProjectsProps {
  projects: Project[];
}

function ProjectCard({ project }: { project: Project }) {
  const [imgIdx, setImgIdx] = useState(0);

  return (
    <div className="card overflow-hidden flex flex-col h-full">
      {/* Gallery */}
      {project.images.length > 0 && (
        <div className="relative" style={{ paddingBottom: "56%" }}>
          {project.images[imgIdx].url &&
          convertDriveToImageUrl(project.images[imgIdx].url) ? (
            <SafeImage
              height={200}
              width={200}
              src={convertDriveToImageUrl(project.images[imgIdx].url) ?? ""}
              alt={project.images[imgIdx].alt}
              className="w-12 h-12 rounded-full object-cover mb-2"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.images[imgIdx].url}
              alt={project.images[imgIdx].alt}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          )}
          {project.images.length > 1 && (
            <>
              <button
                onClick={() =>
                  setImgIdx(
                    (p) =>
                      (p - 1 + project.images.length) % project.images.length,
                  )
                }
                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-all"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={() =>
                  setImgIdx((p) => (p + 1) % project.images.length)
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-all"
              >
                <ChevronRight size={14} />
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {project.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      i === imgIdx ? "bg-white scale-125" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
          {project.category && (
            <div className="absolute top-3 left-3 badge">
              {project.category}
            </div>
          )}
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3
            className="font-bold text-base"
            style={{ color: "var(--text-primary)" }}
          >
            {project.title}
          </h3>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--accent-light)] transition-colors"
              style={{ color: "var(--accent)" }}
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>

        {project.year && (
          <div className="flex items-center gap-1.5 mb-2">
            <Calendar size={12} style={{ color: "var(--text-muted)" }} />
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              {project.year}
            </span>
          </div>
        )}

        <p
          className="text-sm leading-relaxed flex-1 mb-4"
          style={{ color: "var(--text-secondary)" }}
        >
          {project.description}
        </p>

        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-full text-xs font-medium"
                style={{
                  background: "var(--surface-2)",
                  color: "var(--text-secondary)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Projects({ projects }: ProjectsProps) {
  if (!projects.length) return null;

  return (
    <section
      id="projects"
      className="section"
      style={{ background: "var(--surface)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="section-label">Case Studies</div>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
