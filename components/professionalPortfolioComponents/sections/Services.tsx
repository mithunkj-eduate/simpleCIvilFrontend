import { Service } from "@/lib/types";
import { CheckCircle, Clock, Tag } from "lucide-react";
import { convertDriveToImageUrl, formatPrice } from "@/lib/utils";
import { SafeImage } from "@/app/utils/SafeImage";

interface ServicesProps {
  services: Service[];
  profession: string;
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="card overflow-hidden flex flex-col h-full">
      {service.image && (
        <div className="relative" style={{ paddingBottom: "55%" }}>
          {service.image && convertDriveToImageUrl(service.image) ? (
            <SafeImage
              height={200}
              width={200}
              src={convertDriveToImageUrl(service.image) ?? ""}
              alt={service.title}
              className="w-12 h-12 rounded-full object-cover mb-2"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={service.image}
              alt={service.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          )}
          {service.badge && (
            <div className="absolute top-3 left-3 badge">{service.badge}</div>
          )}
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        <h3
          className="font-bold text-lg mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          {service.title}
        </h3>
        <p
          className="text-sm leading-relaxed mb-4 flex-1"
          style={{ color: "var(--text-secondary)" }}
        >
          {service.description}
        </p>

        {/* Meta info */}
        <div className="flex flex-wrap gap-3 mb-4">
          {service.price && (
            <div className="flex items-center gap-1.5">
              <Tag size={13} style={{ color: "var(--accent)" }} />
              <span
                className="text-sm font-bold"
                style={{ color: "var(--accent)" }}
              >
                {service.price}
                {service.priceUnit && (
                  <span
                    className="font-normal text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    /{service.priceUnit}
                  </span>
                )}
              </span>
            </div>
          )}
          {service.duration && (
            <div className="flex items-center gap-1.5">
              <Clock size={13} style={{ color: "var(--text-muted)" }} />
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                {service.duration}
              </span>
            </div>
          )}
        </div>

        {/* Features */}
        {service.features && service.features.length > 0 && (
          <ul
            className="space-y-1.5 pt-4 border-t"
            style={{ borderColor: "var(--border)" }}
          >
            {service.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2">
                <CheckCircle
                  size={13}
                  style={{ color: "var(--accent)", flexShrink: 0 }}
                />
                <span
                  className="text-xs"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function Services({ services, profession }: ServicesProps) {
  if (!services.length) return null;

  return (
    <section
      id="services"
      className="section"
      style={{ background: "var(--surface-2)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="section-label">What We Offer</div>
          <h2 className="section-title">
            Our{" "}
            <span className="gradient-text">
              {profession === "doctor" || profession === "medical"
                ? "Medical Services"
                : profession === "lawyer"
                  ? "Legal Services"
                  : "Services"}
            </span>
          </h2>
          <p
            className="mt-4 max-w-2xl mx-auto text-base"
            style={{ color: "var(--text-secondary)" }}
          >
            Tailored solutions designed to meet your unique needs with precision
            and care.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
