import React, { useState, useEffect, useReducer, useContext } from 'react';
import axios from 'axios';

import { formFieldsSchema, formValidationSchema } from './Ingredients.validation';
import formValidation from '../../helpers/formValidation';
import { authHeaders } from '../../helpers/auth';

import './Ingredients.scss';
import Button from '../elements/Button';

import ingredientsReducer from './Ingredients.reducer';
import SidebarForm from '../elements/SidebarForm';
import PageContext from '../../helpers/pageContext';
import Input from '../elements/Input';

const endpointRoot = '/api/ingredient/'

export default function Ingredients() {
  const page = useContext(PageContext);
  const [isRequestError, setIsRequestError] = useState(false);
  const [isRequestSuccess, setIsRequestSuccess] = useState(false);
  const [isSidebarRequestError, setIsSidebarRequestError] = useState(false);
  const [editState, setEditState] = useState(false);

  const [ingredientsState, dispatch] = useReducer(ingredientsReducer, []);
  

  useEffect(() => {
    if (!page.isLoading) page.setIsLoading(true);
    axios.get(endpointRoot, authHeaders())
    .then(res => {
      const ingredientList = res.data.data || [];
      dispatch({
        type: 'GET_INGREDIENT_LIST',
        payload: ingredientList
      })
    }).catch(err => 
      console.log('Error fetching ingredients', err)
    ).finally(() =>
      page.setIsLoading(false)
    )
  }, []);

  const submitCallback = (formData, isAddAsNew) => {
    const requestType = formData._id && ! isAddAsNew? 'edit': 'add';
    page.setIsLoading(true);
    setIsSidebarRequestError(false);
    setIsRequestSuccess(false);
    axios.post(`${endpointRoot}${requestType}`, formData, authHeaders())
      .then(res => {
        if (requestType === 'edit') {
          dispatch({
            type: 'EDIT_INGREDIENT',
            payload: formData
          })
        }
        else {
          dispatch({
            type: 'ADD_INGREDIENT',
            payload: res.data.data.result
          })
        }
        setFormFields(formFieldsSchema)
        setEditState(false)
        setIsRequestSuccess(true)
      }).catch(err => 
        setIsSidebarRequestError(true)
      ).finally(() =>
        page.setIsLoading(false)
      );
  }

  const { formFields, setFormFields, isFormValid, handleChange, handleSubmit } = formValidation(formFieldsSchema, formValidationSchema, submitCallback);


  const handleEditIngredient = ingredient => {
    setIsRequestError(false);
    setIsRequestSuccess(false);
    setIsSidebarRequestError(false);
    setEditState(true);
    setFormFields({
      _id: { value: ingredient._id, error: '', isValid: true },
      name: { value: ingredient.name, error: '', isValid: true },
      unit: { value: ingredient.unit, error: '', isValid: true },
    });
  }

  const handleDeleteIngredient = ingredient => {
    page.setIsLoading(true);
    setIsRequestSuccess(false);
    setIsRequestError(false);
    axios.post(`${endpointRoot}delete`, { _id: ingredient._id }, authHeaders())
      .then(res => 
        setIsRequestSuccess(true),
        dispatch({
          type: 'DELETE_INGREDIENT',
          payload: ingredient
        })
      ).catch(err => 
        setIsRequestError(true)
      ).finally(() =>
        page.setIsLoading(false)
      );
  }

  const handleCancelEdit = () => {
    setFormFields(formFieldsSchema);
    setColour(initialColour);
    setEditState(false);
    setIsSidebarRequestError(false);
  }

  return (
    <section className="ingredients">
      <h1>Ingredients</h1>
      <div className="ingredients__wrapper main-wrapper">
        <div className="ingredients__main main-content">
        {! page.isLoading && <>
          { isRequestError && <p className="p--error">Something went wrong. Please try again.</p>}
          { isRequestSuccess && <p className="p--success">Your ingredients have been successfully updated!</p>}
          { ingredientsState.length > 0 ? 
            <ul
              className="ingredients__list list"
            >
              {ingredientsState.map(ingredient => (
                    <li
                      className="ingredients__list__item list__item"
                      key={ingredient._id}
                    >
                      <div className="ingredients__list__item__inner list__item__inner">
                        {ingredient.name} ({ingredient.unit})
                        <span className="ingredients__list__item__buttons list__item__buttons">
                          <Button classes="button--icon icon--edit"
                            handleClick={() => handleEditIngredient(ingredient)}
                          >
                            <span className="vh">Edit</span>
                          </Button>
                          <Button
                            classes="button--icon icon--delete"
                            handleClick={() => handleDeleteIngredient(ingredient)}
                          >
                            <span className="vh">Delete</span>
                          </Button>
                        </span>
                      </div>
                    </li>
                  ))}
            </ul>
            :
            <p>You haven't added any ingredients yet.</p>
          }
        </>}
        </div>
        <SidebarForm classes={['ingredients__side']}>
          <>
          <h2>{ editState? "Edit" : "Add" } ingredient</h2>
          <div className="form--error" aria-live="assertive">
            { isSidebarRequestError && <p className="p--error">Something went wrong. Please try again.</p>}
          </div>
          <Input label="Ingredient name" name="name" value={formFields.name.value} handleChange={handleChange} errorMsg={formFields.name.error} isRequired={formValidationSchema.name.required} />
          <Input label="Ingredient unit" name="unit" value={formFields.unit.value} handleChange={handleChange} errorMsg={formFields.unit.error} isRequired={formValidationSchema.unit.required} />

          <Button handleClick={handleSubmit} isDisabled={!isFormValid}><>{ editState? "Edit" : "Add" } ingredient</></Button>
          { editState && <>
            <Button handleClick={e => handleSubmit(e, 'add_as_new')} isDisabled={!isFormValid}>Add as new ingredient</Button>
            <Button handleClick={handleCancelEdit}>Cancel</Button>
          </>}
          </>
        </SidebarForm>
      </div>
    </section>
  )
}