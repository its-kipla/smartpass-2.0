import { Link, useLocation } from 'react-router-dom';
import Brand from './Brand';

export default function SiteNav() {
  const { pathname } = useLocation();

  return (
    <header>
      <nav className="nav pill" aria-label="Main navigation">
        <Brand />
        <ul>
          <li>
            <Link className={pathname === '/' || pathname.includes('index.html') ? 'on' : ''} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className={pathname.includes('book-visit') ? 'on' : ''} to="/book-visit">
              book a visit
            </Link>
          </li>
          <li>
            <Link className={pathname.includes('how-it-works') ? 'on' : ''} to="/how-it-works">
              how it works
            </Link>
          </li>
          <li>
            <Link className="login" to="/login">
              log in
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
