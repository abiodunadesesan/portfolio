/**
 * Scroll sequence: put exported frames in `public/sequence/` (served as `/sequence/…`).
 * The folder name must be exactly `sequence` — paths below assume that.
 *
 * Default filenames: `frame_000_delay-0.066s.png` … (0-based, from typical PNG exports).
 * Change `FRAME_SUFFIX` if your tool uses a different delay string or extension.
 */
export const SEQUENCE_FRAME_COUNT = 120;

const FRAME_SUFFIX = "_delay-0.066s.png";

export function getFrameSrc(frameIndex: number): string {
  const i = Math.min(
    Math.max(0, Math.floor(frameIndex)),
    SEQUENCE_FRAME_COUNT - 1
  );
  const n = String(i).padStart(3, "0");
  return `/sequence/frame_${n}${FRAME_SUFFIX}`;
}
