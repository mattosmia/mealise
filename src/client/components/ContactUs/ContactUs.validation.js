import { requiredMsg, extendedNameRegex, extendedNameRegexMsg, nameRegexMsg, nameRegex, emailRegexMsg, emailRegex } from '../../helpers/formValidationPatterns';

export const formFieldsSchema = {
  name: { value: '', error: '', isValid: false },
  email: { value: '', error: '', isValid: false },
  subject: { value: '', error: '', isValid: false },
  message: { value: '', error: '', isValid: false }
}

export const formValidationSchema = {
  name: {
    required: true,
    requiredError: requiredMsg('Name'),
    pattern: nameRegex,
    patternError: nameRegexMsg('Name')
  },
  email: {
    required: true,
    requiredError: requiredMsg('Email'),
    pattern: emailRegex,
    patternError: emailRegexMsg('Email')
  },
  subject: {
    required: true,
    requiredError: requiredMsg('Subject'),
    pattern: extendedNameRegex,
    patternError: extendedNameRegexMsg('Subject')
  },
  message: {
    required: true,
    requiredError: requiredMsg('Message')
  },
};