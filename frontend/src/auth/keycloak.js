import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
});

let initPromise;

export const initializeKeycloak = async () => {
  if (!initPromise) {
    initPromise = keycloak.init({
      onLoad: 'check-sso',
      pkceMethod: 'S256',
      checkLoginIframe: false,
    }).catch((error) => {
      initPromise = undefined;
      throw error;
    });
  }

  return initPromise;
};

export const getAccessToken = async () => {
  if (!keycloak.authenticated) {
    return null;
  }

  try {
    await keycloak.updateToken(30);
    return keycloak.token ?? null;
  } catch (error) {
    keycloak.clearToken();
    return null;
  }
};

export default keycloak;
