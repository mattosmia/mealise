import { requiredMsg, passwordRegex, passwordRegexMsg, minLengthMsg } from '../../helpers/formValidationPatterns';

export const formFieldsSchema = {
  password: { value: '', error: '', isValid: false },
  passwordConfirmation: { value: '', error: '', isValid: false },
}

export const formValidationSchema = {
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
  },
};