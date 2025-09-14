import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  test: {
    include: ['**/*.test.tsx'],
    globals: true,   
    environment: "jsdom", 
    setupFiles: ["./src/setupTests.js"],
    server: {
      deps: {
        inline: ["@mui/x-data-grid"],
      },
    },
  }
})