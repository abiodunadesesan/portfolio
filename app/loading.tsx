export default function Loading() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#08080c]">
      <section className="h-[100svh] w-full animate-pulse bg-gradient-to-b from-zinc-200/70 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950" />

      <section className="mx-auto max-w-6xl px-6 py-10 md:px-12">
        <div className="mb-8 h-8 w-44 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`skeleton-card-${i}`}
              className="rounded-3xl border border-zinc-200/70 bg-white/80 p-5 dark:border-white/10 dark:bg-white/[0.03]"
            >
              <div className="h-4 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="mt-4 h-5 w-3/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="mt-3 h-4 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
