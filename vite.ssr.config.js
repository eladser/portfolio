// Separate build that compiles the writing posts for Node, so scripts/prerender.mjs can
// render them to static HTML. Output is temporary — prerender.mjs deletes .ssr when done.
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    ssr: 'src/prerender/writing-entry.jsx',
    outDir: '.ssr',
    copyPublicDir: false,
    emptyOutDir: true,
    minify: false,
    sourcemap: false,
    reportCompressedSize: false,
  },
});
