import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

import { formFieldsSchema, formValidationSchema } from './Register.validation';
import formValidation from '../../helpers/formValidation';
import PageContext from '../../helpers/pageContext';

import './Register.scss';
import Button from '../elements/Button';

export default function Register() {
  const page = useContext(PageContext);

  const submitCallback = formFields => {
		page.setIsLoading(true);
		setIsFormSubmitted(true);
    setRequestStatus('');
    
		axios.post('/api/user/register', formFields)
			.then(res => {
        setRequestStatus('success');
        setUserExists(false);
			}).catch(err => {
        setRequestStatus('error');
        setIsFormSubmitted(false);
        setUserExists(err.response && err.response.data && err.response.data.message && err.response.data.message.error && err.response.data.message.error.email && err.response.data.message.error.email.kind === 'unique');
      }).finally(() =>
        page.setIsLoading(false)
      )
	}
  const { formFields, isFormValid, handleChange, handleSubmit } = formValidation(formFieldsSchema, formValidationSchema, submitCallback);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [requestStatus, setRequestStatus] = useState('');

  return (
      <section className="register">
        <h1>Sign up</h1>
        <p>If you already have an account, please <Link to="/login">log in here</Link>.</p>
        { userExists && <p className="p--error">This email address is already registered with Mealise - <Link to="/login">log in instead</Link> or use another email address below</p>}
        <div>
          <label>
            <span>First name</span>
            <input type="text" name="firstName" onChange={handleChange} />
            <span aria-live="assertive"></span>
          </label>
          <label>
            <span>Last name</span>
            <input type="text" name="lastName" onChange={handleChange} />
            <span aria-live="assertive"></span>
          </label>
          <label>
            <span>Email</span>
            <input type="email" name="email" onChange={handleChange} />
            <span aria-live="assertive"></span>
          </label>
          <label>
            <span>Email confirmation</span>
            <input type="email" name="emailConfirmation" onChange={handleChange} />
            <span aria-live="assertive"></span>
          </label>
          <label>
            <span>Password</span>
            <input type="password" name="password" onChange={handleChange} />
            <span aria-live="assertive"></span>
          </label>
          <label>
            <span>Password confirmation</span>
            <input type="password" name="passwordConfirmation" onChange={handleChange} />
            <span aria-live="assertive"></span>
          </label>
          <label>
            <input type="checkbox" name="acceptOver18" onChange={handleChange} />
            <span>I confirm that I am over 18 years of age</span>
            <span aria-live="assertive"></span>
          </label>
          <label>
            <input type="checkbox" name="acceptTerms" onChange={handleChange} />
            <span>I have read and accept the Terms & Conditions</span>
            <span aria-live="assertive"></span>
          </label>
          <p>Read our <Link to="/terms-conditions">Terms & Conditions</Link> here</p>
          <label>
            <input type="checkbox" name="acceptMkt" onChange={handleChange} />
            <span>I would like to receive emails with promotions and other communications from Mealise</span>
            <span aria-live="assertive"></span>
          </label>
          <Button handleClick={handleSubmit} isDisabled={! isFormValid && ! isFormSubmitted}>Sign up</Button>
        </div>
      </section>
  )
}