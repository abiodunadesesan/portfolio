"use client";

import { useEffect, useState } from "react";

/** Tailwind-aligned: sm 640, lg 1024 */
export type BreakpointTier = "mobile" | "tablet" | "desktop";

function getTier(width: number): BreakpointTier {
  if (width < 640) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

export function useBreakpointTier(): BreakpointTier {
  const [tier, setTier] = useState<BreakpointTier>("desktop");

  useEffect(() => {
    const update = () => setTier(getTier(window.innerWidth));
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return tier;
}
