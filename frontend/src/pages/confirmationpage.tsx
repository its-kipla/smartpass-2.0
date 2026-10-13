import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SiteNav from '../components/SiteNav';
import { getVisit, getVisitPass, type Visit } from '../services/visit.service';

const STATUS_MESSAGES: Record<Visit['status'], string> = {
  pending: 'Your booking is awaiting approval. This page will update when its status changes.',
  approved: 'Your booking is approved. Show this QR code at the gate.',
  rejected: 'Your booking was not approved. You can submit a new request at any time.',
  checked_in: 'You have checked in. Keep this pass for your records.',
  completed: 'This visit is complete.',
  cancelled: 'This booking was cancelled.',
};

export default function ConfirmationPage() {
  const { id = '' } = useParams();
  const [visit, setVisit] = useState<Visit | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadVisit() {
      try {
        const { visit: currentVisit } = await getVisit(id);
        if (!active) return;
        setVisit(currentVisit);
        setError('');

        if (currentVisit.status === 'approved' || currentVisit.status === 'checked_in') {
          const pass = await getVisitPass(id);
          if (active) setQrDataUrl(pass.qrDataUrl);
        } else {
          setQrDataUrl('');
        }
      } catch (loadError) {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : 'Unable to load booking');
        }
      }
    }

    void loadVisit();
    const timer = window.setInterval(() => void loadVisit(), 15000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, [id]);

  return (
    <>
      <SiteNav />
      <main className="bk">
        <section className="bform confirmation" aria-labelledby="confirmation-title">
          <div className="bhead">
            <div>
              <h2 id="confirmation-title">Booking confirmation</h2>
              <p>Your visit request and access pass</p>
            </div>
          </div>
          {error && (
            <p className="ok error" role="alert">
              {error}. Please <Link to={`/login?next=${encodeURIComponent(`/confirmation/${id}`)}`}>log in</Link> and try again.
            </p>
          )}
          {!visit && !error && <p role="status">Loading your booking...</p>}
          {visit && (
            <>
              <p className="confirmation-status"><b>Status:</b> {visit.status.replace('_', ' ')}</p>
              <p>{STATUS_MESSAGES[visit.status]}</p>
              <dl className="confirmation-details">
                <div><dt>Visit type</dt><dd>{visit.visit_type_name}</dd></div>
                <div><dt>Date</dt><dd>{new Date(`${visit.visit_date}T00:00:00`).toLocaleDateString()}</dd></div>
                {visit.purpose && <div><dt>Purpose</dt><dd>{visit.purpose}</dd></div>}
                <div><dt>Reference</dt><dd>{visit.id}</dd></div>
              </dl>
              {qrDataUrl && (
                <div className="pass-qr">
                  <img src={qrDataUrl} alt="QR code for your approved visit pass" />
                </div>
              )}
              {(visit.status === 'approved' || visit.status === 'checked_in') && !qrDataUrl && !error && (
                <p role="status">Loading your QR pass...</p>
              )}
              <p className="confirmation-links">
                <Link className="btn" to="/book-visit">Book another visit</Link>
                <Link className="btn" to="/">Return home</Link>
              </p>
            </>
          )}
        </section>
      </main>
    </>
  );
}
