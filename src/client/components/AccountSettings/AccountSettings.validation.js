import { requiredMsg, nameRegex, nameRegexMsg, emailRegex, emailRegexMsg, passwordRegex, passwordRegexMsg, minLength, minLengthMsg } from '../../helpers/formValidationPatterns';

export const formFieldsSchema = {
  firstName: { value: '', error: '', isValid: false },
  lastName: { value: '', error: '', isValid: false },
  email: { value: '', error: '', isValid: false },
  acceptMkt: { value: '', error: '', isValid: true },
}

export const passwordFormFieldsSchema = {
  currentPassword: { value: '', error: '', isValid: false },
  newPassword: { value: '', error: '', isValid: false },
  newPasswordConfirmation: { value: '', error: '', isValid: false },
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
    requiredError: requiredMsg('Email address'),
    pattern: emailRegex,
    patternError: emailRegexMsg('Email address'),
  },
  acceptMkt: {
    required: false,
  },
};

export const passwordFormValidationSchema = {
  currentPassword: {
    required: true,
    requiredError: 'You must enter your current password in order to change it',
  },
  newPassword: {
    required: true,
    pattern: passwordRegex,
    patternError: passwordRegexMsg(),
    match: 'newPasswordConfirmation',
    matchError: 'Passwords do not match',
    minLength: 8,
    minLengthError: minLengthMsg('Password', 8)
  },
  newPasswordConfirmation: {
    required: true,
    pattern: passwordRegex,
    patternError: passwordRegexMsg(),
    match: 'newPassword',
    matchError: 'Passwords do not match',
  },
}