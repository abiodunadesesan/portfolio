/**
 * Draw image with CSS `object-fit: cover` behavior on a 2D canvas.
 */
export function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: CanvasImageSource,
  destW: number,
  destH: number
): void {
  const iw = "naturalWidth" in img ? img.naturalWidth : destW;
  const ih = "naturalHeight" in img ? img.naturalHeight : destH;
  if (!iw || !ih) return;

  const scale = Math.max(destW / iw, destH / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  const dx = (destW - dw) / 2;
  const dy = (destH - dh) / 2;

  ctx.drawImage(img, dx, dy, dw, dh);
}
