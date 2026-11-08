import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// Chapters are synced (scripts/sync-content.mjs) into chapters/part-1,
// chapters/part-2, chapters/part-3 subdirectories purely so this sidebar can
// autogenerate one group per Part. sidebar.order in the synced frontmatter
// is a single counter across all three groups, so Previous/Next still flows
// CH01 -> CH15 straight across Part boundaries.
const chapterSidebar = [
  {
    label: "Part I — Pricing Strategy",
    translations: { ko: "Part I — 가격전략" },
    autogenerate: { directory: "chapters/part-1" },
  },
  {
    label: "Part II — Feasibility Bridge",
    translations: { ko: "Part II — 사업타당성 연결" },
    autogenerate: { directory: "chapters/part-2" },
  },
  {
    label: "Part III — Pricing Harness",
    translations: { ko: "Part III — Pricing Harness" },
    autogenerate: { directory: "chapters/part-3" },
  },
];

export default defineConfig({
  site: "https://victory3217-bot.github.io",
  base: "/pricing-handbook/",
  integrations: [
    starlight({
      title: "Pricing Strategy Handbook",
      components: { Banner: "./src/components/HandbookBanner.astro" },
      customCss: ["./src/styles/custom.css"],
      defaultLocale: "en",
      locales: {
        ko: { label: "한국어", lang: "ko" },
        en: { label: "English", lang: "en" },
      },
      sidebar: [
        ...chapterSidebar,
        {
          label: "Worksheet Writer",
          translations: { ko: "워크시트 작성기" },
          link: "/worksheet/",
        },
      ],
    }),
  ],
});
