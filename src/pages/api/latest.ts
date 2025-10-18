import type { APIContext } from "astro";

export async function GET(ctx: APIContext) {
  try {
    const db = ctx.locals.runtime.env.ECHI_DB; // ← wrangler.toml と一致させる
    if (!db) {
      return new Response(JSON.stringify({ error: "D1_BINDING_NOT_FOUND" }), { status: 500 });
    }

    const { results } = await db
      .prepare(`SELECT id, title, url, clicks, created_at
                FROM links
                ORDER BY datetime(created_at) DESC
                LIMIT 12`)
      .all();

    return new Response(JSON.stringify(results ?? []), {
      headers: { "content-type": "application/json" }
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: String(e?.message ?? e) }), { status: 500 });
  }
}
