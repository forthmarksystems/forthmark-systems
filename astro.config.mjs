import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Replace this with the final domain before publishing.
export default defineConfig({
  site: "https://forthmarksystems.com",
  integrations: [sitemap()],
  compressHTML: true,
});
