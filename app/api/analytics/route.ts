import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
import { analyticsFallback } from "@/lib/site-content";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Each Vercel deployment gets a unique ID — we namespace Redis keys so counts
 * start at 0 for that deployment. Local dev uses a stable `local-dev` bucket.
 */
function redisNamespace(): string {
  return process.env.VERCEL_DEPLOYMENT_ID ?? "local-dev";
}

function getKeys() {
  const ns = redisNamespace();
  return {
    pageviews: `analytics:${ns}:pageviews`,
    visits: `analytics:${ns}:visits`,
    visitorSet: `analytics:${ns}:visitor_ids`,
  } as const;
}

function analyticsAsOfLabel(): string {
  const d = new Date();
  const formatted = d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return `Developer Analytics (from ${formatted})`;
}

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

/** In-memory fallback when Redis env is not set (dev + single warm serverless instance). */
type MemStore = { pageviews: number; visits: number; visitorIds: Set<string> };

function getMemoryStore(): MemStore {
  const g = globalThis as unknown as { __portfolioAnalytics?: MemStore };
  if (!g.__portfolioAnalytics) {
    g.__portfolioAnalytics = {
      pageviews: 0,
      visits: 0,
      visitorIds: new Set<string>(),
    };
  }
  return g.__portfolioAnalytics;
}

function jsonResponse(data: object) {
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}

function fallbackPayload() {
  return {
    totalVisitors: Number(
      process.env.NEXT_PUBLIC_ANALYTICS_VISITORS ?? analyticsFallback.totalVisitors
    ),
    totalVisits: Number(
      process.env.NEXT_PUBLIC_ANALYTICS_VISITS ?? analyticsFallback.totalVisits
    ),
    pageViews: Number(
      process.env.NEXT_PUBLIC_ANALYTICS_PAGE_VIEWS ?? analyticsFallback.pageViews
    ),
    asOfLabel: analyticsAsOfLabel(),
    source: "fallback" as const,
  };
}

function memoryPayload() {
  const m = getMemoryStore();
  return {
    totalVisitors: m.visitorIds.size,
    totalVisits: m.visits,
    pageViews: m.pageviews,
    asOfLabel: analyticsAsOfLabel(),
    source: "memory" as const,
  };
}

function applyVisitToMemory(visitorId: string, sessionVisit: boolean) {
  const m = getMemoryStore();
  m.pageviews += 1;
  if (sessionVisit) m.visits += 1;
  m.visitorIds.add(visitorId);
}

export async function GET() {
  const redis = getRedis();
  if (!redis) {
    return jsonResponse(memoryPayload());
  }

  const KEYS = getKeys();

  try {
    const [pageViewsRaw, visitsRaw, totalVisitors] = await Promise.all([
      redis.get<string | number>(KEYS.pageviews),
      redis.get<string | number>(KEYS.visits),
      redis.scard(KEYS.visitorSet),
    ]);

    return jsonResponse({
      totalVisitors: Number(totalVisitors) || 0,
      totalVisits: Number(visitsRaw ?? 0) || 0,
      pageViews: Number(pageViewsRaw ?? 0) || 0,
      asOfLabel: analyticsAsOfLabel(),
      source: "redis" as const,
    });
  } catch {
    return jsonResponse(fallbackPayload());
  }
}

type Body = { visitorId?: string; sessionVisit?: boolean };

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const visitorId =
    typeof body.visitorId === "string" && body.visitorId.length > 0 && body.visitorId.length < 200
      ? body.visitorId
      : null;

  if (!visitorId) {
    return NextResponse.json({ error: "visitorId required" }, { status: 400 });
  }

  const sessionVisit = Boolean(body.sessionVisit);

  const redis = getRedis();
  if (!redis) {
    applyVisitToMemory(visitorId, sessionVisit);
    return jsonResponse({ ok: true, source: "memory" as const });
  }

  const KEYS = getKeys();

  try {
    await redis.incr(KEYS.pageviews);
    if (sessionVisit) {
      await redis.incr(KEYS.visits);
    }
    await redis.sadd(KEYS.visitorSet, visitorId);

    return jsonResponse({ ok: true, source: "redis" as const });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
