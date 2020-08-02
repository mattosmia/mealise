import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import Autosuggest from 'react-autosuggest';
import { endpointRoots } from '../../helpers/endpointRoots';

import Button from '../elements/Button';
import Select from '../elements/Select';
import Tooltip from '../elements/Tooltip';
import Input from '../elements/Input';
import { floatRegex } from '../../helpers/formValidationPatterns';

import formValidation from '../../helpers/formValidation';
import { formFieldsSchema, formValidationSchema } from './Planner.validation';
import { authHeaders } from '../../helpers/auth';
import AlertMessage from '../elements/AlertMessage';

export default function PlannerModal({ date, plannerState, dispatch, meal, plannerModalSettings, setPlannerModalSettings }) { 
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isRequestError, setIsRequestError] = useState(false);

  const handleClose = () => setPlannerModalSettings({
    ...plannerModalSettings,
    isOpen: false
  })

  const submitCallback = formData => {
    setIsSubmitted(true);
    setIsRequestError(false);
    formData.date = new Date(new Date(formData.date).setHours(0,0,0,0));
    axios.post(`${endpointRoots.planner}add`, formData, authHeaders())
      .then(res => {
        dispatch({
          type: 'ADD_PLANNER',
          payload: res.data.data.result
        })
        setFormFields(formFieldsSchema)
        handleClose()
      }).catch(err => {
        // console.log('Error adding planner', err);
        setIsSubmitted(false);
        setIsRequestError(true);
      })
  }

  const { formFields, setFormFields, isFormValid, handleChange, handleSubmit } = formValidation(formFieldsSchema, formValidationSchema, submitCallback);

  useEffect(() => {
    setFormFields(prevState => (
      {
        ...prevState,
        mealId: { value: meal._id, error: '', isValid: !(!meal._id) }
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
    <>
      <Button
        classes="modal__close button--icon icon--cancel"
        handleClick={handleClose}
      >
        <span className="vh">Close</span>
      </Button>
      <div className="modal__content">
        <h2>Plan Meal</h2>
        { isRequestError && <AlertMessage>Something went wrong. Please try again.</AlertMessage>}
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
        <Input
          label={<>Portion <Tooltip>You can multiply or divide your original recipe if you're having guests or only cooking for yourself, for example. Simply enter how much we should multiply the ingredients for, e.g 2 doubles them, 0.5 halves them.</Tooltip></>}
          name="recipePortion"
          handleChange={e => {
            let portion = e.target.value.replace(/[^\d\.]/g,'');
            if (!portion || floatRegex.test(portion)) {
              setFormFields(prevState => (
                {
                  ...prevState,
                  recipePortion: {
                    value: portion,
                    error: '',
                    isValid: true
                  }
                }
              ))
            }
          }}
          value={formFields.date.recipePortion}
          isRequired={true}
          isDisabled={false}
        />
        
        <Button
            handleClick={handleSubmit}
            isDisabled={!isFormValid || isSubmitted}
          >
            Plan meal
          </Button>
      </div>
    </>
  )
}

PlannerModal.propTypes = {
  date: PropTypes.object,
  plannerState: PropTypes.object,
  dispatch: PropTypes.func,
  meal: PropTypes.object,
  plannerModalSettings: PropTypes.object,
  setPlannerModalSettings: PropTypes.func,
}