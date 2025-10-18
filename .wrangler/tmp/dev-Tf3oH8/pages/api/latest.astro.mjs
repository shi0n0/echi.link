globalThis.process ??= {}; globalThis.process.env ??= {};
export { renderers } from '../../renderers.mjs';

const prerender = false;
const H = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store"
};
const GET = async ({ locals }) => {
  try {
    const db = locals.runtime.env.ECHI_DB;
    const { results } = await db.prepare("SELECT id, title, url, clicks, created_at FROM links ORDER BY datetime(created_at) DESC LIMIT 30;").all();
    return new Response(JSON.stringify(results ?? []), { headers: H });
  } catch (err) {
    console.error("GET /api/latest error:", err);
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500,
      headers: H
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
