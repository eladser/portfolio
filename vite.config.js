import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'esbuild',
    cssMinify: true,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 600,
    esbuild: {
      drop: ['console', 'debugger'],
      legalComments: 'none'
    },
    rollupOptions: {
      output: {
        // No manual chunks — let Vite handle automatic code-splitting based on the
        // import graph. Lazy-loaded CareerHero3D already gives us the mobile-perf win
        // (mobile skips the 3D bundle entirely via useEnable3D + React.lazy).
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    host: true
  },
  preview: {
    port: 4173,
    host: true
  }
});