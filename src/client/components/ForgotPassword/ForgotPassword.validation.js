import { requiredMsg, emailRegex, emailRegexMsg } from '../../helpers/formValidationPatterns';

export const formFieldsSchema = {
  email: { value: '', error: '', isValid: false },
}

export const formValidationSchema = {
  email: {
    required: true,
    requiredError: requiredMsg('Email address'),
    pattern: emailRegex,
    patternError: emailRegexMsg('Email address'),
  },
};