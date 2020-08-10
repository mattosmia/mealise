import { requiredMsg, extendedNameRegex, extendedNameRegexMsg } from '../../helpers/formValidationPatterns';

export const formFieldsSchema = {
  _id: { value: '', error: '', isValid: true },
  name: { value: '', error: '', isValid: false },
  unit: { value: '', error: '', isValid: false }
}

export const formValidationSchema = {
  name: {
    required: true,
    requiredError: requiredMsg('Ingredient name'),
    pattern: extendedNameRegex,
    patternError: extendedNameRegexMsg('Ingredient name')
  },
  unit: {
    required: true,
    requiredError: requiredMsg('Ingredient unit')
  },
};