// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: [".loca.lt", ".zrok.io"],
    },
  },

  trailingSlash: "never",
  site: "https://cbrueggenolte.de",
  integrations: [sitemap()],
});
