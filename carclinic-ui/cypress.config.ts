import { defineConfig } from 'cypress';
import cypressGrep from '@cypress/grep/plugin';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      cypressGrep(config);
      return config;
    },
  },
  env: {
    apiUrl: 'http://localhost:8080',
  },
  video: false,
  screenshotOnRunFailure: true,
  viewportWidth: 1280,
  viewportHeight: 720,
});
