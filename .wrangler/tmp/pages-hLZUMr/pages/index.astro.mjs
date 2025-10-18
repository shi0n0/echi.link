globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, r as renderTemplate, m as maybeRenderHead, k as renderComponent, f as createAstro, h as addAttribute, l as renderHead } from '../chunks/astro/server_KWc0qxov.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

var __freeze$3 = Object.freeze;
var __defProp$3 = Object.defineProperty;
var __template$3 = (cooked, raw) => __freeze$3(__defProp$3(cooked, "raw", { value: __freeze$3(raw || cooked.slice()) }));
var _a$3;
const $$SubmitModal = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate(_a$3 || (_a$3 = __template$3(["", `<button id="open-submit" class="bg-fuchsia-600 hover:bg-fuchsia-500 text-white px-3 py-1 rounded-lg text-sm">
\u6295\u7A3F
</button> <dialog id="submit-dialog" class="rounded-xl w-[min(92vw,520px)] bg-[#12131a] text-gray-100 shadow-2xl
         opacity-0 scale-95 transition-all duration-200 ease-out p-0"> <form id="submit-form" method="dialog" class="p-5 space-y-4"> <header class="flex items-center justify-between"> <h2 class="text-base font-semibold">\u30EA\u30F3\u30AF\u3092\u6295\u7A3F</h2> <button type="button" id="close-submit" class="text-gray-400 hover:text-gray-200">\u2715</button> </header> <div class="space-y-2"> <label class="block text-sm">\u30BF\u30A4\u30C8\u30EB</label> <input name="title" required minlength="3" maxlength="100" class="w-full rounded-md bg-[#181a22] border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-fuchsia-600"> </div> <div class="space-y-2"> <label class="block text-sm">URL</label> <input name="url" type="url" required class="w-full rounded-md bg-[#181a22] border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-fuchsia-600"> </div> <div class="flex items-center justify-end gap-2 pt-2"> <button type="button" id="cancel-submit" class="px-3 py-1 rounded-md bg-white/10 hover:bg-white/20">
\u30AD\u30E3\u30F3\u30BB\u30EB
</button> <button type="submit" class="px-4 py-1.5 rounded-md bg-fuchsia-600 hover:bg-fuchsia-500 text-white">
\u6295\u7A3F\u3059\u308B
</button> </div> <p id="submit-msg" class="text-sm text-gray-400"></p> </form> </dialog>  <script>
  const dlg       = document.getElementById('submit-dialog');
  const openBtn   = document.getElementById('open-submit');
  const closeBtn  = document.getElementById('close-submit');
  const cancelBtn = document.getElementById('cancel-submit');
  const form      = document.getElementById('submit-form');
  const msg       = document.getElementById('submit-msg');

  const cardHTML = (d) => \`
    <article class="rounded-xl p-4 bg-[#12131a] ring-1 ring-white/10 hover:!ring-fuchsia-500/40 transition">
      <div class="flex items-center justify-between gap-2">
        <h3 class="text-sm font-medium truncate">\${d.title}</h3>
        <div class="flex gap-2">
          <a href="#" class="js-open-detail text-xs px-2 py-1 rounded-md bg-white/10 hover:bg-white/20" data-id="\${d.id}">\u8A73\u7D30</a>
          <a href="\${d.url}" target="_blank" rel="noopener"
             class="bg-fuchsia-600 hover:bg-fuchsia-500 text-white px-3 py-1 rounded-md text-xs">\u958B\u304F</a>
        </div>
      </div>
      <p class="text-[11px] text-gray-400 break-all mt-1">\${d.url}</p>
      <p class="text-[11px] text-gray-500 mt-1">\u30A2\u30AF\u30BB\u30B9: \${d.clicks ?? 0}</p>
    </article>
  \`;

  const open = () => {
    dlg.showModal();
    // \u201C\u5165\u308A\u201D\u30A2\u30CB\u30E1\u3092\u78BA\u5B9F\u306B\u8D70\u3089\u305B\u308B
    requestAnimationFrame(() =>
      requestAnimationFrame(() => dlg.classList.add('is-open'))
    );
    msg.textContent = "";
  };

  const close = () => {
    dlg.classList.add('is-closing');
    // 1\u30D5\u30EC\u30FC\u30E0\u9045\u3089\u305B\u3066is-open\u3092\u5916\u3059\u3053\u3068\u3067backdrop\u9077\u79FB\u304C\u78BA\u5B9F\u306B\u767A\u706B
    requestAnimationFrame(() => dlg.classList.remove('is-open'));
    dlg.addEventListener('transitionend', () => {
      dlg.classList.remove('is-closing');
      dlg.close();
    }, { once: true });
  };

  openBtn?.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  cancelBtn?.addEventListener('click', close);

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.textContent = "\u9001\u4FE1\u4E2D\u2026";
    const fd   = new FormData(form);
    const body = JSON.stringify({ title: fd.get('title'), url: fd.get('url') });

    try {
      const res = await fetch('/api/post', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body
      });
      if (!res.ok) throw new Error('\u6295\u7A3F\u306B\u5931\u6557\u3057\u307E\u3057\u305F');

      const { item } = await res.json();
      if (!item) throw new Error('\u30EC\u30B9\u30DD\u30F3\u30B9\u304C\u4E0D\u6B63\u3067\u3059');

      const grid = document.getElementById('grid');
      if (grid) grid.insertAdjacentHTML('afterbegin', cardHTML(item));

      dispatchEvent(new CustomEvent('echi:post-item', { detail: { item } }));

      msg.textContent = "\u6295\u7A3F\u3057\u307E\u3057\u305F\u3002";
      setTimeout(() => { form.reset(); close(); }, 200);
    } catch (err) {
      msg.textContent = String(err?.message || err);
    }
  });

  dlg?.addEventListener('cancel', (e) => { e.preventDefault(); close(); });
<\/script>`], ["", `<button id="open-submit" class="bg-fuchsia-600 hover:bg-fuchsia-500 text-white px-3 py-1 rounded-lg text-sm">
\u6295\u7A3F
</button> <dialog id="submit-dialog" class="rounded-xl w-[min(92vw,520px)] bg-[#12131a] text-gray-100 shadow-2xl
         opacity-0 scale-95 transition-all duration-200 ease-out p-0"> <form id="submit-form" method="dialog" class="p-5 space-y-4"> <header class="flex items-center justify-between"> <h2 class="text-base font-semibold">\u30EA\u30F3\u30AF\u3092\u6295\u7A3F</h2> <button type="button" id="close-submit" class="text-gray-400 hover:text-gray-200">\u2715</button> </header> <div class="space-y-2"> <label class="block text-sm">\u30BF\u30A4\u30C8\u30EB</label> <input name="title" required minlength="3" maxlength="100" class="w-full rounded-md bg-[#181a22] border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-fuchsia-600"> </div> <div class="space-y-2"> <label class="block text-sm">URL</label> <input name="url" type="url" required class="w-full rounded-md bg-[#181a22] border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-fuchsia-600"> </div> <div class="flex items-center justify-end gap-2 pt-2"> <button type="button" id="cancel-submit" class="px-3 py-1 rounded-md bg-white/10 hover:bg-white/20">
\u30AD\u30E3\u30F3\u30BB\u30EB
</button> <button type="submit" class="px-4 py-1.5 rounded-md bg-fuchsia-600 hover:bg-fuchsia-500 text-white">
\u6295\u7A3F\u3059\u308B
</button> </div> <p id="submit-msg" class="text-sm text-gray-400"></p> </form> </dialog>  <script>
  const dlg       = document.getElementById('submit-dialog');
  const openBtn   = document.getElementById('open-submit');
  const closeBtn  = document.getElementById('close-submit');
  const cancelBtn = document.getElementById('cancel-submit');
  const form      = document.getElementById('submit-form');
  const msg       = document.getElementById('submit-msg');

  const cardHTML = (d) => \\\`
    <article class="rounded-xl p-4 bg-[#12131a] ring-1 ring-white/10 hover:!ring-fuchsia-500/40 transition">
      <div class="flex items-center justify-between gap-2">
        <h3 class="text-sm font-medium truncate">\\\${d.title}</h3>
        <div class="flex gap-2">
          <a href="#" class="js-open-detail text-xs px-2 py-1 rounded-md bg-white/10 hover:bg-white/20" data-id="\\\${d.id}">\u8A73\u7D30</a>
          <a href="\\\${d.url}" target="_blank" rel="noopener"
             class="bg-fuchsia-600 hover:bg-fuchsia-500 text-white px-3 py-1 rounded-md text-xs">\u958B\u304F</a>
        </div>
      </div>
      <p class="text-[11px] text-gray-400 break-all mt-1">\\\${d.url}</p>
      <p class="text-[11px] text-gray-500 mt-1">\u30A2\u30AF\u30BB\u30B9: \\\${d.clicks ?? 0}</p>
    </article>
  \\\`;

  const open = () => {
    dlg.showModal();
    // \u201C\u5165\u308A\u201D\u30A2\u30CB\u30E1\u3092\u78BA\u5B9F\u306B\u8D70\u3089\u305B\u308B
    requestAnimationFrame(() =>
      requestAnimationFrame(() => dlg.classList.add('is-open'))
    );
    msg.textContent = "";
  };

  const close = () => {
    dlg.classList.add('is-closing');
    // 1\u30D5\u30EC\u30FC\u30E0\u9045\u3089\u305B\u3066is-open\u3092\u5916\u3059\u3053\u3068\u3067backdrop\u9077\u79FB\u304C\u78BA\u5B9F\u306B\u767A\u706B
    requestAnimationFrame(() => dlg.classList.remove('is-open'));
    dlg.addEventListener('transitionend', () => {
      dlg.classList.remove('is-closing');
      dlg.close();
    }, { once: true });
  };

  openBtn?.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  cancelBtn?.addEventListener('click', close);

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.textContent = "\u9001\u4FE1\u4E2D\u2026";
    const fd   = new FormData(form);
    const body = JSON.stringify({ title: fd.get('title'), url: fd.get('url') });

    try {
      const res = await fetch('/api/post', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body
      });
      if (!res.ok) throw new Error('\u6295\u7A3F\u306B\u5931\u6557\u3057\u307E\u3057\u305F');

      const { item } = await res.json();
      if (!item) throw new Error('\u30EC\u30B9\u30DD\u30F3\u30B9\u304C\u4E0D\u6B63\u3067\u3059');

      const grid = document.getElementById('grid');
      if (grid) grid.insertAdjacentHTML('afterbegin', cardHTML(item));

      dispatchEvent(new CustomEvent('echi:post-item', { detail: { item } }));

      msg.textContent = "\u6295\u7A3F\u3057\u307E\u3057\u305F\u3002";
      setTimeout(() => { form.reset(); close(); }, 200);
    } catch (err) {
      msg.textContent = String(err?.message || err);
    }
  });

  dlg?.addEventListener('cancel', (e) => { e.preventDefault(); close(); });
<\/script>`])), maybeRenderHead());
}, "/Users/shiono/Desktop/\u500B\u4EBA\u5236\u4F5C/echi.link/src/components/SubmitModal.astro", void 0);

