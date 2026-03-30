"use client";

import { SafeImage } from "@/app/utils/SafeImage";

const callouts = [
  {
    name: "AI Portfolio Builder",
    description: "Generate your portfolio instantly with AI",
    imageSrc:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    imageAlt: "Developer working on laptop with code editor",
    href: "#",
  },
  {
    name: "Multiple Templates",
    description: "Choose from modern and minimal portfolio designs",
    imageSrc:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    imageAlt: "UI design templates on screen",
    href: "#",
  },
  {
    name: "One Click Deploy",
    description: "Publish your portfolio and go live in seconds",
    imageSrc:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    imageAlt: "Laptop showing deployed website",
    href: "#",
  },
];

export default function PortfoiloCard() {
  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">

          <h2 className="text-2xl font-bold text-gray-900">
            Powerful Features
          </h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:space-y-0 lg:gap-x-6">
            {callouts.map((callout) => (
              <div key={callout.name} className="group relative">
                <SafeImage
                  width={500}
                  height={500}
                  alt={callout.imageAlt}
                  src={callout.imageSrc}
                  className="w-full rounded-lg bg-white object-cover group-hover:opacity-75 max-sm:h-80 sm:aspect-2/1 lg:aspect-square"
                />
                <h3 className="mt-6 text-sm text-gray-500">
                  <a href={callout.href}>
                    <span className="absolute inset-0" />
                    {callout.name}
                  </a>
                </h3>
                <p className="text-base font-semibold">
                  {callout.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}