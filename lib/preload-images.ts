/**
 * Fire-and-forget image preloads for interactive UI (carousels, sequences, etc.).
 * Resolves when each URL has loaded or failed (no rejection — avoids blocking UX).
 */
export function preloadImages(urls: readonly string[]): Promise<void> {
  return Promise.all(
    urls.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = src;
        })
    )
  ).then(() => undefined);
}
