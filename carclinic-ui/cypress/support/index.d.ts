/// <reference types="cypress" />

declare namespace Cypress {
  interface TestConfigOverrides {
    /**
     * Test tags for filtering with @cypress/grep
     */
    tags?: string | string[];
  }
}
