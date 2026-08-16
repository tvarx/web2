import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
build: {
      // Defer the lazy sports chunks: without this, Vite eagerly modulepreloads
      // dynamically-imported chunks in the entry HTML, which would download the
      // multi-MB heavy data on every page load.
      modulePreload: {
        polyfill: true,
        resolveDependencies: (filename, deps) =>
          deps.filter(
            (d) => !d.includes('sports-pages') && !d.includes('sports-heavy')
          ),
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('scheduler')) return 'vendor-react';
              if (id.includes('motion') || id.includes('framer')) return 'vendor-motion';
              if (id.includes('lucide')) return 'vendor-icons';
              return 'vendor';
            }
            if (id.includes('generated/sports-menu')) return 'sports-menu';
            if (id.includes('generated/exercises-details')) return 'sports-heavy';
            if (id.includes('generated/sports-data')) return 'sports-heavy';
            if (id.includes('generated/exercises-index')) return 'sports-index';
            if (id.includes('src/sports/pages') || id.includes('src/sports/data.ts') || id.includes('src/sports/details.ts')) return 'sports-pages';
            if (id.includes('src/sports')) return 'sports';
            return undefined;
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

