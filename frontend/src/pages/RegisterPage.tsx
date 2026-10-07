import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Brand from '../components/Brand';
import { register } from '../services/auth.service';
import { saveSession } from '../utils/session';

export default function RegisterPage() {
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const password = String(values.get('password'));

    setMessage('');
    if (password !== String(values.get('confirmPassword'))) {
      setMessage('Passwords do not match');
      return;
    }

    setSubmitting(true);
    try {
      const details = {
        fullName: String(values.get('fullName')).trim(),
        email: String(values.get('email')).trim(),
        password,
        ...(String(values.get('phone')).trim()
          ? { phone: String(values.get('phone')).trim() }
          : {}),
      };
      saveSession(await register(details), true);
      navigate('/book-visit', { replace: true });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to create your account');
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
          <h1>create your account</h1>
          <p>register to book and manage your visits</p>
          <div className="field">
            <input type="text" name="fullName" placeholder="Full name" aria-label="Full name" autoComplete="name" minLength={2} required />
          </div>
          <div className="field">
            <input type="email" name="email" placeholder="Email address" aria-label="Email address" autoComplete="email" required />
          </div>
          <div className="field">
            <input type="tel" name="phone" placeholder="Phone number (optional)" aria-label="Phone number" autoComplete="tel" />
          </div>
          <div className="field">
            <input type="password" name="password" placeholder="Password (8 characters minimum)" aria-label="Password" autoComplete="new-password" minLength={8} required />
          </div>
          <div className="field">
            <input type="password" name="confirmPassword" placeholder="Confirm password" aria-label="Confirm password" autoComplete="new-password" minLength={8} required />
          </div>
          <button className="go" type="submit" disabled={submitting}>
            {submitting ? 'creating account...' : 'create account'}
          </button>
          {message && <p className="ok error" role="status" aria-live="polite">{message}</p>}
          <p className="reg">
            Already registered? <Link to="/login">Log in</Link>
          </p>
        </form>
        <Link className="homelink" to="/">Home</Link>
      </section>
    </div>
  );
}
