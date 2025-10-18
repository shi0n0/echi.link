globalThis.process ??= {}; globalThis.process.env ??= {};
export { renderers } from '../../renderers.mjs';

async function GET(ctx) {
  try {
    const db = ctx.locals.runtime.env.ECHI_DB;
    if (!db) {
      return new Response(JSON.stringify({ error: "D1_BINDING_NOT_FOUND" }), { status: 500 });
    }
    const { results } = await db.prepare(`SELECT id, title, url, clicks, created_at
                FROM links
                ORDER BY datetime(created_at) DESC
                LIMIT 12`).all();
    return new Response(JSON.stringify(results ?? []), {
      headers: { "content-type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e?.message ?? e) }), { status: 500 });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
