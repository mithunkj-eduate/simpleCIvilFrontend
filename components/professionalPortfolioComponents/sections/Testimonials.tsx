import { Testimonial } from "@/lib/types";
import { Star } from "lucide-react";
import { convertDriveToImageUrl, getInitials } from "@/lib/utils";
import { SafeImage } from "@/app/utils/SafeImage";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          fill={star <= rating ? "#f59e0b" : "none"}
          style={{ color: star <= rating ? "#f59e0b" : "var(--border)" }}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="card p-6 flex flex-col h-full">
      <StarRating rating={testimonial.rating} />
      <div className="testimonial-quote mt-4 flex-1">
        <p
          className="text-sm leading-relaxed italic"
          style={{ color: "var(--text-secondary)" }}
        >
          {testimonial.text}
        </p>
      </div>
      <div
        className="flex items-center gap-3 mt-6 pt-4 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        {testimonial.avatar ? (
          testimonial.avatar && convertDriveToImageUrl(testimonial.avatar) ? (
            <SafeImage
              height={200}
              width={200}
              src={convertDriveToImageUrl(testimonial.avatar) ?? ""}
              alt={testimonial.name}
              className="w-12 h-12 rounded-full object-cover mb-2"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          )
        ) : (
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
            style={{ background: "var(--accent)" }}
          >
            {getInitials(testimonial.name)}
          </div>
        )}
        <div>
          <div
            className="font-semibold text-sm"
            style={{ color: "var(--text-primary)" }}
          >
            {testimonial.name}
          </div>
          {(testimonial.role || testimonial.company) && (
            <div className="text-xs" style={{ color: "var(--text-muted)" }}>
              {[testimonial.role, testimonial.company]
                .filter(Boolean)
                .join(", ")}
            </div>
          )}
        </div>
        {testimonial.date && (
          <div
            className="ml-auto text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            {testimonial.date}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  if (!testimonials.length) return null;

  const avgRating =
    testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length;

  return (
    <section
      id="testimonials"
      className="section"
      style={{ background: "var(--surface)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="section-label">Reviews</div>
          <h2 className="section-title">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <StarRating rating={Math.round(avgRating)} />
            <span
              className="font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              {avgRating.toFixed(1)}
            </span>
            <span className="text-sm" style={{ color: "var(--text-muted)" }}>
              ({testimonials.length} reviews)
            </span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
