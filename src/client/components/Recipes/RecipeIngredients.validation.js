import { requiredMsg, floatRegex, floatRegexMsg } from '../../helpers/formValidationPatterns';

export const formFieldsSchema = {
  _id: { value: '', error: '', isValid: false },
  name: { value: '', error: '', isValid: true },
  qty: { value: '', error: '', isValid: false },
}

export const formValidationSchema = {
  _id: {
    required: true,
    requiredError: requiredMsg('Ingredient'),
    pattern: extendedNameRegex,
    patternError: extendedNameRegexMsg('Ingredient'),
  },
  qty: {
    required: true,
    requiredError: requiredMsg('Ingredient quantity'),
    pattern: floatRegex,
    patternError: floatRegex('Ingredient quantity'),
  },
};