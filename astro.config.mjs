// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: netlify(),
  site: 'https://talhabalaj.com', // Update this with your actual Netlify URL
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.9,
      lastmod: new Date(),
    })
  ],
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
});
