import { requiredMsg, extendedNameRegex, extendedNameRegexMsg } from '../../helpers/formValidationPatterns';

export const formFieldsSchema = {
  _id: { value: '', error: '', isValid: true },
  name: { value: '', error: '', isValid: false },
  description: { value: '', error: '', isValid: true },
  instructions: { value: '', error: '', isValid: true }
}

export const formValidationSchema = {
  name: {
    required: true,
    requiredError: requiredMsg('Recipe name'),
    pattern: extendedNameRegex,
    patternError: extendedNameRegexMsg('Recipe name'),
  },
  description: {
    required: false
  },
  instructions: {
    required: false
  },
};