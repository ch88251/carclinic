// ***********************************************
// This file is used to create custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Define custom command type for TypeScript
/// <reference types="cypress" />

interface VehicleResponse {
  vin: string;
  make: string;
  model: string;
  color: string;
  year: number;
  mileage: number;
  lastServiceDate: string;
  nextServiceDate: string;
  _links: {
    self: { href: string };
    vehicle: { href: string };
    owner: { href: string };
  };
}

interface VehiclesApiResponse {
  _embedded: {
    vehicles: VehicleResponse[];
  };
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to get vehicle data from API
       * @example cy.getVehicles()
       */
      getVehicles(): Chainable<Response<VehiclesApiResponse>>;
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
