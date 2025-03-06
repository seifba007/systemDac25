import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import ports from '../ports.config'; 
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "./src/_mantine" as *;`,
      },
    },
  },
  optimizeDeps: {
    exclude: ['chunk-HU2LKPA7'],
  },
  server: {
    port:  ports.eMaintPort , // Port controlled by the environment variable
  },
});
