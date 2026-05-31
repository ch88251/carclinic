// ***********************************************
// This file is used to create custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Example custom command for API calls
Cypress.Commands.add('getVehicles', () => {
  return cy.request({
    method: 'GET',
    url: `${Cypress.env('apiUrl')}/api/vehicles`,
  });
});
