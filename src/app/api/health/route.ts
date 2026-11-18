import { db } from "@/lib/db";

// Always run on request: a cached answer would say "ok" for a dead process.
export const dynamic = "force-dynamic";

// GET /api/health          -> the process is up. No database. Used by the k8s
//                             probes and the external uptime monitor.
// GET /api/health?ready=1  -> also checks Postgres. For people only, now and
//                             then: on a short interval it would keep Neon's
//                             free tier awake around the clock (IdistinguishR
//                             ran out of compute that way).
export async function GET(req: Request) {
  if (new URL(req.url).searchParams.get("ready") !== "1") {
    return Response.json({ status: "ok" });
  }
  try {
    await db.$queryRaw`SELECT 1`;
    return Response.json({ status: "ok", database: "ok" });
  } catch (err) {
    // Name only: the message can include the host from the connection string.
    console.error("health: database check failed", err instanceof Error ? err.name : "unknown");
    return Response.json({ status: "error", database: "unreachable" }, { status: 503 });
  }
}
