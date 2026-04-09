export function getProjectPreviewImageUrl(href: string) {
  const url = href.trim();
  if (!url) return null;

  // GitHub repo open-graph preview image (public).
  const gh = url.match(/^https?:\/\/github\.com\/([^/]+)\/([^/?#]+)/i);
  if (gh) {
    const owner = gh[1];
    const repo = gh[2].replace(/\.git$/i, "");
    return `https://opengraph.githubassets.com/1/${owner}/${repo}`;
  }

  // Website screenshot (public, no-key). Works well for portfolio previews.
  if (/^https?:\/\//i.test(url)) {
    return `https://image.thum.io/get/width/1400/crop/900/noanimate/${url}`;
  }

  return null;
}

export function getFallbackPreviewDataUrl(title: string) {
  const safe = (title || "Project").trim().slice(0, 48);
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="900" viewBox="0 0 1400 900">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0b0b10"/>
      <stop offset="0.55" stop-color="#12121a"/>
      <stop offset="1" stop-color="#050507"/>
    </linearGradient>
    <radialGradient id="glow" cx="30%" cy="25%" r="65%">
      <stop offset="0" stop-color="rgba(139,92,246,0.35)"/>
      <stop offset="0.6" stop-color="rgba(236,72,153,0.12)"/>
      <stop offset="1" stop-color="rgba(0,0,0,0)"/>
    </radialGradient>
  </defs>
  <rect width="1400" height="900" fill="url(#bg)"/>
  <rect width="1400" height="900" fill="url(#glow)"/>
  <rect x="60" y="60" width="1280" height="780" rx="48" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.10)"/>
  <text x="110" y="210" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" font-size="22" letter-spacing="6" fill="rgba(255,255,255,0.55)">PREVIEW</text>
  <text x="110" y="310" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" font-size="64" font-weight="700" fill="rgba(255,255,255,0.92)">${safe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")}</text>
  <text x="110" y="380" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" font-size="20" fill="rgba(255,255,255,0.45)">Screenshot unavailable — showing fallback.</text>
</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

