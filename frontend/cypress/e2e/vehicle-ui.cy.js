/// <reference types="cypress" />

describe('Vehicle Management UI', () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit('/');
  });

  it('should display the Car Clinic title', () => {
    cy.contains('Car Clinic').should('be.visible');
  });

  it('should display the Hero section', () => {
    cy.get('.hero').should('be.visible');
    cy.contains('Welcome to Car Clinic').should('be.visible');
    cy.contains('Manage vehicles, appointments, and service records all in one place.').should('be.visible');
  });

  it('should display the Quick Access section', () => {
    cy.get('.quick-access').should('be.visible');
    cy.contains('Quick Access').should('be.visible');
    cy.contains('Vehicles').should('be.visible');
    cy.contains('Appointments').should('be.visible');
    cy.contains('Services').should('be.visible');
    cy.contains('Staff').should('be.visible');
  });

  it('should display the menu links in the Navbar', () => {
    cy.get('.navbar').should('be.visible');
    cy.contains('Vehicles').should('be.visible');
    cy.contains('Appointments').should('be.visible');
    cy.contains('Services').should('be.visible');
    cy.contains('Staff').should('be.visible');
  });

  it('should display the Footer with current year', () => {
    const currentYear = new Date().getFullYear();
    cy.get('.footer').should('be.visible');
    cy.contains(`© ${currentYear} Car Clinic. All rights reserved.`).should('be.visible');
  });
});
