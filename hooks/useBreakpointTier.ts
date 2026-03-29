"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";

/** Tailwind-aligned: sm 640, lg 1024 */
export type BreakpointTier = "mobile" | "tablet" | "desktop";

export function useBreakpointTier(): BreakpointTier {
  const isMobile = useMediaQuery("(max-width: 639px)", false);
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)", false);
  if (isMobile) return "mobile";
  if (isTablet) return "tablet";
  return "desktop";
}