const $$Header = createComponent(($$result, $$props, $$slots) => {
  const appName = "Echi.link";
  return renderTemplate`${maybeRenderHead()}<header class="sticky top-0 z-50 backdrop-blur bg-black/50 border-b border-white/10"> <div class="max-w-6xl mx-auto flex items-center justify-between p-4"> <a href="/" class="text-xl font-semibold text-fuchsia-400">${appName}</a> <nav class="flex items-center gap-3"> <a href="/search" class="text-sm text-gray-300 hover:text-white">検索</a> ${renderComponent($$result, "SubmitModal", $$SubmitModal, {})} <!-- フォールバックとして従来のページ遷移を残すなら↓ --> <!-- <a href="/submit" class="hidden sm:inline text-sm text-gray-400 hover:text-white">ページで投稿</a> --> </nav> </div> </header>`;
}, "/Users/shiono/Desktop/個人制作/echi.link/src/components/Header.astro", void 0);

var __freeze$2 = Object.freeze;
var __defProp$2 = Object.defineProperty;
var __template$2 = (cooked, raw) => __freeze$2(__defProp$2(cooked, "raw", { value: __freeze$2(raw || cooked.slice()) }));
var _a$2;
const $$SearchBox = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate(_a$2 || (_a$2 = __template$2(["", '<input id="q" name="q" placeholder="\u691C\u7D22\uFF08\u30BF\u30A4\u30C8\u30EB\u30FBURL\uFF09" class="w-72 max-w-full rounded-md bg-[#181a22] border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-fuchsia-600 text-sm"> <script>\n  const q = document.getElementById(\'q\');\n  let timer = 0, lastCtrl = null;\n\n  async function searchNow(term) {\n    lastCtrl?.abort(); lastCtrl = new AbortController();\n    const res = await fetch(`/api/search?q=${encodeURIComponent(term)}`, { signal: lastCtrl.signal });\n    if (!res.ok) return;\n    const data = await res.json();\n    dispatchEvent(new CustomEvent("echi:search", { detail: { data, term } }));\n\n    // URL \u540C\u671F\uFF08?q=\uFF09\n    const url = new URL(location.href);\n    if (term) url.searchParams.set("q", term); else url.searchParams.delete("q");\n    history.replaceState({}, "", url);\n  }\n\n  q?.addEventListener("input", () => {\n    clearTimeout(timer);\n    timer = window.setTimeout(() => searchNow(q.value.trim()), 250);\n  });\n\n  // \u521D\u671F\u5024\uFF08?q=\uFF09\u3067\u5FA9\u5143\n  const init = new URL(location.href).searchParams.get("q");\n  if (init) { q.value = init; searchNow(init); }\n<\/script>'], ["", '<input id="q" name="q" placeholder="\u691C\u7D22\uFF08\u30BF\u30A4\u30C8\u30EB\u30FBURL\uFF09" class="w-72 max-w-full rounded-md bg-[#181a22] border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-fuchsia-600 text-sm"> <script>\n  const q = document.getElementById(\'q\');\n  let timer = 0, lastCtrl = null;\n\n  async function searchNow(term) {\n    lastCtrl?.abort(); lastCtrl = new AbortController();\n    const res = await fetch(\\`/api/search?q=\\${encodeURIComponent(term)}\\`, { signal: lastCtrl.signal });\n    if (!res.ok) return;\n    const data = await res.json();\n    dispatchEvent(new CustomEvent("echi:search", { detail: { data, term } }));\n\n    // URL \u540C\u671F\uFF08?q=\uFF09\n    const url = new URL(location.href);\n    if (term) url.searchParams.set("q", term); else url.searchParams.delete("q");\n    history.replaceState({}, "", url);\n  }\n\n  q?.addEventListener("input", () => {\n    clearTimeout(timer);\n    timer = window.setTimeout(() => searchNow(q.value.trim()), 250);\n  });\n\n  // \u521D\u671F\u5024\uFF08?q=\uFF09\u3067\u5FA9\u5143\n  const init = new URL(location.href).searchParams.get("q");\n  if (init) { q.value = init; searchNow(init); }\n<\/script>'])), maybeRenderHead());
}, "/Users/shiono/Desktop/\u500B\u4EBA\u5236\u4F5C/echi.link/src/components/SearchBox.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(raw || cooked.slice()) }));
var _a$1;
const $$DetailModal = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", `<dialog id="detail-dialog" class="dlg"> <article class="p-5 space-y-3"> <header class="flex items-center justify-between"> <h3 id="detail-title" class="text-base font-semibold">Loading\u2026</h3> <button type="button" id="detail-close" class="text-gray-400 hover:text-gray-200">\u2715</button> </header> <p id="detail-url" class="text-sm text-gray-400 break-all"></p> <div class="flex gap-2"> <a id="detail-open" class="px-3 py-1 rounded-md bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-sm" target="_blank" rel="noopener">\u958B\u304F</a> <span id="detail-meta" class="text-xs text-gray-500 self-center"></span> </div> </article> </dialog> <script>
  const dlg = document.getElementById('detail-dialog');
  const btnClose = document.getElementById('detail-close');
  const elTitle = document.getElementById('detail-title');
  const elUrl = document.getElementById('detail-url');
  const elOpen = document.getElementById('detail-open');
  const elMeta = document.getElementById('detail-meta');

  let abort = null;

  async function openDetail(id) {
    abort?.abort(); abort = new AbortController();

    elTitle.textContent = "Loading\u2026";
    elUrl.textContent = "";
    elOpen.setAttribute("href", "#");
    elMeta.textContent = "";

    dlg.showModal(); requestAnimationFrame(()=>dlg.classList.add('dlg--open'));
    history.pushState({ v: id }, "", \`?v=\${id}\`);

    try {
      const res = await fetch(\`/api/link/\${id}\`, { signal: abort.signal });
      if (!res.ok) throw new Error("not found");
      const d = await res.json();
      elTitle.textContent = d.title;
      elUrl.textContent = d.url;
      elOpen.setAttribute("href", d.url);
      elMeta.textContent = \`ID: \${d.id} / \u30AF\u30EA\u30C3\u30AF: \${d.clicks}\`;
    } catch {}
  }

  function closeDetail() {
    dlg.classList.remove('dlg--open');
    dlg.addEventListener('transitionend', () => dlg.close(), { once: true });
    const url = new URL(location.href); url.searchParams.delete("v"); history.pushState({}, "", url);
  }

  addEventListener("click", (e) => {
    const t = e.target;
    if (!(t instanceof Element)) return;
    const btn = t.closest(".js-open-detail");
    if (!btn) return;
    const id = Number(btn.getAttribute("data-id"));
    if (!Number.isFinite(id)) return;
    e.preventDefault();
    openDetail(id);
  });

  btnClose?.addEventListener("click", closeDetail);
  dlg?.addEventListener("cancel", (e)=>{ e.preventDefault(); closeDetail(); });

  // \u76F4\u30EA\u30F3\u30AF\u5BFE\u5FDC (?v=ID \u3067\u958B\u304F)
  const initV = new URL(location.href).searchParams.get("v");
  if (initV) openDetail(Number(initV));

  // \u623B\u308B/\u9032\u3080\u5BFE\u5FDC
  addEventListener("popstate", () => {
    const v = new URL(location.href).searchParams.get("v");
    if (v) openDetail(Number(v)); else if (dlg.open) closeDetail();
  });
<\/script>`], ["", `<dialog id="detail-dialog" class="dlg"> <article class="p-5 space-y-3"> <header class="flex items-center justify-between"> <h3 id="detail-title" class="text-base font-semibold">Loading\u2026</h3> <button type="button" id="detail-close" class="text-gray-400 hover:text-gray-200">\u2715</button> </header> <p id="detail-url" class="text-sm text-gray-400 break-all"></p> <div class="flex gap-2"> <a id="detail-open" class="px-3 py-1 rounded-md bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-sm" target="_blank" rel="noopener">\u958B\u304F</a> <span id="detail-meta" class="text-xs text-gray-500 self-center"></span> </div> </article> </dialog> <script>
  const dlg = document.getElementById('detail-dialog');
  const btnClose = document.getElementById('detail-close');
  const elTitle = document.getElementById('detail-title');
  const elUrl = document.getElementById('detail-url');
  const elOpen = document.getElementById('detail-open');
  const elMeta = document.getElementById('detail-meta');

  let abort = null;

  async function openDetail(id) {
    abort?.abort(); abort = new AbortController();

    elTitle.textContent = "Loading\u2026";
    elUrl.textContent = "";
    elOpen.setAttribute("href", "#");
    elMeta.textContent = "";

    dlg.showModal(); requestAnimationFrame(()=>dlg.classList.add('dlg--open'));
    history.pushState({ v: id }, "", \\\`?v=\\\${id}\\\`);

    try {
      const res = await fetch(\\\`/api/link/\\\${id}\\\`, { signal: abort.signal });
      if (!res.ok) throw new Error("not found");
      const d = await res.json();
      elTitle.textContent = d.title;
      elUrl.textContent = d.url;
      elOpen.setAttribute("href", d.url);
      elMeta.textContent = \\\`ID: \\\${d.id} / \u30AF\u30EA\u30C3\u30AF: \\\${d.clicks}\\\`;
    } catch {}
  }

  function closeDetail() {
    dlg.classList.remove('dlg--open');
    dlg.addEventListener('transitionend', () => dlg.close(), { once: true });
    const url = new URL(location.href); url.searchParams.delete("v"); history.pushState({}, "", url);
  }

  addEventListener("click", (e) => {
    const t = e.target;
    if (!(t instanceof Element)) return;
    const btn = t.closest(".js-open-detail");
    if (!btn) return;
    const id = Number(btn.getAttribute("data-id"));
    if (!Number.isFinite(id)) return;
    e.preventDefault();
    openDetail(id);
  });

  btnClose?.addEventListener("click", closeDetail);
  dlg?.addEventListener("cancel", (e)=>{ e.preventDefault(); closeDetail(); });

  // \u76F4\u30EA\u30F3\u30AF\u5BFE\u5FDC (?v=ID \u3067\u958B\u304F)
  const initV = new URL(location.href).searchParams.get("v");
  if (initV) openDetail(Number(initV));

  // \u623B\u308B/\u9032\u3080\u5BFE\u5FDC
  addEventListener("popstate", () => {
    const v = new URL(location.href).searchParams.get("v");
    if (v) openDetail(Number(v)); else if (dlg.open) closeDetail();
  });
<\/script>`])), maybeRenderHead());
}, "/Users/shiono/Desktop/\u500B\u4EBA\u5236\u4F5C/echi.link/src/components/DetailModal.astro", void 0);

