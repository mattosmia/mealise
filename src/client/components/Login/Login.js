import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import cookie from 'react-cookies';

import './Login.scss';
import Button from '../elements/Button';

import { jwtCookieName } from '../../helpers/cookies';
import PageContext from '../../helpers/pageContext';

export default function Login() {
  const page = useContext(PageContext);
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
    page.setIsLoading(true);
    axios.post('/api/user/login', formFieldValues)
			.then(res => {
				cookie.save(jwtCookieName, res.data.data.token, { path: '/' });
        setRequestStatus('success');
      }).catch(err => 
        setRequestStatus('error')
			).finally(() => 
        page.setIsLoading(false)
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