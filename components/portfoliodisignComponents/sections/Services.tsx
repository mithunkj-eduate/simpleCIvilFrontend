import Image from "next/image";
import { Service } from "@/types/portfolio";

interface ServicesProps {
  services: Service[];
}

export default function ServicesSection({ services }: ServicesProps) {
  if (!services || services.length === 0) return null;

  return (
    <section id="services" className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-accent text-sm font-semibold uppercase tracking-widest">What I Offer</span>
          <h2 className="font-serif text-4xl font-bold text-gray-900 mt-2">Services</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Tailored solutions designed to meet your specific needs with excellence.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <article
              key={service.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              {/* Image */}
              {service.image && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {service.badge && (
                    <span
                      className="absolute top-3 left-3 text-xs font-bold text-white px-3 py-1 rounded-full"
                      style={{ backgroundColor: "var(--accent)" }}
                    >
                      {service.badge}
                    </span>
                  )}
                </div>
              )}

              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">{service.description}</p>

                {/* Features */}
                {service.features && service.features.length > 0 && (
                  <ul className="space-y-1.5 mb-5">
                    {service.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Price + Duration */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    {service.price && (
                      <p className="text-accent font-bold font-serif text-lg">{service.price}</p>
                    )}
                    {service.duration && (
                      <p className="text-xs text-gray-400">{service.duration}</p>
                    )}
                  </div>
                  <a
                    href="#contact"
                    className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-80"
                    style={{ backgroundColor: "var(--accent)" }}
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
