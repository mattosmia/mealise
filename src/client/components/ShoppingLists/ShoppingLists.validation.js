import { requiredMsg, extendedNameRegex, extendedNameRegexMsg } from '../../helpers/formValidationPatterns';

export const formFieldsSchema = {
  _id: { value: '', error: '', isValid: true },
  name: { value: '', error: '', isValid: false }
}

export const formValidationSchema = {
  name: {
    required: true,
    requiredError: requiredMsg('Shopping list name'),
    pattern: extendedNameRegex,
    patternError: extendedNameRegexMsg('Shopping list name')
  }
};