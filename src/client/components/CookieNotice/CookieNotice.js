import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';

import './CookieNotice.scss';
import Button from '../elements/Button';
import { consentCookieName } from '../../helpers/cookies';

export default function CookieNotice() {
  const [cookieConsent, setCookieConsent] = useState(cookie.load(consentCookieName));
  
  const handleCookieConsent = () => {
    setCookieConsent(true);
    cookie.save(consentCookieName, true, { path: '/' })
  }
  
  return (
    <>
    { !cookieConsent &&
      <section className="cookie-notice">
        <p>By continuing to browse this website, you agree to our use of cookies as per our <Link to="/cookie-policy">Cookie Policy</Link></p>
        <Button handleClick={handleCookieConsent} classes="button--white button--ghost">I understand</Button>
      </section>
    }
    </>
  )
}