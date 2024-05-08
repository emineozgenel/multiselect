import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: '/src/components',
      hooks: '/src/hooks',
      types: '/src/types',
      config: '/src/config',
      icons: '/src/icons',
    },
  },
});
