import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
import { analyticsFallback } from "@/lib/site-content";

export const dynamic = "force-dynamic";

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

export async function GET() {
  const redis = getRedis();
  if (!redis) {
    return NextResponse.json(fallbackPayload());
  }

  const KEYS = getKeys();

  try {
    const [pageViewsRaw, visitsRaw, totalVisitors] = await Promise.all([
      redis.get<number>(KEYS.pageviews),
      redis.get<number>(KEYS.visits),
      redis.scard(KEYS.visitorSet),
    ]);

    return NextResponse.json({
      totalVisitors: totalVisitors ?? 0,
      totalVisits: Number(visitsRaw) || 0,
      pageViews: Number(pageViewsRaw) || 0,
      asOfLabel: analyticsAsOfLabel(),
      source: "redis" as const,
    });
  } catch {
    return NextResponse.json(fallbackPayload());
  }
}

type Body = { visitorId?: string; sessionVisit?: boolean };

export async function POST(req: Request) {
  const redis = getRedis();
  if (!redis) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const KEYS = getKeys();

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

  try {
    const sessionVisit = Boolean(body.sessionVisit);

    await redis.incr(KEYS.pageviews);
    if (sessionVisit) {
      await redis.incr(KEYS.visits);
    }
    await redis.sadd(KEYS.visitorSet, visitorId);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
