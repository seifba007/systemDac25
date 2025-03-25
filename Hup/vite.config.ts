import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import ports from '../ports.config';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  css: {
    preprocessorOptions: {
      scss: {
        // Ensure the path to `_mantine` is correct
        additionalData: `@use "./src/styles/_mantine" as *;`,
      },
    },
  },
  optimizeDeps: {
    // Ensure this matches the actual dependency to exclude
    exclude: ['chunk-HU2LKPA7'],
  },
  server: {
    // Add a fallback for the port if `ports.hupPort` isn't defined
    port: ports?.hupPort || 3000,
  },
});
