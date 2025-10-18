// <define:__ROUTES__>
var define_ROUTES_default = {
  version: 1,
  include: [
    "/*"
  ],
  exclude: [
    "/_astro/*",
    "/favicon.svg"
  ]
};

// node_modules/wrangler/templates/pages-dev-pipeline.ts
import worker from "/Users/shiono/Desktop/\u500B\u4EBA\u5236\u4F5C/echi.link/.wrangler/tmp/pages-U4jKs3/bundledWorker-0.8738840475700149.mjs";
import { isRoutingRuleMatch } from "/Users/shiono/Desktop/\u500B\u4EBA\u5236\u4F5C/echi.link/node_modules/wrangler/templates/pages-dev-util.ts";
export * from "/Users/shiono/Desktop/\u500B\u4EBA\u5236\u4F5C/echi.link/.wrangler/tmp/pages-U4jKs3/bundledWorker-0.8738840475700149.mjs";
var routes = define_ROUTES_default;
var pages_dev_pipeline_default = {
  fetch(request, env, context) {
    const { pathname } = new URL(request.url);
    for (const exclude of routes.exclude) {
      if (isRoutingRuleMatch(pathname, exclude)) {
        return env.ASSETS.fetch(request);
      }
    }
    for (const include of routes.include) {
      if (isRoutingRuleMatch(pathname, include)) {
        const workerAsHandler = worker;
        if (workerAsHandler.fetch === void 0) {
          throw new TypeError("Entry point missing `fetch` handler");
        }
        return workerAsHandler.fetch(request, env, context);
      }
    }
    return env.ASSETS.fetch(request);
  }
};
export {
  pages_dev_pipeline_default as default
};
//# sourceMappingURL=350t6117oj5.js.map
