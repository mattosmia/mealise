import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import cookie from 'react-cookies';

import './Login.scss';
import Button from '../elements/Button';

import { jwtCookieName } from '../../helpers/cookies';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [requestStatus, setRequestStatus] = useState('');
  const [formFieldValues, setFormFieldValues] = useState({});

  const history = useHistory();

  const handleChange = e => {
    e.persist();
    
		const fieldName = e.target.name;
		let fieldValue;
		
		switch (e.target.type) {
			case 'checkbox':
				fieldValue = e.target.checked;
			break;
			default:
				fieldValue = e.target.value;
		}

    setRequestStatus('');
    setFormFieldValues({
      ...formFieldValues,
      [fieldName]: fieldValue
    })
  }
  const handleSubmit = () => {
    setIsLoading(true);
    axios.post('/api/user/login', formFieldValues)
			.then(res => {
				cookie.save(jwtCookieName, res.data.data.token, { path: '/' });
        setRequestStatus('success');
      }).catch(err => 
        setRequestStatus('error')
			).finally(() => 
        setIsLoading(false)
      )
  }
  
  useEffect(() => {
    if (requestStatus === 'success') {
      history.push({
        pathname:  "/planner"
      })
    }
  }, [requestStatus])

  return (
      <section className="login">
        <h1>Log in</h1>
        <label>
            <span>Email</span>
            <input type="email" name="email" onChange={handleChange} />
        </label>
        <label>
            <span>Password</span>
            <input type="password" name="password" onChange={handleChange} />
        </label>
        <Button handleClick={handleSubmit}>Log in</Button>
      </section>
  )
}