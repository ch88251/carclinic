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

      // Verify response is an array of vehicles
      expect(response.body).to.be.an('array');
      if (response.body.length > 0) {
        expect(response.body[0]).to.have.property('id');
        expect(response.body[0]).to.have.property('vin');
      }
    });
  });

  it('should use custom command to get vehicles', { tags: '@api' }, () => {
    cy.getVehicles().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });

  it('should create a new vehicle via API', { tags: ['@api', '@write'] }, () => {
    const timestamp = Date.now();
    const newVehicle = {
      make: 'Tesla',
      model: 'Model 3',
      year: 2023,
      vin: `5YJ3E1EA1KF${timestamp.toString().slice(-6)}`,
      color: 'White',
      mileage: 15000,
      lastServiceDate: '2024-12-01',
      nextServiceDate: '2025-06-01',
      ownerId: 1,
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
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('make', newVehicle.make);
      expect(response.body).to.have.property('model', newVehicle.model);
      expect(response.body).to.have.property('year', newVehicle.year);

      // Store the vehicle ID for cleanup
      const vehicleId = response.body.id;

      // Optional: Clean up by deleting the created vehicle
      cy.request({
        method: 'DELETE',
        url: `${apiUrl}/api/vehicles/${vehicleId}`,
      }).then((deleteResponse) => {
        expect(deleteResponse.status).to.be.oneOf([200, 204]);
      });
    });
  });

  it('should update a vehicle via API', { tags: ['@api', '@write'] }, () => {
    // First, create a vehicle to update
    const timestamp = Date.now();
    const vehicleToCreate = {
      make: 'BMW',
      model: 'X5',
      year: 2022,
      vin: `WBAJA7C52KW${timestamp.toString().slice(-6)}`,
      color: 'Black',
      mileage: 25000,
      lastServiceDate: '2024-11-15',
      nextServiceDate: '2025-05-15',
      ownerId: 1,
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

      const vehicleId = createResponse.body.id;
      const updatedVehicle = {
        ...vehicleToCreate,
        color: 'Blue', // Update the color
      };

      // Update the vehicle
      cy.request({
        method: 'PUT',
        url: `${apiUrl}/api/vehicles/${vehicleId}`,
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
          url: `${apiUrl}/api/vehicles/${vehicleId}`,
        });
      });
    });
  });

  it('should delete a vehicle via API', { tags: ['@api', '@write'] }, () => {
    // First, create a vehicle to delete
    const timestamp = Date.now();
    const vehicleToDelete = {
      make: 'Audi',
      model: 'A4',
      year: 2021,
      vin: `WAUZZZ8K5DA${timestamp.toString().slice(-6)}`,
      color: 'Silver',
      mileage: 30000,
      lastServiceDate: '2024-10-20',
      nextServiceDate: '2025-04-20',
      ownerId: 1,
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

      const vehicleId = createResponse.body.id;

      // Delete the vehicle
      cy.request({
        method: 'DELETE',
        url: `${apiUrl}/api/vehicles/${vehicleId}`,
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

