import { useEffect } from 'react';
import { useAuth } from './useAuth';

function PrivateRoute({ children }) {
  const { initialized, authenticated, login } = useAuth();

  useEffect(() => {
    if (initialized && !authenticated) {
      login();
    }
  }, [authenticated, initialized, login]);

  if (!initialized) {
    return null;
  }

  if (!authenticated) {
    return <p>Redirecting to login...</p>;
  }

  return children;
}

export default PrivateRoute;
