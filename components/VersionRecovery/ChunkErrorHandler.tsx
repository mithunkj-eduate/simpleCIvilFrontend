"use client";
import { useEffect } from "react";

export function ChunkErrorHandler() {
  useEffect(() => {
    const handler = (event: any) => {
      const msg = event?.reason?.message || event?.message;

      if (
        msg?.includes("ChunkLoadError") ||
        msg?.includes("Loading chunk") ||
        msg?.includes("dynamically imported module")
      ) {
        window.location.href =
          window.location.pathname + "?v=" + Date.now();
      }
    };

    window.addEventListener("unhandledrejection", handler);
    window.addEventListener("error", handler);

    return () => {
      window.removeEventListener("unhandledrejection", handler);
      window.removeEventListener("error", handler);
    };
  }, []);

  return null;
}