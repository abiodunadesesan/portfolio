export type DrawImageCoverOptions = {
  /**
   * Fraction of source width to exclude from the right (0–1). Trims before cover-fit
   * (slight zoom) — useful for corner watermarks.
   */
  cropSourceRight?: number;
  /**
   * Fraction of source height to exclude from the bottom (0–1).
   */
  cropSourceBottom?: number;
};

/**
 * Draw image with CSS `object-fit: cover` behavior on a 2D canvas.
 * Optional source crops use a sub-rectangle of the bitmap (sx,sy,sw,sh) then scale to fill.
 */
export function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: CanvasImageSource,
  destW: number,
  destH: number,
  options?: DrawImageCoverOptions
): void {
  const iw = "naturalWidth" in img ? img.naturalWidth : destW;
  const ih = "naturalHeight" in img ? img.naturalHeight : destH;
  if (!iw || !ih) return;

  const cr = Math.min(0.45, Math.max(0, options?.cropSourceRight ?? 0));
  const cb = Math.min(0.45, Math.max(0, options?.cropSourceBottom ?? 0));
  const sw = iw * (1 - cr);
  const sh = ih * (1 - cb);
  if (!sw || !sh) return;

  const scale = Math.max(destW / sw, destH / sh);
  const dw = sw * scale;
  const dh = sh * scale;
  const dx = (destW - dw) / 2;
  const dy = (destH - dh) / 2;

  ctx.drawImage(img, 0, 0, sw, sh, dx, dy, dw, dh);
}
