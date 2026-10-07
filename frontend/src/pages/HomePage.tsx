import { Link } from 'react-router-dom';
import SiteNav from '../components/SiteNav';

function HexClip() {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: 'absolute' }}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id="hex-clip" clipPathUnits="objectBoundingBox">
          <path d="M0.0500,0.4000 L0.2000,0.1000 Q0.2500,0.0000 0.3500,0.0000 L0.6500,0.0000 Q0.7500,0.0000 0.8000,0.1000 L0.9500,0.4000 Q1.0000,0.5000 0.9500,0.6000 L0.8000,0.9000 Q0.7500,1.0000 0.6500,1.0000 L0.3500,1.0000 Q0.2500,1.0000 0.2000,0.9000 L0.0500,0.6000 Q0.0000,0.5000 0.0500,0.4000 Z" />
        </clipPath>
      </defs>
    </svg>
  );
}

function Hexagon({ variant }: { variant: 'a' | 'b' }) {
  return (
    <div className={`hex ${variant}`}>
      <div className="pic" />
      <svg className="edge" viewBox="0 0 1 1" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0.0500,0.4000 L0.2000,0.1000 Q0.2500,0.0000 0.3500,0.0000 L0.6500,0.0000 Q0.7500,0.0000 0.8000,0.1000 L0.9500,0.4000 Q1.0000,0.5000 0.9500,0.6000 L0.8000,0.9000 Q0.7500,1.0000 0.6500,1.0000 L0.3500,1.0000 Q0.2500,1.0000 0.2000,0.9000 L0.0500,0.6000 Q0.0000,0.5000 0.0500,0.4000 Z" />
      </svg>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <HexClip />
      <main className="hero2">
        <div>
          <h1>
            SMART <span>PASS</span>
          </h1>
          <h2>welcome to konza</h2>
          <p>A visitors enrollment and experience streamlining platform for Konza technopolis.</p>
          <div className="row">
            <Link className="btn" to="/book-visit">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
              </svg>
              book a visit
            </Link>
            <Link className="btn dark" to="/login">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <rect x="3" y="5" width="18" height="16" rx="3" />
                <path d="M3 10h18M8 3v4M16 3v4" />
              </svg>
              join a visit
            </Link>
          </div>
        </div>

        <div className="hexes" role="img" aria-label="Konza city imagery">
          <Hexagon variant="a" />
          <Hexagon variant="b" />
        </div>
      </main>

      <footer className="foot2 pill">
        <div className="social">
          <a href="https://x.com/" aria-label="X">
            <svg viewBox="0 0 24 24"><path d="M4 4l16 16M20 4L4 20" /></svg>
          </a>
          <a href="https://instagram.com/" aria-label="Instagram">
            <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".6" /></svg>
          </a>
          <a href="https://youtube.com/" aria-label="YouTube">
            <svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="4" /><path d="M10 9l5 3-5 3z" /></svg>
          </a>
          <a href="https://linkedin.com/" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4" /><path d="M8 11v5M8 8v.01M12 16v-5M12 13c0-3 4-3 4 0v3" /></svg>
          </a>
        </div>
        <div className="contact">
          <strong>contact us</strong>
          <a href="tel:+254111121100">+254 111 121 100</a>
          <a href="mailto:info@konza.go.ke">info@konza.go.ke</a>
        </div>
      </footer>
    </>
  );
}
