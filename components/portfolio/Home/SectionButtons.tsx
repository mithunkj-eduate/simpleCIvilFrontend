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
              ? nav.push(
                  `/professionalportfolio/generatewithai?v=${state.version}`,
                )
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
    </>
  );
};

export const CTASectionButton = () => {
  const { state } = useContext(AppContext);
  const nav = useRouter();
  return (
    <PrimaryButton
      className="text-base px-10 py-4 text-base"
      onClick={() =>
        state.user
          ? nav.push(`/portfolio/generatewithai?v=${state.version}`)
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
      Create My Website
    </PrimaryButton>
  );
};
