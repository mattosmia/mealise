import React, { useEffect, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import cookie from 'react-cookies';

import { jwtCookieName } from '../../helpers/cookies';
import UserContext from '../../helpers/userContext';

import './Logout.scss';


export default function Logout() {
  const user = useContext(UserContext);
  const history = useHistory();
  
  useEffect(() => {
      cookie.remove(jwtCookieName, { path: '/' })
      user.setUser(null);
      history.push({
        pathname:  "/"
      })
  }, [])

  return (
    <p>We are logging you out... Click <Link to={'/'}>here</Link> if you're not redirected automatically.</p>
  )
}