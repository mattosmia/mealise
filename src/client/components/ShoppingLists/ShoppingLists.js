import React, { useState, useEffect, useReducer, useContext } from 'react';
import axios from 'axios';

import { formFieldsSchema, formValidationSchema } from './ShoppingLists.validation';
import formValidation from '../../helpers/formValidation';
import { authHeaders } from '../../helpers/auth';
import { endpointRoots } from '../../helpers/endpointRoots';

import shoppingListsReducer from './ShoppingLists.reducer';

import SidebarForm from '../elements/SidebarForm';
import PageContext from '../../helpers/pageContext';
import Input from '../elements/Input';
import Button from '../elements/Button';
import AlertMessage from '../elements/AlertMessage';

import { handleToggleExpand, handleCollapseAll, handleExpandAll } from '../../helpers/accordion';

import './ShoppingLists.scss';

export default function ShoppingLists() {
  const page = useContext(PageContext);
  const [shoppingListState, dispatch] = useReducer(shoppingListsReducer, []);
  const [isRequestError, setIsRequestError] = useState(false);
  const [isRequestSuccess, setIsRequestSuccess] = useState(false);
  const [isSidebarRequestError, setIsSidebarRequestError] = useState(false);
  const [isEditingForm, setIsEditingForm] = useState(false);

  useEffect(() => {
    if (!page.isLoading) page.setIsLoading(true);
    axios.get(endpointRoots.shoppinglist, authHeaders())
    .then(res => {
      const shoppingList = res.data.data || [];
      dispatch({
        type: 'GET_SHOPPINGLIST_LIST',
        payload: shoppingList
      })
    }).catch(err => 
      console.log('Error fetching shopping lists', err)
    ).finally(() =>
      page.setIsLoading(false)
    )
  }, []);

  const submitCallback = (formData, isAddAsNew) => {
    // const requestType = formData._id && ! isAddAsNew? 'edit': 'add';
    // if (!page.isLoading) page.setIsLoading(true);
    // setIsSidebarRequestError(false);
    // setIsRequestSuccess(false);
    // axios.post(`${endpointRoots.ingredient}${requestType}`, formData, authHeaders())
    //   .then(res => {
    //     if (requestType === 'edit') {
    //       dispatch({
    //         type: 'EDIT_INGREDIENT',
    //         payload: formData
    //       })
    //     }
    //     else {
    //       dispatch({
    //         type: 'ADD_INGREDIENT',
    //         payload: res.data.data.result
    //       })
    //     }
    //     setFormFields(formFieldsSchema)
    //     setIsEditingForm(false)
    //     setIsRequestSuccess(true)
    //   }).catch(err => 
    //     setIsSidebarRequestError(true)
    //   ).finally(() =>
    //     page.setIsLoading(false)
    //   );
  }

  const { formFields, setFormFields, isFormValid, handleChange, handleSubmit } = formValidation(formFieldsSchema, formValidationSchema, submitCallback);

  const handleEditShoppingList = () => {

  }

  const handleDeleteShoppingList = shoppingList => {
    if (confirm("Are you sure you want to delete this shopping list?\n\nATTENTION: This action cannot be undone!")) {
      if (!page.isLoading) page.setIsLoading(true);
      setIsRequestSuccess(false);
      setIsRequestError(false);
      axios.post(`${endpointRoots.shoppinglist}delete`, { _id: shoppingList._id }, authHeaders())
        .then(res => {
          setIsRequestSuccess(true);
          dispatch({
            type: 'DELETE_SHOPPINGLIST',
            payload: shoppingList
          })
        }).catch(err => 
          setIsRequestError(true)
        ).finally(() =>
          page.setIsLoading(false)
        );
    }
  }

  return (
    <section className="shopping-lists">
      <h1>Shopping Lists</h1>
      <div className="shopping-lists__wrapper main-wrapper">
        <div className="shopping-lists__main main-content">
        {! page.isLoading && <>
          { isRequestError && <AlertMessage>Something went wrong. Please try again.</AlertMessage>}
          { isRequestSuccess && <AlertMessage type="success">Your shopping lists have been successfully updated!</AlertMessage>}
          { shoppingListState.length > 0 ? 
          <>
            <div className="shopping-lists__list__controls">
              <Button
                handleClick={() => handleExpandAll('.shopping-lists__list__item__expand')}
              >
                Expand all
              </Button>
              <Button
                handleClick={() => handleCollapseAll('.shopping-lists__list__item__expand')}
              >
                Collapse all
              </Button>
            </div>
            <ul
              className="shopping-lists__list list"
            >
              {shoppingListState.map(shoppingList => (
                  <li
                    className="shopping-lists__list__item list__item"
                    key={shoppingList._id}
                  >
                    <div className="shopping-lists__list__item__inner list__item__inner">
                      <div className="shopping-lists__list__item__content">
                        <Button
                          classes="shopping-lists__list__item__expand"
                          handleClick={handleToggleExpand}
                        >
                          <span>
                            {shoppingList.name}
                            <span className="vh">Expand shopping list items</span>
                          </span>
                        </Button>
                        <div className="shopping-lists__list__item__details">
                            <ul>
                              {shoppingList.items.map((item, idx) =>
                                <li
                                  key={idx}
                                >
                                  {item}
                                </li>
                              )}
                            </ul>                            
                        </div>
                      </div>
                      <span className="shopping-lists__list__item__buttons list__item__buttons">
                        <Button
                          classes="button--icon icon--edit"
                          handleClick={() => handleEditShoppingList(shoppingList)}
                        >
                          <span className="vh">Edit</span>
                        </Button>
                        <Button
                          classes="button--icon icon--delete"
                          handleClick={() => handleDeleteShoppingList(shoppingList)}
                        >
                          <span className="vh">Delete</span>
                        </Button>
                      </span>
                    </div>
                  </li>
                ))}
            </ul>
            </>
            :
            <p>You haven't added any shopping lists yet.</p>
          }
        </>}
        </div>
        <SidebarForm classes={['shopping-lists__side']}>
          <>
          <h2>{ isEditingForm ? "Edit" : "Add" } shopping list</h2>
            { isSidebarRequestError && <AlertMessage>Something went wrong. Please try again.</AlertMessage>}
          <Input
            label="Ingredient name"
            name="name"
            value={formFields.name.value}
            handleChange={handleChange}
            errorMsg={formFields.name.error}
            isRequired={formValidationSchema.name.required}
          />
          <Button
            handleClick={handleSubmit}
            isDisabled={!isFormValid}
          >
            { isEditingForm ? "Update shopping list" : "Add shopping list" }
          </Button>

          { isEditingForm && <>
            <Button
              handleClick={e => handleSubmit(e, 'add_as_new')}
              isDisabled={!isFormValid}
            >
              Add as new shopping list
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