import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import '../styles/Auth.css';

export default function Login() {
  const [uname, setUname] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await loginUser({ uname, password });
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error', err);
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Sign In</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label className="auth-label" htmlFor="login-uname">
              Username
            </label>
            <input
              id="login-uname"
              className="auth-input"
              type="text"
              value={uname}
              onChange={(e) => setUname(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="login-password">
              Password
            </label>
            <input
              id="login-password"
              className="auth-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          {error && <div className="auth-error">{error}</div>}
        </form>

        <div className="auth-footer">
          New here? <Link to="/register">Create an account</Link>
        </div>
      </div>
    </div>
  );
}

