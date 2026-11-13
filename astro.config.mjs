import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Temporary live address. Switch to https://forthmarksystems.com when the
// custom domain is connected, then update public/robots.txt too.
export default defineConfig({
  site: "https://forthmark-systems.netlify.app",
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
