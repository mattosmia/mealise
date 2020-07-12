import { useState, useEffect } from 'react';

export default function formValidation(formFieldsSchema, formValidationSchema = {}, callback) {
  const [formFields, setFormFields] = useState(formFieldsSchema);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  
  useEffect(() => {
    setIsFormValid(false);
  }, []);

  useEffect(() => {
    // console.log('!!',isDirty)
    // if (isDirty) {
      setIsFormValid(! Object.keys(formFields).some(key => !formFields[key].isValid));
    // }
  }, [formFields, isDirty]);

  // Used to handle every changes in every input
  const handleChange = e => {
    setIsDirty(true);
    const fieldName = e.target.name;
    let value;

    switch (e.target.type) {
			case 'checkbox':
				value = e.target.checked;
			break;
			default:
				value = e.target.value;
		}

    let error = '';

    if (formValidationSchema[fieldName].required) {
      if (!value) {
        error = formValidationSchema[fieldName].requiredError || 'This field is required';
      }
    }

    if (formValidationSchema[fieldName].pattern) {
      if (value && !formValidationSchema[fieldName].pattern.test(value)) {
        error = formValidationSchema[fieldName].patternError || 'Field format is invalid';
      }
    }

    if (formValidationSchema[fieldName].minLength) {
      if (value && value.length < minLength) {
        error = formValidationSchema[fieldName].minLengthError || 'Field length is too short';
      }
    }

    // if (formValidationSchema[name].match) {
    //   if (value && formFields[formValidationSchema[name].match].value) {
    //     error = formValidationSchema[name].patternError || 'Field format is invalid';
    //   }
    // }

    setFormFields(prevState => ({
      ...prevState,
      [fieldName]: { value, error, isValid: (error === '') }
    }), [formValidationSchema]);
  }

  const handleSubmit = (e, props) => {
    e.preventDefault();
    if (isFormValid) {
      callback(Object.fromEntries(Object.entries(formFields).map(key => [key[0], key[1].value])), props);
    }
  }

  return { formFields, setFormFields, isFormValid, handleChange, handleSubmit };
}