/// <reference types="cypress" />

describe('Vehicle API Tests', () => {
  const apiUrl = Cypress.env('apiUrl');

  it('should get all vehicles from API', { tags: '@api' }, () => {
    cy.request({
      method: 'GET',
      url: `${apiUrl}/api/vehicles`,
    }).then((response) => {
      // Verify response status
      expect(response.status).to.eq(200);

      // Verify response has the expected structure
      expect(response.body).to.have.property('_embedded');
      expect(response.body._embedded).to.have.property('vehicles');
      expect(response.body._embedded.vehicles).to.be.an('array');
    });
  });

  it('should use custom command to get vehicles', { tags: '@api' }, () => {
    cy.getVehicles().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('_embedded');
    });
  });

  it('should create a new vehicle via API', { tags: ['@api', '@write'] }, () => {
    const newVehicle = {
      make: 'Tesla',
      model: 'Model 3',
      year: 2023,
      vin: '5YJ3E1EA1KF000001',
      licensePlate: 'TESLA3',
      color: 'White',
    };

    cy.request({
      method: 'POST',
      url: `${apiUrl}/api/vehicles`,
      body: newVehicle,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      // Verify response status
      expect(response.status).to.eq(201);

      // Verify response contains the created vehicle
      expect(response.body).to.have.property('make', newVehicle.make);
      expect(response.body).to.have.property('model', newVehicle.model);
      expect(response.body).to.have.property('year', newVehicle.year);
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('_links');

      // Store the vehicle URL for cleanup
      const vehicleUrl = response.body._links.self.href;

      // Optional: Clean up by deleting the created vehicle
      cy.request({
        method: 'DELETE',
        url: vehicleUrl,
      }).then((deleteResponse) => {
        expect(deleteResponse.status).to.be.oneOf([200, 204]);
      });
    });
  });

  it('should update a vehicle via API', { tags: ['@api', '@write'] }, () => {
    // First, create a vehicle to update
    const vehicleToCreate = {
      make: 'BMW',
      model: 'X5',
      year: 2022,
      vin: 'WBAJA7C52KWL00001',
      licensePlate: 'BMW555',
      color: 'Black',
    };

    cy.request({
      method: 'POST',
      url: `${apiUrl}/api/vehicles`,
      body: vehicleToCreate,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((createResponse) => {
      expect(createResponse.status).to.eq(201);

      const vehicleUrl = createResponse.body._links.self.href;
      const updatedVehicle = {
        ...vehicleToCreate,
        color: 'Blue', // Update the color
      };

      // Update the vehicle
      cy.request({
        method: 'PUT',
        url: vehicleUrl,
        body: updatedVehicle,
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((updateResponse) => {
        expect(updateResponse.status).to.eq(200);
        expect(updateResponse.body).to.have.property('color', 'Blue');

        // Clean up
        cy.request({
          method: 'DELETE',
          url: vehicleUrl,
        });
      });
    });
  });

  it('should delete a vehicle via API', { tags: ['@api', '@write'] }, () => {
    // First, create a vehicle to delete
    const vehicleToDelete = {
      make: 'Audi',
      model: 'A4',
      year: 2021,
      vin: 'WAUZZZ8K5DA000001',
      licensePlate: 'AUDI44',
      color: 'Silver',
    };

    cy.request({
      method: 'POST',
      url: `${apiUrl}/api/vehicles`,
      body: vehicleToDelete,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((createResponse) => {
      expect(createResponse.status).to.eq(201);

      const vehicleUrl = createResponse.body._links.self.href;

      // Delete the vehicle
      cy.request({
        method: 'DELETE',
        url: vehicleUrl,
      }).then((deleteResponse) => {
        expect(deleteResponse.status).to.be.oneOf([200, 204]);
      });
    });
  });

  it('should handle API errors gracefully', { tags: '@api' }, () => {
    // Try to get a non-existent vehicle
    cy.request({
      method: 'GET',
      url: `${apiUrl}/api/vehicles/99999`,
      failOnStatusCode: false, // Don't fail the test on 4xx/5xx
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
});
