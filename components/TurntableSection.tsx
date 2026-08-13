"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { GlassCard } from "@/components/ui/GlassCard";
import { NanoChip } from "@/components/ui/NanoChip";
import { links, turntablePlaylists } from "@/lib/site-content";
import { Pause, Play, SkipBack, SkipForward, ExternalLink } from "lucide-react";

const TOTAL_SECONDS = 207;

function toClock(total: number): string {
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

export default function TurntableSection() {
  const [activePlaylist, setActivePlaylist] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [elapsed, setElapsed] = useState(191);
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const embedWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setElapsed((prev) => {
        if (prev >= TOTAL_SECONDS) {
          setActivePlaylist((i) => (i + 1) % turntablePlaylists.length);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [playing]);

  const waveform = useMemo(
    () =>
      Array.from({ length: 68 }, (_, i) => {
        const base = Math.sin((i / 5.2) * Math.PI) * 0.5 + 0.5;
        const variance = ((i * 17) % 7) / 10;
        return Math.round(10 + base * 16 + variance * 9);
      }),
    []
  );

  const progress = Math.min(1, Math.max(0, elapsed / TOTAL_SECONDS));
  const playlist = turntablePlaylists[activePlaylist] ?? turntablePlaylists[0];
  const currentTrack = playlist.tracks[0];

  const prevPlaylist = () => {
    setActivePlaylist((i) => (i - 1 + turntablePlaylists.length) % turntablePlaylists.length);
    setElapsed(0);
  };

  const nextPlaylist = () => {
    setActivePlaylist((i) => (i + 1) % turntablePlaylists.length);
    setElapsed(0);
  };

  const togglePlay = () => {
    setPlaying((prev) => {
      const next = !prev;
      if (next) {
        window.setTimeout(() => {
          embedWrapRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
          embedWrapRef.current?.focus();
        }, 120);
      }
      return next;
    });
  };

  const onDragStart = (e: React.PointerEvent<HTMLButtonElement>) => {
    setDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    dragOffsetRef.current = { ...drag };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onDragMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragging) return;
    setDrag({
      x: dragOffsetRef.current.x + (e.clientX - dragStartRef.current.x),
      y: dragOffsetRef.current.y + (e.clientY - dragStartRef.current.y),
    });
  };

  const onDragEnd = (e: React.PointerEvent<HTMLButtonElement>) => {
    setDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  return (
    <AnimatedSection
      id="turntable"
      className="relative z-20 scroll-mt-24 overflow-x-hidden border-t border-zinc-200/60 bg-gradient-to-b from-zinc-50 via-stone-100/80 to-zinc-100 px-4 py-20 dark:border-white/10 dark:from-[#09090d] dark:via-[#0a0a10] dark:to-[#060608] sm:px-6 md:scroll-mt-28 md:px-12 md:py-28"
      aria-labelledby="turntable-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 md:mb-14">
          <NanoChip>On the turntable</NanoChip>
          <h2
            id="turntable-heading"
            className="font-display mt-4 text-3xl font-semibold tracking-tight text-zinc-900 max-[379px]:text-[1.65rem] dark:text-white md:text-4xl"
          >
            Recently spinning
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600 max-[379px]:text-[13px] max-[379px]:leading-snug md:text-base dark:text-white/55">
            A retro-inspired music corner styled to match this portfolio. Live Spotify links are wired in.
          </p>
          <div className="-mx-1 mt-4 flex gap-2 overflow-x-auto px-1 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
            {turntablePlaylists.map((item, i) => (
              <button
                key={item.href}
                type="button"
                onClick={() => setActivePlaylist(i)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-300 max-[379px]:gap-1.5 max-[379px]:px-2.5 max-[379px]:py-1 ${
                  i === activePlaylist
                    ? "border-violet-500/55 bg-violet-100/80 text-violet-800 dark:border-violet-400/55 dark:bg-violet-500/20 dark:text-violet-200"
                    : "border-zinc-200/80 bg-white/80 text-zinc-700 hover:border-violet-300/60 hover:text-violet-700 dark:border-white/10 dark:bg-zinc-900/80 dark:text-white/75 dark:hover:border-violet-400/35 dark:hover:text-violet-200"
                }`}
                aria-pressed={i === activePlaylist}
              >
                <span className="capitalize">{item.title}</span>
                <span className="hidden text-zinc-500 dark:text-white/40 sm:inline">· {item.vibe}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
          <GlassCard spotlight className="relative min-w-0 overflow-hidden">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-white/45">
              Last played · Spotify
            </p>

            <div className="mt-4 min-w-0 rounded-3xl border border-zinc-200/80 bg-zinc-100/70 p-3 sm:p-4 dark:border-white/10 dark:bg-[#0f0f14]">
              <div className="rounded-2xl border border-zinc-300/80 bg-[#111] p-3 dark:border-white/10">
                <div className="rounded-xl bg-zinc-50 px-3 py-2 dark:bg-zinc-900/90">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-white/50">
                    Side A · Spotify · Playlist mode
                  </p>
                  <p className="mt-2 text-base font-semibold text-zinc-900 max-[379px]:text-[15px] dark:text-white">
                    {currentTrack.title}
                  </p>
                  <p className="text-xs uppercase tracking-[0.16em] text-zinc-500 max-[379px]:tracking-[0.12em] dark:text-white/50">
                    {currentTrack.artist}
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between rounded-xl border border-zinc-800 bg-black px-3 py-3.5 sm:px-6 sm:py-4">
                  <span className="h-8 w-8 rounded-full border border-zinc-500 bg-zinc-100 shadow-[inset_0_0_0_6px_rgba(0,0,0,0.9)]" />
                  <span className="mx-2 h-px flex-1 bg-zinc-600/80 sm:mx-4" />
                  <span className="h-8 w-8 rounded-full border border-zinc-500 bg-zinc-100 shadow-[inset_0_0_0_6px_rgba(0,0,0,0.9)]" />
                </div>
              </div>

              <div className="mt-5">
                <div className="overflow-hidden">
                  <div className="flex min-w-0 items-end gap-[2px] sm:gap-[3px]">
                  {waveform.map((h, i) => (
                    <span
                      key={`${h}-${i}`}
                      className="w-[2px] rounded-full bg-zinc-800/90 sm:w-[3px] dark:bg-zinc-300/80"
                      style={{ height: `${h}px`, opacity: i / waveform.length <= progress ? 1 : 0.35 }}
                    />
                  ))}
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs font-medium text-zinc-600 dark:text-white/55">
                  <span>{toClock(elapsed)}</span>
                  <span>-{toClock(Math.max(0, TOTAL_SECONDS - elapsed))}</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-zinc-200 dark:bg-white/10">
                  <div
                    className="h-full rounded-full bg-violet-500 transition-[width] duration-700 ease-out"
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
              </div>

              <div className="mt-5 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={prevPlaylist}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition hover:border-violet-300 hover:text-violet-700 dark:border-white/15 dark:bg-white/[0.04] dark:text-white/80"
                  aria-label="Previous"
                >
                  <SkipBack className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={togglePlay}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-violet-600 text-white transition hover:bg-violet-500 dark:bg-violet-500 dark:hover:bg-violet-400"
                  aria-label={playing ? "Pause" : "Play"}
                >
                  {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </button>
                <button
                  type="button"
                  onClick={nextPlaylist}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition hover:border-violet-300 hover:text-violet-700 dark:border-white/15 dark:bg-white/[0.04] dark:text-white/80"
                  aria-label="Next"
                >
                  <SkipForward className="h-4 w-4" />
                </button>
              </div>

              <a
                href={playlist.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 transition hover:text-zinc-900 dark:text-violet-300 dark:hover:text-white"
              >
                Open in Spotify
                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </a>

              <div
                ref={embedWrapRef}
                tabIndex={-1}
                className="mt-4 min-w-0 overflow-hidden rounded-2xl border border-zinc-200/70 bg-zinc-950/80 outline-none dark:border-white/10"
              >
                <iframe
                  title={`${playlist.title} Spotify player`}
                  src={playlist.embedUrl}
                  width="100%"
                  height="152"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="block"
                />
              </div>
            </div>
          </GlassCard>

          <div className="min-w-0 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-white/45">
              Recently spinning · from Spotify
            </p>
            {playlist.tracks.map((track, index) => (
              <GlassCard key={`${playlist.title}-${track.title}`} className="group transition-all duration-300 hover:-translate-y-0.5" spotlight>
                <a
                  href={track.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4"
                >
                  <span className="relative inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-zinc-300 bg-zinc-900 dark:border-white/15">
                    <span
                      className={`absolute h-14 w-14 rounded-full border border-white/10 motion-reduce:animate-none ${
                        playing ? "[animation:spin_4.2s_linear_infinite]" : ""
                      }`}
                    />
                    <span
                      className={`h-4 w-4 rounded-full border border-black/20 ${
                        index === 0 ? "bg-orange-500" : "bg-emerald-300"
                      }`}
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                  <span className="block truncate text-lg font-semibold text-zinc-900 max-[379px]:text-base dark:text-white">
                      {track.title}
                    </span>
                  <span className="block truncate text-xs uppercase tracking-[0.16em] text-zinc-500 max-[379px]:tracking-[0.12em] dark:text-white/50">
                      {track.artist} · {track.length}
                    </span>
                  </span>
                  <span className="text-xs font-semibold text-zinc-500 dark:text-white/45">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </a>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        aria-label="Drag me widget"
        onPointerDown={onDragStart}
        onPointerMove={onDragMove}
        onPointerUp={onDragEnd}
        onPointerCancel={onDragEnd}
        className="absolute right-6 top-10 hidden h-16 w-16 select-none items-center justify-center rounded-full border border-zinc-300 bg-white/85 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-700 shadow-lg shadow-zinc-900/15 transition dark:border-white/15 dark:bg-zinc-900/90 dark:text-white/80 md:inline-flex"
        style={{ transform: `translate(${drag.x}px, ${drag.y}px)` }}
      >
        Drag me
      </button>

      <a
        href={links.spotifyPlaylist}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-8 left-6 hidden rounded-full border border-zinc-200/80 bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-700 shadow-sm transition hover:border-violet-300/60 hover:text-violet-700 dark:border-white/10 dark:bg-zinc-900/80 dark:text-white/75 dark:hover:border-violet-400/35 dark:hover:text-violet-200 md:inline-flex"
      >
        Hi - made by Caleb
      </a>
    </AnimatedSection>
  );
}
