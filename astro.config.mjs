import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Replace this with the final domain before publishing.
export default defineConfig({
  site: "https://forthmarksystems.com",
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes("/demos/") &&
        !page.includes("/thank-you") &&
        !page.includes("/404"),
    }),
  ],
  compressHTML: true,
});
