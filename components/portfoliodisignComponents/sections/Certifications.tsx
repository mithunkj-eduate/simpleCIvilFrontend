import { Certification } from "@/types/portfolio";

interface CertificationsProps {
  certifications: Certification[];
}

export default function CertificationsSection({ certifications }: CertificationsProps) {
  if (!certifications || certifications.length === 0) return null;

  return (
    <section id="certifications" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-accent text-sm font-semibold uppercase tracking-widest">Credentials</span>
          <h2 className="font-serif text-4xl font-bold text-gray-900 mt-2">Certifications</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <div
              key={i}
              className="group relative p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:border-accent hover:bg-white hover:shadow-lg transition-all duration-300"
            >
              {/* Year badge */}
              <span
                className="absolute top-4 right-4 text-xs font-bold px-2 py-0.5 rounded-full text-white"
                style={{ backgroundColor: "var(--accent)" }}
              >
                {cert.year}
              </span>

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white"
                style={{ backgroundColor: "var(--accent)" }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>

              <h3 className="font-serif text-lg font-bold text-gray-900 mb-1 pr-12">{cert.title}</h3>
              <p className="text-sm text-gray-500">{cert.issuer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
