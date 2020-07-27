import React, { useState, useContext, useEffect } from 'react';
import axios from "axios";

import { formFieldsSchema, formValidationSchema, passwordFormFieldsSchema, passwordFormValidationSchema, deleteFormFieldsSchema, deleteFormValidationSchema } from './AccountSettings.validation';
import formValidation from '../../helpers/formValidation';

import PageContext from '../../helpers/pageContext';
import Input from '../elements/Input';

import './AccountSettings.scss';
import { endpointRoots } from '../../helpers/endpointRoots';
import { authHeaders } from '../../helpers/auth';
import Button from '../elements/Button';
import Checkbox from '../elements/Checkbox';
import AlertMessage from '../elements/AlertMessage';
import { useHistory } from 'react-router-dom';
import cookie from 'react-cookies';

import { jwtCookieName } from '../../helpers/cookies';

export default function AccountSettings() {
  const page = useContext(PageContext);
  const history = useHistory();
  const [isDeleteRequestError, setIsDeleteRequestError] = useState(false);
  const [isRequestError, setIsRequestError] = useState(false);
  const [isRequestSuccess, setIsRequestSuccess] = useState(false);
  const [isPasswordRequestError, setIsPasswordRequestError] = useState(false);
  const [isPasswordRequestSuccess, setIsPasswordRequestSuccess] = useState(false);

  const submitCallback = formData => {
    if (!page.isLoading) page.setIsLoading(true);
    setIsRequestError(false);
    setIsRequestSuccess(false);
    setIsPasswordRequestError(false);
    setIsPasswordRequestSuccess(false);
    setIsDeleteRequestError(false);
    axios.post(`${endpointRoots.user}edit`, formData, authHeaders())
      .then(res => {
        setIsRequestSuccess(true)
      }).catch(err => 
        setIsRequestError(true)
      ).finally(() =>
        page.setIsLoading(false)
      )
  }

  const submitPasswordCallback = formData => {
    if (!page.isLoading) page.setIsLoading(true);
    setIsRequestError(false);
    setIsRequestSuccess(false);
    setIsPasswordRequestError(false);
    setIsPasswordRequestSuccess(false);
    setIsDeleteRequestError(false);
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

  const submitDeleteCallback = formData => {
    if (confirm("Are you sure you want to delete your account? All your data will be deleted.\n\nATTENTION: This action cannot be undone!")) {
    if (!page.isLoading) page.setIsLoading(true);
    setIsRequestError(false);
    setIsRequestSuccess(false);
    setIsPasswordRequestError(false);
    setIsPasswordRequestSuccess(false);
    setIsDeleteRequestError(false);
    axios.post(`${endpointRoots.user}delete`, formData, authHeaders())
      .then(res => {
        cookie.remove(jwtCookieName, { path: '/' })
        history.push({
          pathname:  "/"
        })
      }).catch(err => 
        setIsDeleteRequestError(true)
      ).finally(() =>
        page.setIsLoading(false)
      );
    }
  }

  const { formFields, setFormFields, isFormValid, handleChange, handleSubmit } = formValidation(formFieldsSchema, formValidationSchema, submitCallback);

  const passwordForm = formValidation(passwordFormFieldsSchema, passwordFormValidationSchema, submitPasswordCallback);
  const deleteForm = formValidation(deleteFormFieldsSchema, deleteFormValidationSchema, submitDeleteCallback);

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
            { isRequestError && <AlertMessage>Something went wrong. Please try again.</AlertMessage>}
            { isRequestSuccess && <AlertMessage type="success">Your account has been successfully updated!</AlertMessage>}
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
            <Checkbox
              label="I would like to receive emails with promotions and other communications from Mealise"
              name="acceptMkt"
              isChecked={formFields.acceptMkt.value === true}
              handleChange={handleChange}
              errorMsg={formFields.acceptMkt.error}
              isRequired={formValidationSchema.acceptMkt.required}
            />
            <Button handleClick={handleSubmit} isDisabled={! isFormValid}>Update account</Button>
          </div>
          <div className="account-settings__form">
            <h2>Update password</h2>
            { isPasswordRequestError && <AlertMessage>Something went wrong. Please try again.</AlertMessage>}
            { isPasswordRequestSuccess && <AlertMessage type="success">Your password has been successfully updated!</AlertMessage>}
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
            <Button
              handleClick={passwordForm.handleSubmit}
              isDisabled={! passwordForm.isFormValid}
            >
              Update password
            </Button>
          </div>
          <div className="account-settings__form">
            <h2>Delete account</h2>
            <p>If you would like to delete your account, enter your password and click the button below. ALL DATA WILL BE LOST.</p>
            { isDeleteRequestError && <AlertMessage>Something went wrong. Please try again.</AlertMessage>}
            <Input
              label="Verify password"
              type="password"
              name="verifyPassword"
              value={deleteForm.formFields.verifyPassword.value}
              handleChange={deleteForm.handleChange}
              errorMsg={deleteForm.formFields.verifyPassword.error}
              isRequired={deleteFormValidationSchema.verifyPassword.required}
            />
            <Button
              handleClick={deleteForm.handleSubmit}
              isDisabled={! deleteForm.isFormValid}
            >
              Delete account
            </Button>
          </div>
        </>}
      </div>
    </section>
  )
}