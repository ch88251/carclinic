import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import keycloak, { initializeKeycloak } from './keycloak';

export const AuthContext = createContext(null);

const buildUser = (tokenParsed) => {
  if (!tokenParsed) {
    return null;
  }

  const displayName = tokenParsed.name
    || [tokenParsed.given_name, tokenParsed.family_name].filter(Boolean).join(' ').trim()
    || tokenParsed.preferred_username
    || tokenParsed.email
    || null;

  if (!displayName) {
    return null;
  }

  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

  return {
    name: displayName,
    initials,
  };
};

function KeycloakProvider({ children }) {
  const [initialized, setInitialized] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const syncAuthState = useCallback(() => {
    setAuthenticated(Boolean(keycloak.authenticated));
    setUser(buildUser(keycloak.tokenParsed));
  }, []);

  useEffect(() => {
    let mounted = true;

    keycloak.onAuthSuccess = () => {
      if (mounted) {
        syncAuthState();
      }
    };

    keycloak.onAuthLogout = () => {
      if (mounted) {
        setAuthenticated(false);
        setUser(null);
      }
    };

    keycloak.onTokenExpired = async () => {
      try {
        await keycloak.updateToken(30);
        if (mounted) {
          syncAuthState();
        }
      } catch (error) {
        keycloak.clearToken();
        if (mounted) {
          setAuthenticated(false);
          setUser(null);
        }
      }
    };

    initializeKeycloak()
      .then((isAuthenticated) => {
        if (!mounted) {
          return;
        }

        setAuthenticated(isAuthenticated);
        setUser(buildUser(keycloak.tokenParsed));
      })
      .catch(() => {
        if (mounted) {
          setAuthenticated(false);
          setUser(null);
        }
      })
      .finally(() => {
        if (mounted) {
          setInitialized(true);
        }
      });

    return () => {
      mounted = false;
      keycloak.onAuthSuccess = undefined;
      keycloak.onAuthLogout = undefined;
      keycloak.onTokenExpired = undefined;
    };
  }, [syncAuthState]);

  const login = useCallback(() => keycloak.login({ redirectUri: window.location.href }), []);
  const logout = useCallback(() => keycloak.logout({ redirectUri: window.location.origin }), []);

  const value = useMemo(() => ({
    keycloak,
    initialized,
    authenticated,
    user,
    login,
    logout,
  }), [authenticated, initialized, login, logout, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default KeycloakProvider;
