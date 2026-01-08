# Cypress Testing Guide

This project uses Cypress for end-to-end (E2E) testing, including both UI and API tests.

## Setup

### Install Cypress Binary

After cloning the repository and running `npm install`, you need to install the Cypress binary:

```bash
npx cypress install
```

Alternatively, you can set the `CYPRESS_INSTALL_BINARY` environment variable to download the binary during npm install:

```bash
npm install
```

## Running Tests

### Interactive Mode (Cypress Test Runner)

Open the Cypress Test Runner in interactive mode to run tests with a visual interface:

```bash
npm run cypress:open
```

This will open the Cypress GUI where you can:
- Select between E2E Testing and Component Testing
- Choose a browser (Chrome, Firefox, Edge, etc.)
- Run individual test files
- See real-time test execution and debugging

### Headless Mode (CI/CD)

Run all Cypress tests in headless mode (without GUI):

```bash
npm run cypress:run
```

Or use the alias:

```bash
npm run test:e2e
```

### Run Specific Test Types

Run only UI tests:

```bash
npm run cypress:run:ui
```

Run only API tests:

```bash
npm run cypress:run:api
```

Run only smoke tests (tagged with @smoke):

```bash
npm run cypress:run:smoke
```

## Test Organization

### Folder Structure

```
cypress/
├── e2e/              # E2E test files
│   ├── vehicle-ui.cy.ts    # UI tests for vehicle management
│   └── vehicle-api.cy.ts   # API tests for vehicle endpoints
├── fixtures/         # Test data fixtures
│   ├── vehicles.json       # Sample vehicle data
│   └── new-vehicle.json    # New vehicle data
└── support/          # Support files and custom commands
    ├── commands.ts         # Custom Cypress commands
    └── e2e.ts             # E2E support file
```

### Test Types

#### UI Tests (`*-ui.cy.ts`)
- Test the user interface and user interactions
- Use intercepts to mock API responses for isolated testing
- Verify visual elements, forms, and user workflows

#### API Tests (`*-api.cy.ts`)
- Test the backend API endpoints directly
- Verify HTTP methods (GET, POST, PUT, DELETE)
- Validate response status codes and data structure
- Test error handling and edge cases

## Writing Tests

### UI Test Example

```typescript
describe('My UI Feature', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the page title', () => {
    cy.contains('Car Clinic').should('be.visible');
  });

  it('should interact with form', () => {
    // Mock API response
    cy.intercept('GET', '**/api/vehicles', { fixture: 'vehicles.json' });
    
    cy.visit('/');
    cy.get('input[name="search"]').type('Toyota');
    cy.get('button[type="submit"]').click();
  });
});
```

### API Test Example

```typescript
describe('My API Endpoint', () => {
  const apiUrl = Cypress.env('apiUrl');

  it('should get all items', () => {
    cy.request('GET', `${apiUrl}/api/vehicles`)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('_embedded');
      });
  });
});
```

### Custom Commands

Custom commands are defined in `cypress/support/commands.ts`. Use them to reduce code duplication:

```typescript
// Using a custom command
cy.getVehicles().then((response) => {
  expect(response.status).to.eq(200);
});
```

## Test Tags and Filtering

Tests can be tagged for better organization and selective execution using `@cypress/grep`:

```typescript
it('should login successfully', { tags: '@smoke' }, () => {
  // test code
});

it('should create a vehicle', { tags: ['@api', '@write'] }, () => {
  // test code
});
```

Run tests by tag:

```bash
# Run smoke tests
npm run cypress:run:smoke

# Run tests with specific tag
npx cypress run --env grepTags=@api

# Run tests with multiple tags
npx cypress run --env grepTags="@api+@write"
```

## Configuration

Cypress configuration is in `cypress.config.ts`:

- **baseUrl**: Frontend application URL (default: `http://localhost:3000`)
- **apiUrl**: Backend API URL (default: `http://localhost:8080`)
- **viewportWidth/Height**: Default browser viewport size
- **video**: Enable/disable video recording
- **screenshotOnRunFailure**: Take screenshots on test failure

### Environment Variables

You can override environment variables when running tests:

```bash
# Override API URL
npx cypress run --env apiUrl=http://api.example.com

# Override base URL
npx cypress open --config baseUrl=http://localhost:5173
```

## Best Practices

1. **Use Fixtures**: Store test data in `cypress/fixtures/` for reusability
2. **Mock API Calls**: Use `cy.intercept()` for UI tests to isolate frontend testing
3. **Custom Commands**: Create reusable commands for common operations
4. **Test Isolation**: Each test should be independent and not rely on other tests
5. **Use Data Attributes**: Add `data-cy` attributes to elements for stable selectors
6. **Clean Up**: Clean up test data in API tests to avoid database pollution
7. **Tag Tests**: Use tags to organize and filter tests (@smoke, @api, @ui, etc.)

## Troubleshooting

### Cypress binary not found
Run: `npx cypress install`

### Tests fail to connect to API
- Ensure the backend server is running on `http://localhost:8080`
- Check the `apiUrl` in `cypress.config.ts` or override with `--env apiUrl=<url>`

### Tests fail to load frontend
- Ensure the frontend dev server is running on `http://localhost:3000`
- Or build and serve with: `npm run build && npm run preview`

## CI/CD Integration

For CI/CD pipelines, run tests in headless mode:

```bash
# Start services
docker-compose up -d

# Wait for services to be ready
sleep 10

# Run Cypress tests
npm run test:e2e

# Stop services
docker-compose down
```

Example GitHub Actions workflow:

```yaml
- name: Run Cypress tests
  run: |
    npm run test:e2e
  env:
    CYPRESS_baseUrl: http://localhost:3000
    CYPRESS_apiUrl: http://localhost:8080
```

## Resources

- [Cypress Documentation](https://docs.cypress.io)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Cypress Examples](https://github.com/cypress-io/cypress-example-recipes)
