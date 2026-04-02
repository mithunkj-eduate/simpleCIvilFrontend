"use client";
import { GhostButton, PrimaryButton } from "@/app/page";
import { BASE_URL_FRONTEND } from "@/components/helpers/apiheader";
import { AppContext } from "@/context/context";
import { UrlID } from "@/utils/commenTypes";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export const HeroSectionButtons = () => {
  const { state } = useContext(AppContext);
  const nav = useRouter();

  return (
    <>
      {/* CTA Buttons */}
      <div className="relative flex flex-col sm:flex-row gap-4 items-center">
        <PrimaryButton
          className="text-base px-8 py-4"
          onClick={() =>
            state.user
              ? nav.push("/portfolio")
              : nav.push(`/signup?v=${state.version}`)
          }
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          Build My Website
        </PrimaryButton>
        <GhostButton
          className="text-base px-8 py-4"
          onClick={() =>
            nav.push(`${BASE_URL_FRONTEND}/professionalportfolio/${UrlID.DEMO}`)
          }
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          View Demo
        </GhostButton>
      </div>

      {/* Social proof */}
      <div className="relative mt-14 flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-white/40 text-sm">
        <div className="flex -space-x-2">
          {[
            "bg-violet-500",
            "bg-fuchsia-500",
            "bg-cyan-500",
            "bg-pink-500",
            "bg-indigo-500",
          ].map((c, i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full border-2 border-black ${c} flex items-center justify-center text-[10px] font-bold text-white`}
            >
              {["A", "B", "C", "D", "E"][i]}
            </div>
          ))}
        </div>
        <span>
          <span className="text-white font-semibold">12,000+</span> portfolios
          published this month
        </span>
        <span className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />
        <span>
          ⭐ <span className="text-white font-semibold">4.9/5</span> from 3,400+
          reviews
        </span>
      </div>
    </>
  );
};

export const CTASectionButton = () => {
    const { state } = useContext(AppContext);
  const nav = useRouter();
  return (
    <PrimaryButton className="text-base px-10 py-4 text-base" onClick={() => nav.push(`/portfolio?v=${state.version}`)}>
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
      Create My Website
    </PrimaryButton>
  );
};
