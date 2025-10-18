import type { APIContext } from "astro";

export async function GET(ctx: APIContext) {
  const id = Number(ctx.params.id);
  const db = ctx.locals.runtime.env.ECHI_DB;
  if (!db || !Number.isFinite(id)) return new Response("bad", { status: 400 });

  const { results } = await db
    .prepare(`SELECT id,title,url,clicks,created_at FROM links WHERE id=?1 LIMIT 1`)
    .bind(id)
    .all();

  return new Response(JSON.stringify(results?.[0] ?? null), {
    headers: { "content-type": "application/json" },
    status: results?.[0] ? 200 : 404,
  });
}
