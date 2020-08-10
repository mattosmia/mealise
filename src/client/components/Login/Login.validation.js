import { requiredMsg, emailRegex, emailRegexMsg, passwordRegex, passwordRegexMsg } from '../../helpers/formValidationPatterns';

export const formFieldsSchema = {
  email: { value: '', error: '', isValid: false },
  password: { value: '', error: '', isValid: false },
}

export const formValidationSchema = {
  email: {
    required: true,
    requiredError: requiredMsg('Email address'),
    pattern: emailRegex,
    patternError: emailRegexMsg('Email address'),
  },
  password: {
    required: true,
    requiredError: requiredMsg('Password'),
    pattern: passwordRegex,
    patternError: passwordRegexMsg(),
  },
};