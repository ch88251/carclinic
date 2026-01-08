/// <reference types="cypress" />

describe('Vehicle Management UI', () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit('/');
  });

  it('should display the Car Clinic title', () => {
    cy.contains('Car Clinic').should('be.visible');
  });

  it('should display the Vehicle List component', () => {
    // Wait for the vehicle list to load
    cy.get('[role="grid"]', { timeout: 10000 }).should('exist');
  });

  it('should display vehicles in the data grid', { tags: '@smoke' }, () => {
    // Intercept the API call and mock the response
    cy.fixture('vehicles.json').then((vehicles) => {
      cy.intercept('GET', '**/api/vehicles', vehicles).as('getVehicles');
    });

    cy.visit('/');

    // Wait for the API call to complete
    cy.wait('@getVehicles');

    // Check that the vehicles are displayed
    cy.contains('Toyota').should('be.visible');
    cy.contains('Camry').should('be.visible');
    cy.contains('Honda').should('be.visible');
    cy.contains('Accord').should('be.visible');
  });

  it('should allow adding a new vehicle', { tags: '@smoke' }, () => {
    // Intercept the GET request for existing vehicles
    cy.fixture('vehicles.json').then((vehicles) => {
      cy.intercept('GET', '**/api/vehicles', vehicles).as('getVehicles');
    });

    // Intercept the POST request for adding a new vehicle
    cy.fixture('new-vehicle.json').then((newVehicle) => {
      cy.intercept('POST', '**/api/vehicles', {
        statusCode: 201,
        body: {
          ...newVehicle,
          id: 3,
          _links: {
            self: { href: 'http://localhost:8080/api/vehicles/3' },
          },
        },
      }).as('addVehicle');
    });

    cy.visit('/');
    cy.wait('@getVehicles');

    // Click the Add Vehicle button (adjust selector based on your UI)
    cy.contains('button', /add/i).should('be.visible').click();

    // Note: The following selectors should be adjusted based on your actual UI
    // This is a template showing how you would fill out a form
    // cy.get('input[name="make"]').type('Ford');
    // cy.get('input[name="model"]').type('F-150');
    // cy.get('input[name="year"]').type('2021');
    // cy.get('button[type="submit"]').click();

    // cy.wait('@addVehicle');
    // cy.contains('Ford').should('be.visible');
  });
});
