import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/App/App.jsx';
import KeycloakProvider from './auth/KeycloakProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <KeycloakProvider>
      <App />
    </KeycloakProvider>
  </StrictMode>,
);
