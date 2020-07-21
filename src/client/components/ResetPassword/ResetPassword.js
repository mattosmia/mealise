import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { formFieldsSchema, formValidationSchema } from './ResetPassword.validation';
import formValidation from '../../helpers/formValidation';

import './ResetPassword.scss';
import Button from '../elements/Button';

import PageContext from '../../helpers/pageContext';
import Input from '../elements/Input';

import { endpointRoots } from '../../helpers/endpointRoots';
import { Link } from 'react-router-dom';
import AlertMessage from '../elements/AlertMessage';

export default function ResetPassword(props) {
  const page = useContext(PageContext);
  const [isRequestError, setIsRequestError] = useState(false);
  const [isRequestSuccess, setIsRequestSuccess] = useState(false);
  const [tokenData, setTokenData] = useState({
    isValid: false,
    userId: '',
    email: '',
    firstName: '',
    token: ''
  });

  useEffect(() => {
    if (!page.isLoading) page.setIsLoading(true);
    if (!props.match.params.token) {
      setTokenData({
        ...tokenData,
        isValid: false
      });
      page.setIsLoading(false);
    } else {
      const token = props.match.params.token.match(/^([a-z\d]+?)-([a-z\d\-]+)$/i) || [];
      if (token.length !== 3) {
        setTokenData({
          ...tokenData,
          isValid: false
        });
        page.setIsLoading(false);
      } else {
        axios.get(`${endpointRoots.user}resetpassword`,
        {
          params: {
            userId: token[1],
            resetToken: token[2]
          }
        })
        .then(res => {
          if (res.data.data && res.data.data.email) {
            setTokenData({
              ...tokenData,
              email: res.data.data.email,
              firstName: res.data.data.firstName,
              userId: token[1],
              token: token[2],
              isValid: true
            });
          } else {
            setTokenData({
              ...tokenData,
              isValid: false
            });
          }
        }).catch(err => 
          console.log('Error fetching token', err)
        ).finally(() =>
          page.setIsLoading(false)
        )
      }
    }
  }, []);

  const submitCallback = formData => {
    if (!page.isLoading) page.setIsLoading(true);
    setIsRequestError(false);
    setIsRequestSuccess(false);
    formData = {
      ...formData,
      userId: tokenData.userId,
      email: tokenData.email,
      firstName: tokenData.firstName,
      resetToken: tokenData.token,
    }
    axios.post(`${endpointRoots.user}resetpassword`, formData)
      .then(res => {
        setIsRequestSuccess(true)
      }).catch(err => {console.log(err)
        setIsRequestError(true)}
      ).finally(() =>
        page.setIsLoading(false)
      );
  }

  const { formFields, setFormFields, isFormValid, handleChange, handleSubmit } = formValidation(formFieldsSchema, formValidationSchema, submitCallback);

  return (
    <section className="reset-password centred-form">
      <h1>Reset Password</h1>
        {! page.isLoading && <>
          { tokenData.isValid ? <>
            <p>Enter your new password below</p>
             { isRequestError && <AlertMessage>Something went wrong. Please try again.</AlertMessage>}
              { isRequestSuccess ?
              <AlertMessage type="success">Your password has been successfully reset. Click <Link to={'/login'}>here</Link> to log into your account.</AlertMessage>
              :
              <>
                <Input
                  label="New password"
                  type="password"
                  name="password"
                  value={formFields.password.value}
                  handleChange={handleChange}
                  errorMsg={formFields.password.error}
                  isRequired={formValidationSchema.password.required}
                />
                <Input
                  label="New password confirmation"
                  type="password"
                  name="passwordConfirmation"
                  value={formFields.passwordConfirmation.value}
                  handleChange={handleChange}
                  errorMsg={formFields.passwordConfirmation.error}
                  isRequired={formValidationSchema.passwordConfirmation.required}
                />
                <Button
                  handleClick={handleSubmit}
                  isDisabled={! isFormValid}
                >
                  Reset password
                </Button>
              </>
            }
          </>
          :
            <AlertMessage>The token provided is invalid. Please double check you copied the token correctly from your email, or generate a new one <Link to={'/forgot-password'}>here</Link>.</AlertMessage>
          }
        </>}
    </section>
  )
}