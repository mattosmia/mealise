import { extendedNameRegex, colourRegex, intRegex } from '../../helpers/formValidationPatterns';

export const formFieldsSchema = {
  _id: { value: '', error: '', isValid: true },
  name: { value: '', error: '', isValid: false },
  colour: { value: '', error: '', isValid: false },
  order: { value: 0, error: '', isValid: true },
}

export const formValidationSchema = {
  name: {
    required: true,
    requiredError: 'Meal name is required',
    pattern: extendedNameRegex,
    patternError: 'Meal name is not valid',
  },
  colour: {
    required: true,
    requiredError: 'Colour label is required',
    pattern: colourRegex,
    patternError: 'Colour label is not valid',
  },
  order: {
    required: false,
    pattern: intRegex,
    patternError: 'Order is not valid',
  },
};