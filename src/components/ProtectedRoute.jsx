import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { verifyUser } from '../services/authService';

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function checkAuth() {
      try {
        const data = await verifyUser();
        if (!cancelled) {
          // backend typically returns { authenticated: true, user: {...} } or similar
          const authFlag =
            data?.authenticated ??
            (data && typeof data === 'object' && 'user' in data && data.user) ??
            data;
          setIsAuthenticated(Boolean(authFlag));
        }
      } catch (err) {
        console.error('Auth check error', err);
        if (!cancelled) {
          setIsAuthenticated(false);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    checkAuth();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <p className="auth-title">Checking authentication…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

