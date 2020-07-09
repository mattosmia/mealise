import { nameRegex, emailRegex, passwordRegex } from '../../helpers/formValidationPatterns';

export const formFieldsSchema = {
  firstName: { value: '', error: '', isValid: false },
  lastName: { value: '', error: '', isValid: false },
  email: { value: '', error: '', isValid: false },
  emailConfirmation: { value: '', error: '', isValid: false },
  password: { value: '', error: '', isValid: false },
  passwordConfirmation: { value: '', error: '', isValid: false },
  acceptOver18: { value: '', error: '', isValid: false },
  acceptTerms: { value: '', error: '', isValid: false },
  acceptMkt: { value: '', error: '', isValid: false },
}

export const formValidationSchema = {
  firstName: {
    required: true,
    requiredError: 'First name is required',
    pattern: nameRegex,
    patternError: 'First name is not valid',
  },
  lastName: {
    required: true,
    requiredError: 'Last name is required',
    pattern: nameRegex,
    patternError: 'Last name is not valid',
  },
  email: {
    required: true,
    requiredError: 'Email is required',
    pattern: emailRegex,
    patternError: 'Email address is not valid',
    match: 'emailConfirmation',
    matchError: 'Email addresses do not match',
  },
  emailConfirmation: {
    required: true,
    requiredError: 'Email confirmation is required',
    pattern: emailRegex,
    patternError: 'Email address is not valid',
    match: 'email',
    matchError: 'Email addresses do not match',
  },
  password: {
    required: true,
    requiredError: 'Password is required',
    pattern: passwordRegex,
    patternError: 'Passwords must contain at least one lowercase character, one uppercase character and one digit',
    match: 'passwordConfirmation',
    matchError: 'Passwords do not match',
  },
  passwordConfirmation: {
    required: true,
    requiredError: 'Password confirmation is required',
    pattern: passwordRegex,
    patternError: 'Passwords must contain at least one lowercase character, one uppercase character and one digit',
    match: 'password',
    matchError: 'Passwords do not match',
  },
  acceptOver18: {
    required: true,
    requiredError: 'You must accept you are over 18',
  },
  acceptTerms: {
    required: true,
    requiredError: 'You must accept our terms & conditions',
  },
  acceptMkt: {
    required: false,
  },
};