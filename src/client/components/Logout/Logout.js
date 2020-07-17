import React, { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import cookie from 'react-cookies';

import './Logout.scss';

import { jwtCookieName } from '../../helpers/cookies';

export default function Logout() {
  const history = useHistory();
  
  useEffect(() => {
      cookie.remove(jwtCookieName, { path: '/' })
      history.push({
        pathname:  "/"
      })
  }, [])

  return (
    <p>We are logging you out... Click <Link to={'/'}>here</Link> if you're not redirected automatically.</p>
  )
}