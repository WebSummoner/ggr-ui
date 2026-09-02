import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import rehypeBaseLinks from './plugins/base-links.mjs';

// Analytics is opt-in: no GA_MEASUREMENT_ID, no tracking code.
const gaId = process.env.GA_MEASUREMENT_ID;

// No Google code in the page: /consent.js injects gtag only once the visitor accepts.
const analytics = gaId
  ? [
      { tag: 'script', content: `window.WS_GA_ID='${gaId}';` },
      { tag: 'script', attrs: { defer: true, src: '/consent.js' } },
    ]
  : [];


// Static output only: `astro build` emits a plain `dist/` folder that GitHub
// Pages (or any web server) can serve. Full-text search is Pagefind — a
// static index generated at build time under /_pagefind/. No database, no
// server runtime.
//
// llms.txt is generated after the build by scripts/generate-llms-txt.mjs
// (`npm run build` chains it) — a plain index of every page for AI assistants.
export default defineConfig({
  site: 'https://websummoner.riadvice.com',
  base: '/ggr-ui/',

  // Hand-written root-relative links in Markdown are not base-aware on their
  // own; this rewrites them so the base stays a single setting.
  markdown: {
    rehypePlugins: [[rehypeBaseLinks, { base: '/ggr-ui/' }]],
  },

  integrations: [
    starlight({
      title: 'Ggr UI',
      description:
        'A standalone daemon that collects /status information from multiple WebSummoner instances and returns it as a single /status API. Developed and maintained by RIADVICE.',
      favicon: '/img/favicon.png',
      head: [
        ...analytics,
        { tag: 'meta', attrs: { property: 'og:image', content: 'https://websummoner.riadvice.com/ggr-ui/img/og-image.jpg' } },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
        { tag: 'meta', attrs: { name: 'twitter:image', content: 'https://websummoner.riadvice.com/ggr-ui/img/og-image.jpg' } },
      ],
      customCss: ['./src/styles/custom.css'],
      social: [
        {
          icon: 'github',
          label: 'Source code',
          href: 'https://github.com/WebSummoner/ggr-ui',
        },
        {
          icon: 'seti:docker',
          label: 'Docker image',
          href: 'https://hub.docker.com/r/websummoner/ggr-ui',
        },
      ],
      sidebar: [
        {
          label: 'Getting started',
          items: [{ slug: 'quick-start' }, { slug: 'quota-reload' }],
        },
        {
          label: 'Reference',
          items: [{ slug: 'cli-flags' }],
        },
        {
          label: 'Project',
          items: [{ slug: 'contributing' }],
        },
      ],
    }),
  ],
});
