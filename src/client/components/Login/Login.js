import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import cookie from 'react-cookies';

import './Login.scss';
import Input from '../elements/Input';
import Button from '../elements/Button';

import { formFieldsSchema, formValidationSchema } from './Login.validation';
import formValidation from '../../helpers/formValidation';

import { jwtCookieName } from '../../helpers/cookies';
import PageContext from '../../helpers/pageContext';
import { endpointRoots } from '../../helpers/endpointRoots';

export default function Login() {
  const page = useContext(PageContext);
  const [isRequestError, setIsRequestError] = useState(false);

  const history = useHistory();

  const submitCallback = formData => {
    page.setIsLoading(true);
    setIsRequestError(false);
    axios.post(`${endpointRoots.user}login`, formData)
			.then(res => {
				cookie.save(jwtCookieName, res.data.data.token, { path: '/' });
        history.push({
          pathname:  "/planner"
        })
      }).catch(err => 
        setIsRequestError(true)
			).finally(() => 
        page.setIsLoading(false)
      )
  }

  const { formFields, isFormValid, handleChange, handleSubmit } = formValidation(formFieldsSchema, formValidationSchema, submitCallback);
  
  return (
    <section className="login centred-form">
      <h1>Log in</h1>
      <p>Don't have an account yet? <Link to={'/register'}>Sign up now</Link></p>
        { isRequestError && <p className="p--error">Please check your email and password and try again.</p>}
        <Input
          label="Email"
          name="email"
          value={formFields.email.value}
          handleChange={handleChange}
          errorMsg={formFields.email.error}
          isRequired={formValidationSchema.email.required}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={formFields.password.value}
          handleChange={handleChange}
          errorMsg={formFields.password.error}
          isRequired={formValidationSchema.password.required}
        />
        <Button
          handleClick={handleSubmit}
          isDisabled={! isFormValid}
        >
          Log in
        </Button> 
        <Link to={'/forgot-password'}>Forgot password?</Link>
    </section>
  )
}