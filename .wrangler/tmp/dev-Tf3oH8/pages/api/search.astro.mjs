globalThis.process ??= {}; globalThis.process.env ??= {};
export { renderers } from '../../renderers.mjs';

async function GET(ctx) {
  const db = ctx.locals.runtime.env.ECHI_DB;
  if (!db) return new Response("bad", { status: 500 });
  const q = (ctx.url.searchParams.get("q") ?? "").trim();
  const limit = Math.min(Number(ctx.url.searchParams.get("limit") ?? 30), 60);
  if (!q) {
    const { results: results2 } = await db.prepare(`SELECT id,title,url,clicks,created_at FROM links ORDER BY datetime(created_at) DESC LIMIT ?1`).bind(limit).all();
    return new Response(JSON.stringify(results2 ?? []), { headers: { "content-type": "application/json" } });
  }
  const like = `%${q.replace(/%/g, "\\%").replace(/_/g, "\\_")}%`;
  const { results } = await db.prepare(`SELECT id,title,url,clicks,created_at
              FROM links
              WHERE title LIKE ?1 ESCAPE '\\' OR url LIKE ?1 ESCAPE '\\'
              ORDER BY datetime(created_at) DESC
              LIMIT ?2`).bind(like, limit).all();
  return new Response(JSON.stringify(results ?? []), { headers: { "content-type": "application/json" } });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
