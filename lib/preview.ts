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

