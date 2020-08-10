import { requiredMsg, minLengthMsg, nameRegex, nameRegexMsg, emailRegex, emailRegexMsg, passwordRegex, passwordRegexMsg } from '../../helpers/formValidationPatterns';

export const formFieldsSchema = {
  firstName: { value: '', error: '', isValid: false },
  lastName: { value: '', error: '', isValid: false },
  email: { value: '', error: '', isValid: false },
  emailConfirmation: { value: '', error: '', isValid: false },
  password: { value: '', error: '', isValid: false },
  passwordConfirmation: { value: '', error: '', isValid: false },
  acceptOver18: { value: '', error: '', isValid: false },
  acceptTerms: { value: '', error: '', isValid: false },
  acceptMkt: { value: '', error: '', isValid: true },
}

export const formValidationSchema = {
  firstName: {
    required: true,
    requiredError: requiredMsg('First name'),
    pattern: nameRegex,
    patternError: nameRegexMsg('First name'),
  },
  lastName: {
    required: true,
    requiredError: requiredMsg('Last name'),
    pattern: nameRegex,
    patternError: nameRegexMsg('Last name'),
  },
  email: {
    required: true,
    requiredError: requiredMsg('Email'),
    pattern: emailRegex,
    patternError: emailRegexMsg('Email'),
    match: 'emailConfirmation',
    matchError: 'Email addresses do not match',
  },
  emailConfirmation: {
    required: true,
    requiredError: requiredMsg('Email confirmation'),
    pattern: emailRegex,
    patternError: emailRegexMsg('Email confirmation'),
    match: 'email',
    matchError: 'Email addresses do not match',
  },
  password: {
    required: true,
    requiredError: requiredMsg('Password'),
    pattern: passwordRegex,
    patternError: passwordRegexMsg(),
    match: 'passwordConfirmation',
    matchError: 'Passwords do not match',
    minLength: 8,
    minLengthError: minLengthMsg('Password', 8)
  },
  passwordConfirmation: {
    required: true,
    requiredError: requiredMsg('Password confirmation'),
    pattern: passwordRegex,
    patternError: passwordRegexMsg(),
    match: 'password',
    matchError: 'Passwords do not match',
    minLength: 8,
    minLengthError: minLengthMsg('Password', 8)
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