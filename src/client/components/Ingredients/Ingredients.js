import React, { useState, useEffect, useReducer, useContext } from 'react';
import axios from 'axios';

import { formFieldsSchema, formValidationSchema } from './Ingredients.validation';
import formValidation from '../../helpers/formValidation';
import { authHeaders } from '../../helpers/auth';

import ingredientsReducer from './Ingredients.reducer';
import SidebarForm from '../elements/SidebarForm';
import PageContext from '../../helpers/pageContext';
import Input from '../elements/Input';
import Select from '../elements/Select';
import Button from '../elements/Button';

import { endpointRoots } from '../../helpers/endpointRoots';
import { units } from '../../helpers/units';
import AlertMessage from '../elements/AlertMessage';

import './Ingredients.scss';

export default function Ingredients() {
  const page = useContext(PageContext);
  const [isRequestError, setIsRequestError] = useState(false);
  const [isRequestSuccess, setIsRequestSuccess] = useState(false);
  const [isSidebarRequestError, setIsSidebarRequestError] = useState(false);
  const [isEditingForm, setIsEditingForm] = useState(false);

  const [ingredientsState, dispatch] = useReducer(ingredientsReducer, []);
  
  useEffect(() => {
    if (!page.isLoading) page.setIsLoading(true);
    axios.get(endpointRoots.ingredient, authHeaders())
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
    if (!page.isLoading) page.setIsLoading(true);
    setIsSidebarRequestError(false);
    setIsRequestSuccess(false);
    axios.post(`${endpointRoots.ingredient}${requestType}`, formData, authHeaders())
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
        setIsEditingForm(false)
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
    setIsEditingForm(true);
    setFormFields({
      _id: { value: ingredient._id, error: '', isValid: true },
      name: { value: ingredient.name, error: '', isValid: true },
      unit: { value: ingredient.unit, error: '', isValid: true },
    });
  }

  const handleDeleteIngredient = ingredient => {
    if (confirm("Are you sure you want to delete this ingredient?\n\nIt will also be deleted from any meals that currently use it.\n\nATTENTION: This action cannot be undone!")) {
      if (!page.isLoading) page.setIsLoading(true);
      setIsRequestSuccess(false);
      setIsRequestError(false);
      axios.post(`${endpointRoots.ingredient}delete`, { _id: ingredient._id }, authHeaders())
        .then(res => {
          setIsRequestSuccess(true);
          dispatch({
            type: 'DELETE_INGREDIENT',
            payload: ingredient
          })
        }).catch(err => 
          setIsRequestError(true)
        ).finally(() =>
          page.setIsLoading(false)
        );
    }
  }

  const handleCancelEdit = () => {
    setFormFields(formFieldsSchema);
    setIsEditingForm(false);
    setIsSidebarRequestError(false);
  }

  return (
    <section className="ingredients">
      <h1>Ingredients</h1>
      <div className="ingredients__wrapper main-wrapper">
        <div className="ingredients__main main-content">
        {! page.isLoading && <>
          { isRequestError && <AlertMessage>Something went wrong. Please try again.</AlertMessage>}
          { isRequestSuccess && <AlertMessage type="success">Your ingredients have been successfully updated!</AlertMessage>}
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
                          <Button
                            classes="button--icon icon--edit"
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
          <h2>{ isEditingForm ? "Edit" : "Add" } ingredient</h2>
            { isSidebarRequestError && <AlertMessage>Something went wrong. Please try again.</AlertMessage>}
          <Input
            label="Ingredient name"
            name="name"
            value={formFields.name.value}
            handleChange={handleChange}
            errorMsg={formFields.name.error}
            isRequired={formValidationSchema.name.required}
          />
          <Select
            label="Ingredient unit"
            name="unit"
            options={units}
            selectedOption={formFields.unit.value}
            placeholderOption="Select an option"
            handleChange={handleChange}
            errorMsg={formFields.unit.error}
            isRequired={formValidationSchema.unit.required}
          />
          <Button
            handleClick={handleSubmit}
            isDisabled={!isFormValid}
          >
            { isEditingForm ? "Update ingredient" : "Add ingredient" }
          </Button>

          { isEditingForm && <>
            <Button
              handleClick={e => handleSubmit(e, 'add_as_new')}
              isDisabled={!isFormValid}
            >
              Add as new ingredient
            </Button>
            <Button
              handleClick={handleCancelEdit}
            >
              Cancel
            </Button>
          </>}
          </>
        </SidebarForm>
      </div>
    </section>
  )
}