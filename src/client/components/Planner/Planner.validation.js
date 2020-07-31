import { requiredMsg, dateRegex, dateRegexMsg, objectIdRegex, objectIdRegexMsg, floatRegex, floatRegexMsg } from '../../helpers/formValidationPatterns';

export const formFieldsSchema = {
  _id: { value: '', error: '', isValid: true },
  date: { value: '', error: '', isValid: false },
  mealId: { value: '', error: '', isValid: false },
  recipeId: { value: '', error: '', isValid: false },
  recipePortion: { value: 1, error: '', isValid: true },
}

export const formValidationSchema = {
  date: {
    required: true,
    requiredError: requiredMsg('Date'),
    pattern: dateRegex,
    patternError: dateRegexMsg('Date')
  },
  mealId: {
    required: true,
    requiredError: requiredMsg('Meal'),
    pattern: objectIdRegex,
    patternError: objectIdRegexMsg('Meal')
  },
  recipeId: {
    required: true,
    requiredError: requiredMsg('Recipe'),
    pattern: objectIdRegex,
    patternError: objectIdRegexMsg('Recipe'),
  },
  recipePortion: {
    required: false,
    pattern: floatRegex,
    patternError: floatRegexMsg('Recipe portion'),
  },
};