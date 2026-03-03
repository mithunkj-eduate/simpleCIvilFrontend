"use client";
import { useEffect } from "react";

export default function VersionRecovery() {
  useEffect(() => {
    const MAX_RETRIES = 3;

    const url = new URL(window.location.href);
    const currentVersion = Number(url.searchParams.get("v") || "1");

    const reloadWithNextVersion = () => {
      if (currentVersion >= MAX_RETRIES) return;

      url.searchParams.set("v", String(currentVersion + 1));
      window.location.href = url.toString();
    };

    window.addEventListener("error", reloadWithNextVersion);

    window.addEventListener("unhandledrejection", (event) => {
      if (
        event.reason?.message?.includes("ChunkLoadError") ||
        event.reason?.message?.includes("Loading chunk")
      ) {
        reloadWithNextVersion();
      }
    });

    return () => {
      window.removeEventListener("error", reloadWithNextVersion);
    };
  }, []);

  return null;
}
