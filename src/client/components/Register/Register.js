import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";

import PageContext from '../../helpers/pageContext';
import UserContext from '../../helpers/userContext';
import formValidation from '../../helpers/formValidation';
import { endpointRoots } from '../../helpers/endpointRoots';
import { isAuth } from '../../helpers/auth';

import Button from '../elements/Button';
import Checkbox from '../elements/Checkbox';
import Input from '../elements/Input';
import AlertMessage from '../elements/AlertMessage';

import { formFieldsSchema, formValidationSchema } from './Register.validation';

import './Register.scss';

export default function Register() {
  const page = useContext(PageContext);
  const user = useContext(UserContext);
  const [userExists, setUserExists] = useState(false);
  const [isRequestError, setIsRequestError] = useState(false);

  const history = useHistory();

  useEffect(() => {
    isAuth()
      .then(res => {
        if (res.data) {
          user.setUser(res.data);
          history.push({
            pathname:  "/planner"
          })
        }
      })
      .finally(() => { page.setIsLoading(false) })
  }, []);

  const submitCallback = formData => {
		if (!page.isLoading) page.setIsLoading(true);
    setIsRequestError(false);
    setUserExists(false);
		axios.post(`${endpointRoots.user}register`, formData)
			.then(res => {
        history.push({
          pathname:  "/login"
        })
			}).catch(err => {
        window.scrollTo(0, 0);
        if (err.response && err.response.data && err.response.data.message && err.response.data.message.errors && err.response.data.message.errors.email && err.response.data.message.errors.email.kind === 'unique') {
          setUserExists(true)
        } else {
          setIsRequestError(true)
        }
      }).finally(() =>
        page.setIsLoading(false)
      )
	}
  const { formFields, isFormValid, handleChange, handleSubmit } = formValidation(formFieldsSchema, formValidationSchema, submitCallback);

  return (
    <section className="register centred-form">
      <h1>Sign up</h1>
      <p>If you already have an account, please <Link to="/login">log in here</Link>.</p>
      { userExists && <AlertMessage>This email address is already registered - <Link to="/login">log in instead</Link> or use another email address below</AlertMessage>}
      { isRequestError && <AlertMessage>Something went wrong. Please try again.</AlertMessage>}
      <Input
        label="First name"
        name="firstName"
        value={formFields.firstName.value}
        handleChange={handleChange}
        errorMsg={formFields.firstName.error}
        isRequired={formValidationSchema.firstName.required}
      />
      <Input
        label="Last name"
        name="lastName"
        value={formFields.lastName.value}
        handleChange={handleChange}
        errorMsg={formFields.lastName.error}
        isRequired={formValidationSchema.lastName.required}
      />
      <Input
        label="Email"
        type="email"
        name="email"
        value={formFields.email.value}
        handleChange={handleChange}
        errorMsg={formFields.email.error}
        isRequired={formValidationSchema.email.required}
      />
      <Input
        label="Email confirmation"
        type="email"
        name="emailConfirmation"
        value={formFields.emailConfirmation.value}
        handleChange={handleChange}
        errorMsg={formFields.emailConfirmation.error}
        isRequired={formValidationSchema.emailConfirmation.required}
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
      <Input
        label="Password confirmation"
        type="password"
        name="passwordConfirmation"
        value={formFields.passwordConfirmation.value}
        handleChange={handleChange}
        errorMsg={formFields.passwordConfirmation.error}
        isRequired={formValidationSchema.passwordConfirmation.required}
      />
      <Checkbox
        label="I confirm that I am over 18 years of age"
        name="acceptOver18"
        isChecked={formFields.acceptOver18.value === true}
        handleChange={handleChange}
        errorMsg={formFields.acceptOver18.error}
        isRequired={formValidationSchema.acceptOver18.required}
      />
      <Checkbox
        label="I have read and accept the Terms & Conditions"
        name="acceptTerms"
        isChecked={formFields.acceptTerms.value === true}
        handleChange={handleChange}
        errorMsg={formFields.acceptTerms.error}
        isRequired={formValidationSchema.acceptTerms.required}
      />
      <p>Read our <Link to="/terms-conditions">Terms & Conditions</Link> here</p>
      <Checkbox
        label="I would like to receive emails with promotions and other communications from Mealise"
        name="acceptMkt"
        isChecked={formFields.acceptMkt.value === true}
        handleChange={handleChange}
        errorMsg={formFields.acceptMkt.error}
        isRequired={formValidationSchema.acceptMkt.required}
      />
      <Button
        handleClick={handleSubmit}
        isDisabled={! isFormValid}
      >
        Sign up
      </Button>
    </section>
  )
}