import SiteNav from '../components/SiteNav';

export default function HowItWorksPage() {
  return (
    <>
      <SiteNav />
      <main className="hw">
        <div className="hw-top">
          <div>
            <h1>how it <span>works</span></h1>
            <p>Booking a visit to Konza Technology City is quick and easy.<br />follow the simple steps to be part of the innovation</p>
          </div>
          <div className="mapwrap">
            <span className="priority">your visit our priority</span>
            <div className="map" role="img" aria-label="Glowing world map" />
          </div>
        </div>

        <ol className="steps">
          <li><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 8v8M8 12h8" /></svg><h3>create an account</h3><p>sign up with your details.it only takes a minute</p></li>
          <li><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M3 10h18M8 3v4M16 3v4" /></svg><h3>choose your visit date</h3><p>select your preferred campus,date,time and purpose of visit</p></li>
          <li><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="3" width="12" height="18" rx="2" /><path d="M9 12l2 2 4-4" /></svg><h3>submit your request</h3><p>fill in the required information and submit your booking.</p></li>
          <li><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3" /><path d="M3 8l9 6 9-6" /></svg><h3>Get confirmation</h3><p>you will receive a confirmation email with your visit details and next steps</p></li>
          <li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6-5.5-6-11a6 6 0 0112 0c0 5.5-6 11-6 11z" /><circle cx="12" cy="10" r="2" fill="#00200d" stroke="none" /></svg><h3>visit konza</h3><p>Arrive at the campus on your scheduled date and experience innovation first-hand</p></li>
        </ol>

        <section className="easy" aria-label="Why it's easy">
          <div className="why"><small>WHY ITS EASY</small><b>Designed for a <span>seamless Experience</span></b></div>
          <div>
            <span className="ico"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8" /><path d="M12 8v4l3 2" /></svg></span>
            <div><h3>Fast &amp; convenient</h3><p>book in minute not hours</p></div>
          </div>
          <div>
            <span className="ico sq"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3" /><circle cx="5" cy="10" r="2" /><circle cx="19" cy="10" r="2" /><path d="M6 20c0-3.5 2.7-6 6-6s6 2.5 6 6" /></svg></span>
            <div><h3>support when you need it</h3><p>our team is here to help at every step</p></div>
          </div>
          <div className="photo" role="img" aria-label="Konza campus aerial view" />
        </section>
      </main>
    </>
  );
}
