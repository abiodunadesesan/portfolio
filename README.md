# Caleb Website

Next.js site with a scroll-driven image sequence on the hero canvas.

## Sequence frames setup

The scrolly canvas loads frames from **`public/sequence/`** only. The folder name must be exactly **`sequence`** so URLs match `/sequence/…` (see `lib/sequence.ts`).

1. Export or unzip your frame images.
2. Rename the folder to **`sequence`**.
3. Move or copy it into **`public/`**, so you have **`public/sequence/`** next to `public/favicon` (etc.).

Default file naming is **`frame_000_delay-0.066s.png`** through **`frame_119_delay-0.066s.png`** (120 frames, 0-based index). If your export uses a different delay label, edit `FRAME_SUFFIX` in `lib/sequence.ts`. If you use **`frame-001.webp`** style instead, set `SEQUENCE_FRAME_COUNT` to your frame count and change `getFrameSrc` to return `/sequence/frame-${String(i + 1).padStart(3, "0")}.webp`.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment (optional analytics)

See `.env.example`. With Upstash Redis on Vercel, visitor / visit / page-view counts are stored **per deployment**, so each new deploy starts from **0**. Without Redis, the footer defaults to **0** unless you set the optional `NEXT_PUBLIC_ANALYTICS_*` overrides.

## Deploy

Deploy on [Vercel](https://vercel.com/new): include `public/sequence/` in the repo (or your hosting equivalent) so frames are available in production.
