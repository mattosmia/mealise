import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { formFieldsSchema, formValidationSchema } from './ForgotPassword.validation';
import formValidation from '../../helpers/formValidation';

import './ForgotPassword.scss';
import Button from '../elements/Button';

import PageContext from '../../helpers/pageContext';
import Input from '../elements/Input';

import { endpointRoots } from '../../helpers/endpointRoots';

export default function ForgotPassword() {
  const page = useContext(PageContext);
  const [isRequestError, setIsRequestError] = useState(false);
  const [isRequestSuccess, setIsRequestSuccess] = useState(false);

  const submitCallback = formData => {
    if (!page.isLoading) page.setIsLoading(true);
    setIsRequestError(false);
    setIsRequestSuccess(false);
    axios.post(`${endpointRoots.user}forgotpassword`, formData)
      .then(res => {
        setIsRequestSuccess(true)
        setFormFields(formFieldsSchema)
      }).catch(err => 
        setIsRequestError(true)
      ).finally(() =>
        page.setIsLoading(false)
      );
  }

  const { formFields, setFormFields, isFormValid, handleChange, handleSubmit } = formValidation(formFieldsSchema, formValidationSchema, submitCallback);

  return (
    <section className="forgot-password centred-form">
      <h1>Forgot Password</h1>
      <p>If you forgot your password, just enter your email below and we will send you a link to reset it.</p>
      { isRequestError && <p className="p--error">Something went wrong. Please try again.</p>}
      { isRequestSuccess && <p className="p--success">If your email is registered with us, you will receive a message in a few moments.</p>}
      <Input
        label="Email"
        name="email"
        value={formFields.email.value}
        handleChange={handleChange}
        errorMsg={formFields.email.error}
        isRequired={formValidationSchema.email.required}
      />
      <Button
        handleClick={handleSubmit}
        isDisabled={! isFormValid}
      >
        Send password reset link
      </Button>
    </section>
  )
}