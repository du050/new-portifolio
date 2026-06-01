import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import type { Plugin } from 'vite';
import { defineConfig } from 'vite';
import { PORTFOLIO_HTML_META } from '../../packages/shared/src/content/portfolio-owner';

function portfolioHtmlMetaPlugin(): Plugin {
  return {
    name: 'portfolio-html-meta',
    transformIndexHtml(html) {
      return html
        .replace(/%PORTFOLIO_HTML_TITLE%/g, PORTFOLIO_HTML_META.title)
        .replace(/%PORTFOLIO_HTML_DESCRIPTION%/g, PORTFOLIO_HTML_META.description)
        .replace(/%PORTFOLIO_HTML_OG_TITLE%/g, PORTFOLIO_HTML_META.ogTitle)
        .replace(/%PORTFOLIO_HTML_OG_DESCRIPTION%/g, PORTFOLIO_HTML_META.ogDescription);
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), portfolioHtmlMetaPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@portfolio/shared': path.resolve(__dirname, '../../packages/shared/src/index.ts'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
});
