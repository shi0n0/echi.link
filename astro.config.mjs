import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  output: "server",
  adapter: cloudflare(),
  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
    plugins: [tailwindcss()],
  },
  integrations: [],
});
