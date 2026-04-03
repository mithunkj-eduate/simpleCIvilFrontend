// ─── Component: Navbar ──────────────────────────────────────────────────────
"use client";
import { PrimaryButton } from "@/app/page";
import { AppContext } from "@/context/context";
import Image from "next/image";
import { useContext } from "react";
import icon from "@/assets/icon.png";
import { useRouter } from "next/navigation";

export function NavbarProtfolio() {
  const { state } = useContext(AppContext);
  const nav = useRouter();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/60 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="flex items-center gap-2">
        {/* <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
<svg
className="w-4 h-4 text-white"
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
</div> */}
        <Image
          alt=""
          src={icon ? icon : ""} // Adjust the path to your logo
          className="h-5 w-auto"
          width={200} // Adjust width as needed
          height={200} // Adjust height as needed
        />
        <span className="text-white font-bold text-sm tracking-tight">
          ShareUrInterest
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-white/50 text-sm">
        <a
          href="#how-it-works"
          className="hover:text-white transition-colors duration-200"
        >
          How It Works
        </a>
        <a
          href="#features"
          className="hover:text-white transition-colors duration-200"
        >
          Features
        </a>
        <a
          href="#examples"
          className="hover:text-white transition-colors duration-200"
        >
          Examples
        </a>

        {state.user?.id && (
          <a
            href={`/portfolio/generatewithai?v=${state.version}`}
            className="hover:text-white transition-colors duration-200"
          >
            Portfolio
          </a>
        )}

        {state.user?.id && (
          <a
            href={`/profile?v=${state.version}`}
            className="hover:text-white transition-colors duration-200"
          >
            Profile
          </a>
        )}
      </div>

      <PrimaryButton
        className="text-xs px-5 py-2.5"
        onClick={() =>
          nav.push(
            state.user?.id
              ? `/portfolio/generatewithai?v=${state.version}`
              : `/signup?v=${state.version}`,
          )
        }
      >
        Get Started Free
      </PrimaryButton>
    </nav>
  );
}
