import React, { useState, useContext } from 'react';
import axios from 'axios';

import './ContactUs.scss';
import Input from '../elements/Input';
import Textarea from '../elements/Textarea';

import { formFieldsSchema, formValidationSchema } from './ContactUs.validation';
import formValidation from '../../helpers/formValidation';
import { endpointRoots } from '../../helpers/endpointRoots';
import Button from '../elements/Button';

import PageContext from '../../helpers/pageContext';
import AlertMessage from '../elements/AlertMessage';

export default function ContactUs() {
  const page = useContext(PageContext);
  const [isRequestError, setIsRequestError] = useState(false);
  const [isRequestSuccess, setIsRequestSuccess] = useState(false);

  const submitCallback = formData => {
    if (!page.isLoading) page.setIsLoading(true);
    setIsRequestError(false);
    setIsRequestSuccess(false);
    axios.post(endpointRoots.contact, formData)
      .then(res => {
        setFormFields(formFieldsSchema)
        setIsRequestSuccess(true)
      }).catch(err => 
        setIsRequestError(true)
      ).finally(() =>
        page.setIsLoading(false)
      )
  }

  const { formFields, setFormFields, isFormValid, handleChange, handleSubmit } = formValidation(formFieldsSchema, formValidationSchema, submitCallback);

  return (
    <section className="contact-us centred-form">
      <h1>Contact Us</h1>
      { isRequestError && <AlertMessage>Something went wrong. Please try again.</AlertMessage>}
      { isRequestSuccess && <AlertMessage type="success">Your message has been successfully sent!</AlertMessage>}
      <p>If you'd like to be in touch please email us at <a href="mailto:info@mealise.com">info@mealise.com</a> or use the form below.</p>
      <p><strong>Please do not send us any sensitive information - either via email or this form. Mealise will never ask for your password.</strong></p>
      <Input
          label="Name"
          name="name"
          value={formFields.name.value}
          handleChange={handleChange}
          errorMsg={formFields.name.error}
          isRequired={formValidationSchema.name.required}
        />
        <Input
          label="Email"
          name="email"
          value={formFields.email.value}
          handleChange={handleChange}
          errorMsg={formFields.email.error}
          isRequired={formValidationSchema.email.required}
        />
        <Input
          label="Subject"
          name="subject"
          value={formFields.subject.value}
          handleChange={handleChange}
          errorMsg={formFields.subject.error}
          isRequired={formValidationSchema.subject.required}
        />
        <Textarea
          label="Message"
          name="message"
          value={formFields.message.value}
          handleChange={handleChange}
          errorMsg={formFields.message.error}
          isRequired={formValidationSchema.message.required}
        />
        <Button
          handleClick={handleSubmit}
          isDisabled={!isFormValid}
        >
          Send message
        </Button>
    </section>
  )
}