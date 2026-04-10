/// <reference types='vitest' />
import { defineConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(() => ({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/apps/feedback-widget',
  server: {
    port: 4200,
    host: 'localhost',
  },
  preview: {
    port: 4300,
    host: 'localhost',
  },
  plugins: [
    tailwindcss(),
    !process.env.VITEST && reactRouter(),
    {
      name: 'ignore-well-known',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url?.startsWith('/.well-known/')) {
            res.writeHead(204).end();
            return;
          }
          next();
        });
      },
    },
  ],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [],
  // },
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['app/**/*.spec.{ts,tsx}', 'tests/**/*.spec.{ts,tsx}'],
    setupFiles: ['./vitest.setup.ts'],
    typecheck: { tsconfig: './tsconfig.spec.json' },
  },
}));
