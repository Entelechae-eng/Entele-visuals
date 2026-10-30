import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    minify: 'esbuild',
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-icons': ['lucide-react'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: false,
    proxy: {
      '/api/templens': {
        target: 'https://templens.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/templens/, '/api'),
        headers: {
          'Origin': 'https://templens.com',
          'Referer': 'https://templens.com/',
        },
      },
    },
  },
  preview: {
    port: 3000,
    proxy: {
      '/api/templens': {
        target: 'https://templens.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/templens/, '/api'),
        headers: {
          'Origin': 'https://templens.com',
          'Referer': 'https://templens.com/',
        },
      },
    },
  },
});
