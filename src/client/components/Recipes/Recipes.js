import React, { useState, useEffect, useReducer, useContext } from 'react';
import axios from 'axios';

import { formFieldsSchema, formValidationSchema } from './Recipes.validation';
import formValidation from '../../helpers/formValidation';
import { authHeaders } from '../../helpers/auth';

import './Recipes.scss';
import Button from '../elements/Button';

import recipesReducer from './Recipes.reducer';
import SidebarForm from '../elements/SidebarForm';
import PageContext from '../../helpers/pageContext';
import Input from '../elements/Input';

const endpointRoot = '/api/recipe/'

export default function Recipes() {
  const page = useContext(PageContext);
  const [isRequestError, setIsRequestError] = useState(false);
  const [isRequestSuccess, setIsRequestSuccess] = useState(false);
  const [isSidebarRequestError, setIsSidebarRequestError] = useState(false);
  const [editState, setEditState] = useState(false);

  const [recipesState, dispatch] = useReducer(recipesReducer, []);
  

  useEffect(() => {
    if (!page.isLoading) page.setIsLoading(true);
    axios.get(endpointRoot, authHeaders())
    .then(res => {
      const recipeList = res.data.data || [];
      dispatch({
        type: 'GET_INGREDIENT_LIST',
        payload: recipeList
      })
    }).catch(err => 
      console.log('Error fetching recipes', err)
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


  const handleEditRecipe = recipe => {
    setIsRequestError(false);
    setIsRequestSuccess(false);
    setIsSidebarRequestError(false);
    setEditState(true);
    setFormFields({
      _id: { value: recipe._id, error: '', isValid: true },
      name: { value: recipe.name, error: '', isValid: true },
      unit: { value: recipe.unit, error: '', isValid: true },
    });
  }

  const handleDeleteRecipe = recipe => {
    page.setIsLoading(true);
    setIsRequestSuccess(false);
    setIsRequestError(false);
    axios.post(`${endpointRoot}delete`, { _id: recipe._id }, authHeaders())
      .then(res => 
        setIsRequestSuccess(true),
        dispatch({
          type: 'DELETE_INGREDIENT',
          payload: recipe
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
    <section className="recipes">
      <h1>Recipes</h1>
      <div className="recipes__wrapper main-wrapper">
        <div className="recipes__main main-content">
        {! page.isLoading && <>
          { isRequestError && <p className="p--error">Something went wrong. Please try again.</p>}
          { isRequestSuccess && <p className="p--success">Your recipes have been successfully updated!</p>}
          { recipesState.length > 0 ? 
            <ul
              className="recipes__list list"
            >
              {recipesState.map(recipe => (
                    <li
                      className="recipes__list__item list__item"
                      key={recipe._id}
                    >
                      <div className="recipes__list__item__inner list__item__inner">
                        {recipe.name} ({recipe.unit})
                        <span className="recipes__list__item__buttons list__item__buttons">
                          <Button classes="button--icon icon--edit"
                            handleClick={() => handleEditRecipe(recipe)}
                          >
                            <span className="vh">Edit</span>
                          </Button>
                          <Button
                            classes="button--icon icon--delete"
                            handleClick={() => handleDeleteRecipe(recipe)}
                          >
                            <span className="vh">Delete</span>
                          </Button>
                        </span>
                      </div>
                    </li>
                  ))}
            </ul>
            :
            <p>You haven't added any recipes yet.</p>
          }
        </>}
        </div>
        <SidebarForm classes={['recipes__side']}>
          <>
          <h2>{ editState? "Edit" : "Add" } recipe</h2>
          <div className="form--error" aria-live="assertive">
            { isSidebarRequestError && <p className="p--error">Something went wrong. Please try again.</p>}
          </div>
          <Input label="Recipe name" name="name" value={formFields.name.value} handleChange={handleChange} errorMsg={formFields.name.error} />
          <Input label="Recipe unit" name="unit" value={formFields.unit.value} handleChange={handleChange} errorMsg={formFields.unit.error} />

          <Button handleClick={handleSubmit} isDisabled={!isFormValid}><>{ editState? "Edit" : "Add" } recipe</></Button>
          { editState && <>
            <Button handleClick={e => handleSubmit(e, 'add_as_new')} isDisabled={!isFormValid}>Add as new recipe</Button>
            <Button handleClick={handleCancelEdit}>Cancel</Button>
          </>}
          </>
        </SidebarForm>
      </div>
    </section>
  )
}