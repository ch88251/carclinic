# Car Clinic UI

A React + TypeScript + Vite application for managing vehicles in the Car Clinic system.

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Material-UI (MUI)** - Component library
- **TanStack Query** - Data fetching and state management
- **Axios** - HTTP client
- **Vitest** - Unit testing
- **Cypress** - E2E and API testing

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Testing

### Unit Tests (Vitest)

Run unit tests:

```bash
npm test
```

### E2E and API Tests (Cypress)

This project includes Cypress for both UI and API testing.

**First time setup:**

```bash
npx cypress install
```

**Run Cypress tests:**

```bash
# Open Cypress Test Runner (interactive)
npm run cypress:open

# Run all tests headlessly
npm run cypress:run

# Run only UI tests
npm run cypress:run:ui

# Run only API tests
npm run cypress:run:api

# Run smoke tests
npm run cypress:run:smoke
```

For detailed Cypress documentation, see [CYPRESS.md](./CYPRESS.md)

## Linting

Run ESLint:

```bash
npm run lint
```

## Project Structure

```
src/
├── api/              # API client functions
├── assets/           # Static assets
├── components/       # React components
├── types.ts          # TypeScript type definitions
├── App.tsx           # Main App component
└── main.tsx          # Application entry point

cypress/
├── e2e/              # E2E test files
├── fixtures/         # Test data
└── support/          # Cypress support files
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8080
```

---

# Original Vite Template Info

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
