import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';

import './CookieNotice.scss';

const cookieName = 'mealiseCookieConsent';

export default function CookieNotice() {
  const [cookieConsent, setCookieConsent] = useState(cookie.load(cookieName));
  
  const handleCookieConsent = () => {
    setCookieConsent(true);
    cookie.save(cookieName, true, { path: '/' })
  }
  
  return (
    <>
    { !cookieConsent &&
      <section className="cookie-notice">
        <p>By continuing to browse this website, you agree to our use of cookies as per our <Link to="/cookie-policy">Cookie Policy</Link></p>
        <button onClick={handleCookieConsent} className="button--white button--ghost">I understand</button>
      </section>
    }
    </>
  )
}