const $$Astro$1 = createAstro();
const $$LinkCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$LinkCard;
  const { id, title, url, clicks } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<article class="rounded-xl p-4 bg-[#12131a]
         ring-1 ring-white/10 ring-offset-1 ring-offset-[#12131a]
         hover:ring-fuchsia-600/80 hover:ring-2
         transition duration-200"> <div class="flex items-center justify-between gap-2"> <h3 class="text-sm font-medium truncate">${title}</h3> <div class="flex gap-2"> <a href="#" class="js-open-detail text-xs px-2 py-1 rounded-md bg-white/10 hover:bg-white/20"${addAttribute(id, "data-id")}>詳細</a> <a${addAttribute(url, "href")} target="_blank" rel="noopener" class="bg-fuchsia-600 hover:bg-fuchsia-500 text-white px-3 py-1 rounded-md text-xs">開く</a> </div> </div> <p class="text-[11px] text-gray-400 break-all mt-1">${url}</p> <p class="text-[11px] text-gray-500 mt-1">アクセス: ${clicks}</p> </article>`;
}, "/Users/shiono/Desktop/\u500B\u4EBA\u5236\u4F5C/echi.link/src/components/LinkCard.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
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
  return renderTemplate(_a || (_a = __template(['<html lang="ja"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Echi.link</title>', '</head> <body class="bg-black text-gray-100 min-h-screen"> ', ' <main class="max-w-6xl mx-auto px-4 py-8 space-y-6"> <div class="flex items-center justify-between gap-3"> <h2 class="text-lg font-semibold">\u6700\u65B0\u306E\u30EA\u30F3\u30AF</h2> ', ' </div> <div id="grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"> ', " </div> </main> ", ' <script>\n      const grid = document.getElementById(\'grid\');\n      addEventListener("echi:search", (e) => {\n        const { data, term } = e.detail;\n        if (!grid) return;\n        if (!data?.length) {\n          grid.innerHTML = `<p class="text-gray-400 text-sm col-span-full">"${term}" \u306B\u4E00\u81F4\u3059\u308B\u7D50\u679C\u306F\u3042\u308A\u307E\u305B\u3093\u3002</p>`;\n          return;\n        }\n        grid.innerHTML = data.map(d => `\n          <article\n            class="rounded-xl p-4 bg-[#12131a]\n                  ring-1 ring-white/10 ring-offset-1 ring-offset-[#12131a]\n                  hover:ring-fuchsia-600/80 hover:ring-2\n                  transition duration-200">\n            <div class="flex items-center justify-between gap-2">\n              <h3 class="text-sm font-medium truncate">${d.title}</h3>\n              <div class="flex gap-2">\n                <a href="#" class="js-open-detail text-xs px-2 py-1 rounded-md bg-white/10 hover:bg-white/20" data-id="${d.id}">\u8A73\u7D30</a>\n                <a href="${d.url}" target="_blank" rel="noopener"\n                  class="bg-fuchsia-600 hover:bg-fuchsia-500 text-white px-3 py-1 rounded-md text-xs">\u958B\u304F</a>\n              </div>\n            </div>\n            <p class="text-[11px] text-gray-400 break-all mt-1">${d.url}</p>\n            <p class="text-[11px] text-gray-500 mt-1">\u30A2\u30AF\u30BB\u30B9: ${d.clicks ?? 0}</p>\n          </article>\n        `).join("");\n      });\n    <\/script> </body> </html>'], ['<html lang="ja"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Echi.link</title>', '</head> <body class="bg-black text-gray-100 min-h-screen"> ', ' <main class="max-w-6xl mx-auto px-4 py-8 space-y-6"> <div class="flex items-center justify-between gap-3"> <h2 class="text-lg font-semibold">\u6700\u65B0\u306E\u30EA\u30F3\u30AF</h2> ', ' </div> <div id="grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"> ', " </div> </main> ", ' <script>\n      const grid = document.getElementById(\'grid\');\n      addEventListener("echi:search", (e) => {\n        const { data, term } = e.detail;\n        if (!grid) return;\n        if (!data?.length) {\n          grid.innerHTML = \\`<p class="text-gray-400 text-sm col-span-full">"\\${term}" \u306B\u4E00\u81F4\u3059\u308B\u7D50\u679C\u306F\u3042\u308A\u307E\u305B\u3093\u3002</p>\\`;\n          return;\n        }\n        grid.innerHTML = data.map(d => \\`\n          <article\n            class="rounded-xl p-4 bg-[#12131a]\n                  ring-1 ring-white/10 ring-offset-1 ring-offset-[#12131a]\n                  hover:ring-fuchsia-600/80 hover:ring-2\n                  transition duration-200">\n            <div class="flex items-center justify-between gap-2">\n              <h3 class="text-sm font-medium truncate">\\${d.title}</h3>\n              <div class="flex gap-2">\n                <a href="#" class="js-open-detail text-xs px-2 py-1 rounded-md bg-white/10 hover:bg-white/20" data-id="\\${d.id}">\u8A73\u7D30</a>\n                <a href="\\${d.url}" target="_blank" rel="noopener"\n                  class="bg-fuchsia-600 hover:bg-fuchsia-500 text-white px-3 py-1 rounded-md text-xs">\u958B\u304F</a>\n              </div>\n            </div>\n            <p class="text-[11px] text-gray-400 break-all mt-1">\\${d.url}</p>\n            <p class="text-[11px] text-gray-500 mt-1">\u30A2\u30AF\u30BB\u30B9: \\${d.clicks ?? 0}</p>\n          </article>\n        \\`).join("");\n      });\n    <\/script> </body> </html>'])), renderHead(), renderComponent($$result, "Header", $$Header, {}), renderComponent($$result, "SearchBox", $$SearchBox, {}), latest.map((item) => renderTemplate`${renderComponent($$result, "LinkCard", $$LinkCard, { ...item })}`), renderComponent($$result, "DetailModal", $$DetailModal, {}));
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
