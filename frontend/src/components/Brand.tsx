import { Link } from 'react-router-dom';

export default function Brand() {
  return (
    <Link className="brand" to="/index.html">
      <svg
        viewBox="0 0 160 138"
        fill="none"
        stroke="#0b5a2a"
        strokeWidth="2.6"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M78 100L70 80L50 70L30 72M70 80L60 60L48 48M60 60L62 40M78 100L80 70L82 45L90 30M82 45L74 32M80 70L100 62L118 50M78 100L92 85L112 80L132 84M92 85L104 98L120 100M70 80L40 90L18 88M66 72L56 56M100 62L104 44M112 80L122 68" />
        <g strokeWidth="2.2">
          <circle cx="26" cy="72" r="4" />
          <circle cx="46" cy="44" r="4" />
          <circle cx="62" cy="36" r="4" />
          <circle cx="92" cy="26" r="4" />
          <circle cx="72" cy="28" r="4" />
          <circle cx="122" cy="47" r="4" />
          <circle cx="136" cy="84" r="4" />
          <circle cx="124" cy="101" r="4" />
          <circle cx="14" cy="88" r="4" />
          <circle cx="54" cy="52" r="4" />
          <circle cx="104" cy="40" r="4" />
          <circle cx="125" cy="64" r="4" />
        </g>
        <circle cx="86" cy="58" r="4.2" stroke="#e8101a" strokeWidth="2.4" />
        <path d="M72 100h13v36H72z" fill="#0b5a2a" stroke="none" />
      </svg>
      <span>
        <b>KONZA</b>
        <small>TECHNOLOGY CITY</small>
      </span>
    </Link>
  );
}
