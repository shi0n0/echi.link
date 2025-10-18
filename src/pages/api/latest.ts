import type { APIRoute } from "astro";

export const prerender = false;

const H = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
} as const;

export const GET: APIRoute = async ({ locals }) => {
  try {
    const db = locals.runtime.env.ECHI_DB;
    const { results } = await db
      .prepare("SELECT id, title, url, clicks, created_at FROM links ORDER BY datetime(created_at) DESC LIMIT 30;")
      .all();

    return new Response(JSON.stringify(results ?? []), { headers: H });
  } catch (err: any) {
    console.error("GET /api/latest error:", err);
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500,
      headers: H,
    });
  }
};
