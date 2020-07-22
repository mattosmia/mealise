import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import Autosuggest from 'react-autosuggest';

import PageContext from '../../helpers/pageContext';
import { endpointRoots } from '../../helpers/endpointRoots';

import Button from '../elements/Button';
import Select from '../elements/Select';

import formValidation from '../../helpers/formValidation';
import { formFieldsSchema, formValidationSchema } from './Planner.validation';
import { authHeaders } from '../../helpers/auth';

export default function PlannerModal({ date, plannerState, meal, plannerModalSettings, setPlannerModalSettings }) {
  const page = useContext(PageContext);
  
  const handleClose = () => setPlannerModalSettings({
    ...plannerModalSettings,
    isOpen: false
  })

  const submitCallback = (formData, isAddAsNew) => {
    const requestType = formData._id && ! isAddAsNew? 'edit': 'add';
    formData.date = new Date(new Date(formData.date).setHours(0,0,0,0));
    if (!page.isLoading) page.setIsLoading(true);
    axios.post(`${endpointRoots.planner}${requestType}`, formData, authHeaders())
      .then(res => {
        if (requestType === 'edit') {
          dispatch({
            type: 'EDIT_PLANNER',
            payload: formData
          })
        }
        else {
          dispatch({
            type: 'ADD_PLANNER',
            payload: res.data.data.result
          })
        }
        setFormFields(formFieldsSchema)
      }).catch(err => 
        console.log('ERROR',err)
      ).finally(() =>
        handleClose(),page.setIsLoading(false)
      );
  }

  const { formFields, setFormFields, isFormValid, handleChange, handleSubmit } = formValidation(formFieldsSchema, formValidationSchema, submitCallback);

  useEffect(() => {
    setFormFields(prevState => (
      {
        ...prevState,
        mealId: { value: meal._id, error: '', isValid: true }
      }
    ))
  }, [])

  useEffect(() => {
    if (date !== formFields.date.value) {
      handleSetMealDate(date)
    }
  }, [date])


  const [recipeSuggestions, setRecipeSuggestions] = useState([]);
  const [recipeSuggestionValue, setRecipeSuggestionValue] = useState('');

  const handleSetMealDate = newDate => {
    if (!newDate) newDate = new Date();
    setFormFields(prevState => (
      {
        ...prevState,
        date: {
          value: newDate,
          error: '',
          isValid: true
        }
      }
    ))
  }

  // Recipe form - recipes autocomplete
  const getRecipeSuggestions = value => {
    if (value) {
      const escapedValue = value.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (escapedValue === '') return [];
      const regex = new RegExp(escapedValue,'i');
      return plannerState.recipeList.filter(recipe => regex.test(recipe.name));
    }
  }

  const handleRecipeSuggestionChange = (e, { newValue }) => {
    setRecipeSuggestionValue(newValue)
  }

  const handleIngredientSuggestionBlur = () => {
    if (formFields.recipeId === '') {
      setRecipeSuggestionValue('')
    }
  }

  const inputProps = {
    placeholder: 'Start typing recipe name',
    value: recipeSuggestionValue,
    onChange: handleRecipeSuggestionChange,
    onBlur: handleIngredientSuggestionBlur
  }

  return (
    <div className="planner__modal">
        <Button
          classes="planner__modal__close button--icon icon--close"
          handleClick={handleClose}
        >
          <span className="vh">Close</span>
        </Button>
      <div className="planner__modal__content">
        <h2>Plan Meal</h2>
        <label onClick={e => e.preventDefault()}>
          <span className="label--required">Date: </span>
          <DatePicker
              selected={formFields.date.value}
              onChange={d => handleSetMealDate(d)}
              todayButton="Today"
              dateFormat="dd/MM/yyyy"
          />
        </label>
        <Select
            label="Meal"
            name="mealId"
            options={plannerState.mealList}
            selectedOption={meal._id}
            placeholderOption="Select an option"
            handleChange={handleChange}
            errorMsg={formFields.mealId.error}
            isRequired={formValidationSchema.mealId.required}
          />
        <label>
          <span className="label--required">Recipe name</span>
          <Autosuggest
              id="recipes-autocomplete"
              suggestions={recipeSuggestions}
              onSuggestionsFetchRequested={({ value }) =>
                setRecipeSuggestions(getRecipeSuggestions(value))
              }
              onSuggestionsClearRequested={() => 
                setRecipeSuggestions([])
              }
              getSuggestionValue={recipe => {
                  setFormFields(prevState => (
                    {
                      ...prevState,
                      recipeId: {
                        value: recipe._id,
                        error: '',
                        isValid: true
                      }
                    }
                  ))
                  return recipe.name
              }}
              renderSuggestion={recipe =>
                  <span>{ recipe.name }</span>
              }
              inputProps={inputProps}
              highlightFirstSuggestion={true}
          />
        </label>
        <Button
            handleClick={handleSubmit}
            isDisabled={!isFormValid}
          >
            Plan meal
          </Button>
      </div>
    </div>
  )
}

PlannerModal.propTypes = {
  date: PropTypes.object,
  plannerState: PropTypes.object,
  meal: PropTypes.object,
  plannerModalSettings: PropTypes.object,
  setPlannerModalSettings: PropTypes.func,
}