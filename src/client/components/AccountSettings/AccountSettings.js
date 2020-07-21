import React, { useState, useContext, useEffect } from 'react';
import axios from "axios";

import { formFieldsSchema, formValidationSchema, passwordFormFieldsSchema, passwordFormValidationSchema } from './AccountSettings.validation';
import formValidation from '../../helpers/formValidation';

import PageContext from '../../helpers/pageContext';
import Input from '../elements/Input';

import './AccountSettings.scss';
import { endpointRoots } from '../../helpers/endpointRoots';
import { authHeaders } from '../../helpers/auth';
import Button from '../elements/Button';

export default function AccountSettings() {
  const page = useContext(PageContext);
  const [isRequestError, setIsRequestError] = useState(false);
  const [isRequestSuccess, setIsRequestSuccess] = useState(false);
  const [isPasswordRequestError, setIsPasswordRequestError] = useState(false);
  const [isPasswordRequestSuccess, setIsPasswordRequestSuccess] = useState(false);

  const submitCallback = formData => {
    page.setIsLoading(true);
    setIsRequestError(false);
    setIsRequestSuccess(false);
    setIsPasswordRequestError(false);
    setIsPasswordRequestSuccess(false);
    axios.post(`${endpointRoots.user}edit`, formData, authHeaders())
      .then(res => {
        setIsRequestSuccess(true)
      }).catch(err => 
        setIsRequestError(true)
      ).finally(() =>
        page.setIsLoading(false)
      );
  }

  const submitPasswordCallback = formData => {
    page.setIsLoading(true);
    setIsRequestError(false);
    setIsRequestSuccess(false);
    setIsPasswordRequestError(false);
    setIsPasswordRequestSuccess(false);
    axios.post(`${endpointRoots.user}editpwd`, formData, authHeaders())
      .then(res => {
        setIsPasswordRequestSuccess(true)
        passwordForm.setFormFields(passwordFormFieldsSchema)
      }).catch(err => 
        setIsPasswordRequestError(true)
      ).finally(() =>
        page.setIsLoading(false)
      );
  }

  const { formFields, setFormFields, isFormValid, handleChange, handleSubmit } = formValidation(formFieldsSchema, formValidationSchema, submitCallback);

  const passwordForm = formValidation(passwordFormFieldsSchema, passwordFormValidationSchema, submitPasswordCallback);

  useEffect(() => {
    if (!page.isLoading) page.setIsLoading(true);
    axios.get(endpointRoots.user, authHeaders())
    .then(res => {
      setFormFields({
        ...formFields,
        firstName: { value: res.data.data.firstName, error: '', isValid: true },
        lastName: { value: res.data.data.lastName, error: '', isValid: true },
        email: { value: res.data.data.email, error: '', isValid: true },
        acceptMkt: { value: res.data.data.acceptMkt, error: '', isValid: true },
      })
    }).catch(err => 
      console.log('Error fetching user', err)
    ).finally(() =>
      page.setIsLoading(false)
    )
  }, []);

  return (
    <section className="account-settings">
      <h1>Account Settings</h1>
      <div className="account-settings__main">
        {! page.isLoading && <>
          <div className="account-settings__form">
            { isRequestError && <p className="p--error">Something went wrong. Please try again.</p>}
            { isRequestSuccess && <p className="p--success">Your account has been successfully updated!</p>}
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
              name="email"
              value={formFields.email.value}
              handleChange={handleChange}
              errorMsg={formFields.email.error}
              isRequired={formValidationSchema.email.required}
            />
            <label>
              <input type="checkbox" name="acceptMkt" value="true" checked={formFields.acceptMkt.value === true} onChange={handleChange} />
              <span>I would like to receive emails with promotions and other communications from Mealise</span>
              <span aria-live="assertive"></span>
            </label>
            <Button handleClick={handleSubmit} isDisabled={! isFormValid}>Update account</Button>
          </div>
          <div className="account-settings__form">
            <h2>Update password</h2>
            { isPasswordRequestError && <p className="p--error">Something went wrong. Please try again.</p>}
            { isPasswordRequestSuccess && <p className="p--success">Your password has been successfully updated!</p>}
            <Input
              label="Current password"
              type="password"
              name="currentPassword"
              value={passwordForm.formFields.currentPassword.value}
              handleChange={passwordForm.handleChange}
              errorMsg={passwordForm.formFields.currentPassword.error}
              isRequired={passwordFormValidationSchema.currentPassword.required}
            />
            <Input
              label="New password"
              type="password"
              name="newPassword"
              value={passwordForm.formFields.newPassword.value}
              handleChange={passwordForm.handleChange}
              errorMsg={passwordForm.formFields.newPassword.error}
              isRequired={passwordFormValidationSchema.newPassword.required}
            />
            <Input
              label="New password confirmation"
              type="password"
              name="newPasswordConfirmation"
              value={passwordForm.formFields.newPasswordConfirmation.value}
              handleChange={passwordForm.handleChange}
              errorMsg={passwordForm.formFields.newPasswordConfirmation.error}
              isRequired={passwordFormValidationSchema.newPasswordConfirmation.required}
            />
            <Button handleClick={passwordForm.handleSubmit} isDisabled={! passwordForm.isFormValid}>Update password</Button>
          </div>
        </>}
      </div>
    </section>
  )
}