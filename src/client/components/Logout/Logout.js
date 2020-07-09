import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import cookie from 'react-cookies';

import { authHeaders } from '../../helpers/auth';
import './Logout.scss';

import { jwtCookieName } from '../../helpers/cookies';

export default function Logout() {
  const [isLoading, setIsLoading] = useState(false);
  const [requestStatus, setRequestStatus] = useState('');

  const history = useHistory();
  
  useEffect(() => {
    axios.post('/api/user/logout', {}, authHeaders())
      .then(res =>
        setRequestStatus('success')
      ).catch(err => 
        setRequestStatus('error')
      ).finally(() =>
        setIsLoading(false)
      );
  }, [])

  useEffect(() => {
    if (requestStatus === 'success') {
      cookie.remove(jwtCookieName, { path: '/' })
      history.push({
        pathname:  "/"
      })
    }
  }, [requestStatus])

  return (
    <>LOGGED OUT</>
  )
}