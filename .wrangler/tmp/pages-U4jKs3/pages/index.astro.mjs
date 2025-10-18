globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, m as maybeRenderHead, r as renderTemplate, f as createAstro, h as addAttribute, k as renderHead, l as renderComponent } from '../chunks/astro/server_CkkThTsN.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header class="sticky top-0 z-50 backdrop-blur bg-black/50 border-b border-white/10"> <div class="max-w-6xl mx-auto flex items-center justify-between p-4"> <a href="/" class="text-xl font-semibold text-fuchsia-400">Echi.link</a> <nav class="flex items-center gap-3"> <a href="/search" class="text-sm text-gray-300 hover:text-white">検索</a> <a href="/submit" class="bg-fuchsia-600 hover:bg-fuchsia-500 text-white px-3 py-1 rounded-lg text-sm">投稿</a> </nav> </div> </header>`;
}, "/Users/shiono/Desktop/\u500B\u4EBA\u5236\u4F5C/echi.link/src/components/Header.astro", void 0);

const $$Astro$1 = createAstro();
const $$LinkCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$LinkCard;
  const { id, title, url, clicks = 0 } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<article class="rounded-xl p-4 bg-[#12131a] ring-1 ring-white/10 hover:ring-accent-600/50 transition"> <div class="flex items-center justify-between gap-3"> <h3 class="text-pink-500 text-base font-semibold truncate">★ ${title}</h3> <form method="post"${addAttribute(`/api/click/${id}`, "action")}> <button class="px-3 py-1 rounded-md bg-pink-600 hover:bg-pink-500 text-white text-sm" type="submit">
OPEN!!!
</button> </form> </div> <p class="mt-1 text-xs text-gray-300 break-all">${url}</p> <p class="mt-1 text-xs text-gray-500">アクセス: ${clicks}</p> </article>`;
}, "/Users/shiono/Desktop/\u500B\u4EBA\u5236\u4F5C/echi.link/src/components/LinkCard.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  let latest = [];
  try {
    const res = await fetch(new URL("/api/latest", Astro2.url));
    if (res.ok) latest = await res.json();
  } catch {
  }
  return renderTemplate`<html lang="ja"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Echi.link</title>${renderHead()}</head> <body class="bg-black text-gray-100 min-h-screen"> ${renderComponent($$result, "Header", $$Header, {})} <main class="max-w-6xl mx-auto px-4 py-8"> <h2 class="text-lg font-semibold mb-4 border-b border-white/10 pb-2">最新のリンク</h2> ${latest.length ? renderTemplate`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"> ${latest.map((item) => renderTemplate`${renderComponent($$result, "LinkCard", $$LinkCard, { ...item })}`)} </div>` : renderTemplate`<p class="text-gray-400 text-sm">まだ投稿がありません。</p>`} </main> </body></html>`;
}, "/Users/shiono/Desktop/\u500B\u4EBA\u5236\u4F5C/echi.link/src/pages/index.astro", void 0);

const $$file = "/Users/shiono/Desktop/個人制作/echi.link/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
