import type { APIContext } from "astro";

const H = { "content-type": "application/json; charset=utf-8" } as const;

// 余計な全角空白除去＋trim
const clean = (v: unknown) =>
  String(v ?? "")
    .replace(/\u3000/g, " ")
    .trim();

// 追跡クエリなど最小限の正規化
function normalizeUrl(raw: string) {
  const u = new URL(raw);
  if (!/^https?:$/.test(u.protocol))
    throw new Error("URLは http(s) のみです。");

  // デフォルトポート除去
  if (
    (u.protocol === "http:" && u.port === "80") ||
    (u.protocol === "https:" && u.port === "443")
  )
    u.port = "";

  // よくあるトラッキング系だけ削除（最小セット）
  for (const k of [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "gclid",
    "fbclid",
    "igshid",
    "ref",
  ]) {
    u.searchParams.delete(k);
  }

  // クエリをキー順で安定化
  if (u.searchParams.size) {
    const kv = [...u.searchParams.entries()].sort(([a], [b]) =>
      a.localeCompare(b)
    );
    u.search = "";
    for (const [k, v] of kv) u.searchParams.append(k, v);
  }

  // 末尾スラッシュ簡易整理／ホスト小文字化／ハッシュ削除
  if (u.pathname === "/") u.pathname = "";
  u.host = u.host.toLowerCase();
  u.hash = "";
  return u.toString();
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "access-control-allow-methods": "POST, OPTIONS",
      "access-control-allow-headers": "content-type",
    },
  });
}

export async function POST(ctx: APIContext) {
  const db = ctx.locals.runtime.env.ECHI_DB;
  if (!db) {
    return new Response(
      JSON.stringify({ ok: false, error: "D1_BINDING_NOT_FOUND" }),
      { status: 500, headers: H }
    );
  }

  // Content-Type と JSON
  if (!ctx.request.headers.get("content-type")?.includes("application/json")) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "content-type は application/json を指定してください。",
      }),
      { status: 415, headers: H }
    );
  }
  let body: any;
  try {
    body = await ctx.request.json();
  } catch {
    return new Response(
      JSON.stringify({ ok: false, error: "JSON のパースに失敗しました。" }),
      { status: 400, headers: H }
    );
  }

  // 最小限の検証
  const title = clean(body?.title);
  const urlRaw = clean(body?.url);
  if (title.length < 3 || title.length > 100) {
    return new Response(
      JSON.stringify({ ok: false, error: "タイトルは3〜100文字です。" }),
      { status: 400, headers: H }
    );
  }
  if (!urlRaw) {
    return new Response(
      JSON.stringify({ ok: false, error: "URLは必須です。" }),
      { status: 400, headers: H }
    );
  }

  let url: string;
  try {
    url = normalizeUrl(urlRaw);
  } catch (e: any) {
    return new Response(
      JSON.stringify({ ok: false, error: e?.message || "URLが不正です。" }),
      { status: 400, headers: H }
    );
  }
  if (url.length > 2000) {
    return new Response(
      JSON.stringify({ ok: false, error: "URLが長すぎます（最大2000文字）。" }),
      { status: 400, headers: H }
    );
  }

  // 1 クエリ UPSERT＋RETURNING（作成/既存どちらでもレコードを返す）
  try {
    const sql = `
      INSERT INTO links (title, url)
      VALUES (?1, ?2)
      ON CONFLICT(url) DO UPDATE SET title =
        CASE WHEN length(excluded.title) > length(title) THEN excluded.title ELSE title END
      RETURNING id, title, url, clicks, created_at;
    `;
    const { results } = await db.prepare(sql).bind(title, url).all();
    const item = results?.[0] ?? null;
    return new Response(JSON.stringify({ ok: true, item }), {
      status: 201,
      headers: H,
    });
  } catch (e: any) {
    // 互換モード等で RETURNING 不可な場合のフォールバック
    if (/RETURNING/i.test(String(e?.message))) {
      await db
        .prepare(`INSERT OR IGNORE INTO links (title, url) VALUES (?1, ?2)`)
        .bind(title, url)
        .run();
      const { results } = await db
        .prepare(
          `SELECT id, title, url, clicks, created_at FROM links WHERE url=?1 LIMIT 1`
        )
        .bind(url)
        .all();
      const item = results?.[0] ?? null;
      return new Response(JSON.stringify({ ok: true, item }), {
        status: 201,
        headers: H,
      });
    }
    return new Response(
      JSON.stringify({ ok: false, error: String(e?.message || e) }),
      { status: 500, headers: H }
    );
  }
}
