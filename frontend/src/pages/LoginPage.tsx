import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Brand from '../components/Brand';
import { login } from '../services/auth.service';
import { saveSession } from '../utils/session';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    setSubmitting(true);
    setMessage('');

    try {
      const result = await login({
        email: String(values.get('email')).trim(),
        password: String(values.get('password')),
      });
      saveSession(result, values.get('remember') === 'on');

      const requestedDestination = new URLSearchParams(location.search).get('next');
      const destination =
        requestedDestination === 'book-visit.html'
          ? '/book-visit'
          : requestedDestination && /^\/confirmation\/[0-9a-f-]+$/i.test(requestedDestination)
            ? requestedDestination
            : '/';
      navigate(destination, { replace: true });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to log in');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="split">
      <div className="art" role="img" aria-label="Digital pathway through a data city" />
      <section className="pane">
        <form className="lcard" onSubmit={handleSubmit}>
          <Brand />
          <h1>login to your account</h1>
          <p>enter your email and password to access your smart pass</p>

          <div className="field">
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3" /><path d="M3 8l9 6 9-6" /></svg>
            <input type="email" name="email" placeholder="email address" aria-label="Email address" autoComplete="username" required />
          </div>

          <div className="field">
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 018 0v3" /></svg>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="password"
              aria-label="Password"
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword((visible) => !visible)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
                <circle cx="12" cy="12" r="3" />
                <path d="M4 4l16 16" style={{ display: showPassword ? 'none' : undefined }} />
              </svg>
            </button>
          </div>

          <div className="lrow">
            <label><input type="checkbox" name="remember" /> remember me</label>
          </div>
          <button className="go" type="submit" disabled={submitting}>
            {submitting ? 'logging in...' : 'log in'}
          </button>
          {message && <p className="ok error" role="status" aria-live="polite">{message}</p>}
          <p className="reg">
            Don&apos;t have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
        <Link className="homelink" to="/">Home</Link>
      </section>
    </div>
  );
}
