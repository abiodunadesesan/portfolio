/**
 * Scroll sequence: put exported frames in `public/sequence/` (served as `/sequence/…`).
 * The folder name must be exactly `sequence` — paths below assume that.
 *
 * Default filenames: `frame_000_delay-0.066s.png` … (0-based, from typical PNG exports).
 * Change `FRAME_SUFFIX` if your tool uses a different delay string or extension.
 */
export const SEQUENCE_FRAME_COUNT = 120;

/**
 * Crop scroll-sequence frames before cover-fit to hide typical bottom-right tool marks
 * (e.g. small logo text). Slight zoom-in; tune 0–1 if a sliver remains or framing feels tight.
 */
export const SEQUENCE_SOURCE_CROP = {
  cropSourceRight: 0.06,
  cropSourceBottom: 0.0,
} as const;

const FRAME_SUFFIX = "_delay-0.066s.png";

/**
 * Frame URLs for the scroll canvas. For smaller payloads on narrow viewports you can later
 * add e.g. `/sequence/sm/frame_000_....webp` and branch in `ScrollyCanvas` using `matchMedia`.
 */
export function getFrameSrc(frameIndex: number): string {
  const i = Math.min(
    Math.max(0, Math.floor(frameIndex)),
    SEQUENCE_FRAME_COUNT - 1
  );
  const n = String(i).padStart(3, "0");
  return `/sequence/frame_${n}${FRAME_SUFFIX}`;
}

/** First frames to preload (layout `<link rel="preload">` + high `fetchPriority` in loader). */
export const HERO_PRELOAD_FRAME_INDICES = [0, 1, 2, 3, 4, 5, 10, 15, 20, 25, 30] as const;

export function getHeroPreloadFrameUrls(): string[] {
  return HERO_PRELOAD_FRAME_INDICES.map((i) => getFrameSrc(i));
}
