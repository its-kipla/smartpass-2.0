import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SiteNav from '../components/SiteNav';
import { createVisit, getVisitTypes, type VisitType } from '../services/visit.service';

function getNairobiToday(): string {
  const parts = new Intl.DateTimeFormat('en', {
    timeZone: 'Africa/Nairobi',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}

export default function BookVisitPage() {
  const [visitTypes, setVisitTypes] = useState<VisitType[]>([]);
  const [loadingTypes, setLoadingTypes] = useState(true);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const today = getNairobiToday();
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    getVisitTypes()
      .then(({ visitTypes: types }) => {
        if (active) setVisitTypes(types);
      })
      .catch((error: unknown) => {
        if (active) {
          setMessage(error instanceof Error ? error.message : 'Unable to load visit types');
          setIsError(true);
        }
      })
      .finally(() => {
        if (active) setLoadingTypes(false);
      });
    return () => {
      active = false;
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    setSubmitting(true);
    setMessage('');
    setIsError(false);

    try {
      const { visit } = await createVisit({
        visitTypeId: Number(values.get('visitTypeId')),
        visitDate: String(values.get('date')),
        purpose: String(values.get('purpose')).trim(),
      });
      navigate(`/confirmation/${encodeURIComponent(visit.id)}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unable to submit your booking';
      const needsLogin = /authentication|required|expired token/i.test(errorMessage);
      setMessage(
        needsLogin
          ? `${errorMessage}. Please log in to submit a booking.`
          : errorMessage
      );
      setIsError(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <SiteNav />
      <main className="bk">
        <section className="info">
          <span className="chip">
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></svg>
            plan your visit
          </span>
          <h1>Book a visit to <span>konza Technology City</span></h1>
          <p className="lead">explore our innovation hub experience the future of technology and meet the community .book your visit with just a few clicks</p>
          <ul className="feats">
            <li><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" /></svg>campus tour</li>
            <li><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3" /><circle cx="5" cy="10" r="2" /><circle cx="19" cy="10" r="2" /><path d="M6 20c0-3.5 2.7-6 6-6s6 2.5 6 6M1 19c0-2 1.5-3.5 3.5-3.5M23 19c0-2-1.5-3.5-3.5-3.5" /></svg>Meet Experts</li>
            <li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3h6l-1 6h-4zM10 9v12h4V9" /></svg>see innovation</li>
            <li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6a3 3 0 10-3 3h12a3 3 0 10-3-3v12a3 3 0 103-3H6a3 3 0 103 3z" /></svg>experience the future</li>
          </ul>
          <div className="journey">
            <h2>your journey to innovation starts here</h2>
          </div>
        </section>

        <form className="bform" onSubmit={handleSubmit}>
          <div className="bhead">
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>
            <div>
              <h2>Book your visit</h2>
              <p>choose a visit type and date to request your booking</p>
            </div>
          </div>
          <label className="t" htmlFor="visitType">Visit type*</label>
          <div className="f">
            <select id="visitType" name="visitTypeId" required disabled={loadingTypes || visitTypes.length === 0}>
              <option value="">
                {loadingTypes ? 'Loading visit types...' : visitTypes.length ? 'Select a visit type' : 'No visit types are available'}
              </option>
              {visitTypes.map((type) => <option key={type.id} value={type.id}>{type.name}</option>)}
            </select>
          </div>
          <label className="t" htmlFor="date">Preferred date*</label>
          <div className="f">
            <input id="date" name="date" type="date" min={today} required />
          </div>
          <label className="t" htmlFor="purpose">Purpose of visit</label>
          <div className="f">
            <textarea id="purpose" name="purpose" rows={3} maxLength={500} placeholder="Share any details that will help us prepare" />
          </div>
          <button className="sub" type="submit" disabled={submitting || loadingTypes || visitTypes.length === 0}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11l18-8-8 18-2-8z" /></svg>
            {submitting ? 'submitting...' : 'submit booking'}
          </button>
          {message && <p className={`ok${isError ? ' error' : ''}`} role="status" aria-live="polite">{message}</p>}
          {isError && /authentication|required|expired token/i.test(message) && (
            <p className="reg">Please <Link to="/login?next=book-visit.html">log in</Link> to continue.</p>
          )}
        </form>
      </main>
    </>
  );
}
