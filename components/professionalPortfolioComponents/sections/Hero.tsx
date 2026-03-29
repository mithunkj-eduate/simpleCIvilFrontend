"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { HeroSection, HeroStat, CTAButton } from "@/lib/types";
import {
  Calendar,
  MessageCircle,
  Phone,
  Mail,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { SafeImage } from "@/app/utils/SafeImage";
import { convertDriveToImageUrl } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Calendar,
  MessageCircle,
  Phone,
  Mail,
  ArrowRight,
};

interface HeroProps {
  hero: HeroSection;
  name: string;
  tagline: string;
  profession: string;
}

function CTAButtonComponent({ btn }: { btn: CTAButton }) {
  const Icon = btn.icon ? iconMap[btn.icon] : null;
  const cls =
    btn.variant === "primary"
      ? "btn-primary"
      : btn.variant === "secondary"
        ? "btn-secondary"
        : "btn-secondary";

  return (
    <a
      href={btn.href}
      className={cls}
      target={btn.href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
    >
      {Icon && <Icon size={16} />}
      {btn.label}
    </a>
  );
}

function StatCard({ stat }: { stat: HeroStat }) {
  return (
    <div className="text-center">
      <div
        className="text-2xl sm:text-3xl font-extrabold"
        style={{ color: "var(--accent)" }}
      >
        {stat.value}
      </div>
      <div
        className="text-xs sm:text-sm mt-0.5"
        style={{ color: "var(--text-secondary)" }}
      >
        {stat.label}
      </div>
    </div>
  );
}

export default function Hero({ hero, name, tagline, profession }: HeroProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  const slides = hero.carousel?.length ? hero.carousel : [hero.image];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "var(--surface-2)" }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(var(--accent) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 40%, var(--accent-light) 0%, transparent 60%)",
          opacity: 0.5,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="fade-in-up">
            <div className="section-label">{profession}</div>
            <h1
              className="section-title mb-6"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              {hero.heading.split(" ").slice(0, -2).join(" ")}{" "}
              <span className="gradient-text">
                {hero.heading.split(" ").slice(-2).join(" ")}
              </span>
            </h1>
            <p
              className="text-lg leading-relaxed mb-8 max-w-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              {hero.subheading}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 mb-10">
              {hero.cta.map((btn, i) => (
                <CTAButtonComponent key={i} btn={btn} />
              ))}
            </div>

            {/* Stats */}
            {hero.stats && hero.stats.length > 0 && (
              <div
                className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t"
                style={{ borderColor: "var(--border)" }}
              >
                {hero.stats.map((stat, i) => (
                  <StatCard key={i} stat={stat} />
                ))}
              </div>
            )}
          </div>

          {/* Right: Carousel */}
          <div className="relative">
            <div
              className="absolute -inset-4 rounded-3xl opacity-30"
              style={{ background: "var(--accent)", filter: "blur(60px)" }}
            />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="embla" ref={emblaRef}>
                <div className="embla__container">
                  {slides.map((src, i) => (
                    <div key={i} className="embla__slide">
                      <div
                        className="relative"
                        style={{ paddingBottom: "66%" }}
                      >
                        <SafeImage
                          src={src}
                          alt={`${name} slide ${i + 1}`}
                          className="absolute inset-0 w-full h-full object-cover"
                          height={100}
                          width={100}
                          // loading={i === 0 ? "eager" : "lazy"}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {slides.length > 1 && (
                <>
                  <button
                    onClick={scrollPrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur flex items-center justify-center shadow-md hover:bg-white transition-all"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={scrollNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur flex items-center justify-center shadow-md hover:bg-white transition-all"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>

            {/* Profile info card */}
            <div
              className="card absolute -bottom-6 -left-6 p-4 max-w-[200px] hidden sm:block"
              style={{ zIndex: 10 }}
            >
             

              {hero.image && convertDriveToImageUrl(hero.image) ? (
                <SafeImage
                  height={200}
                  width={200}
                  src={convertDriveToImageUrl(hero.image) ?? ""}
                  alt={hero.image}
                  className="w-12 h-12 rounded-full object-cover mb-2"
                />
              // eslint-disable-next-line @next/next/no-img-element
              ) :  <img
                src={hero.image}
                alt={name}
                className="w-12 h-12 rounded-full object-cover mb-2"
              />}
              <div
                className="font-bold text-sm"
                style={{ color: "var(--text-primary)" }}
              >
                {name}
              </div>
              <div
                className="text-xs"
                style={{ color: "var(--text-secondary)" }}
              >
                {tagline}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
