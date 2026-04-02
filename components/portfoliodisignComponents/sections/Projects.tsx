import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types/portfolio";

interface ProjectsProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsProps) {
  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-accent text-sm font-semibold uppercase tracking-widest">Portfolio</span>
          <h2 className="font-serif text-4xl font-bold text-gray-900 mt-2">Featured Projects</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            A selection of work that demonstrates expertise and impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className={`group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 ${
                index === 0 && projects.length % 2 !== 0 && projects.length > 2
                  ? "md:col-span-2"
                  : ""
              }`}
            >
              {/* Image */}
              {project.images && project.images.length > 0 ? (
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <Image
                    src={project.images[0].url}
                    alt={project.images[0].alt || project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}

              {/* Content */}
              <div className="p-6 bg-white">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span
                      className="text-xs font-semibold px-2.5 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: "var(--accent)" }}
                    >
                      {project.category}
                    </span>
                    <span className="ml-2 text-xs text-gray-400">{project.year}</span>
                  </div>
                  {project.link && (
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:opacity-70 transition-opacity"
                      aria-label={`View ${project.title}`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>
                  )}
                </div>

                <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{project.description}</p>

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
