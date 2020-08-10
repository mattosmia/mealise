import { requiredMsg, extendedNameRegex, extendedNameRegexMsg, colourRegex, colourRegexMsg, intRegex, intRegexMsg } from '../../helpers/formValidationPatterns';

export const formFieldsSchema = {
  _id: { value: '', error: '', isValid: true },
  name: { value: '', error: '', isValid: false },
  colour: { value: '', error: '', isValid: false },
  order: { value: 0, error: '', isValid: true },
}

export const formValidationSchema = {
  name: {
    required: true,
    requiredError: requiredMsg('Meal name'),
    pattern: extendedNameRegex,
    patternError: extendedNameRegexMsg('Meal name')
  },
  colour: {
    required: true,
    requiredError: requiredMsg('Meal colour label'),
    pattern: colourRegex,
    patternError: colourRegexMsg('Meal colour label')
  },
  order: {
    required: false,
    pattern: intRegex,
    patternError: intRegexMsg('Order'),
  },
};