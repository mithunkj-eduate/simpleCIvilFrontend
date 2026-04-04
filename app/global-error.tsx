"use client";

import { useEffect } from "react";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

// if get error this page showing no affect seo Uncaught ChunkLoadError: Loading chunk 1132 failed. (error: https://ai.shareurinterest.com/_next/static/chunks/1132-a041d15d97109a4e.js)

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    if (
      error.name === "ChunkLoadError" ||
      error.message.includes("Loading chunk") ||
      error.message.includes("Failed to fetch dynamically imported module")
    ) {
      window.location.reload();
    }
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-black text-white">
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="w-full max-w-md text-center bg-zinc-900 rounded-2xl shadow-lg p-6 sm:p-8">
            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-bold text-violet-500 mb-3">
              Application Updated 🚀
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-300 mb-6">
              We are refreshing the page to give you the latest version.
            </p>

            {/* Button */}
            <button
              onClick={reset}
              className="w-full sm:w-auto px-6 py-2 bg-violet-600 hover:bg-violet-700 transition rounded-lg font-medium"
            >
              Manual Refresh
            </button>

            {/* Optional Error Info (for dev) */}
            <p className="mt-6 text-xs text-gray-500 break-words">
              {error?.message}
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
