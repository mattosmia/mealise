import { extendedNameRegex } from '../../helpers/formValidationPatterns';

export const formFieldsSchema = {
  _id: { value: '', error: '', isValid: true },
  name: { value: '', error: '', isValid: false },
  unit: { value: '', error: '', isValid: false }
}

export const formValidationSchema = {
  name: {
    required: true,
    requiredError: 'Ingredient name is required',
    pattern: extendedNameRegex,
    patternError: 'Ingredient name is not valid',
  },
  unit: {
    required: true,
    requiredError: 'Ingredient unit is required',
  },
};