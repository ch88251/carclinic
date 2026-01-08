// ***********************************************
// This file is used to create custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Define custom command type for TypeScript
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to get vehicle data from API
       * @example cy.getVehicles()
       */
      getVehicles(): Chainable<any>;
    }
  }
}

// Example custom command for API calls
Cypress.Commands.add('getVehicles', () => {
  return cy.request({
    method: 'GET',
    url: `${Cypress.env('apiUrl')}/api/vehicles`,
  });
});

export {};
