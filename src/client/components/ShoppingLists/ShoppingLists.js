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
  const [isEmailRequestSuccess, setIsEmailRequestSuccess] = useState(false);
  const [isSidebarRequestError, setIsSidebarRequestError] = useState(false);
  const [isEditingForm, setIsEditingForm] = useState(false);
  const [shoppingListFormItemFields, setShoppingListFormItemFields] = useState({
    current: {
      _id: '',
      name: '',
    },
    isAdded: []
  });
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

  const handleEditShoppingList = shoppingList => {
    setIsRequestError(false);
    setIsRequestSuccess(false);
    setIsEmailRequestSuccess(false);
    setIsSidebarRequestError(false);
    setIsEditingForm(true);
    const shoppingListItems = [];
    shoppingList.items.map((item, idx) => shoppingListItems.push({
        _id: idx,
        name: item,
    }))
    setShoppingListFormItemFields({
      current: {
        _id: '',
        name: ''
      },
      isAdded: shoppingListItems
    })
    setFormFields({
      _id: { value: shoppingList._id, error: '', isValid: true },
      name: { value: shoppingList.name, error: '', isValid: true },
    });
  }

  const handleDeleteShoppingList = shoppingList => {
    if (confirm("Are you sure you want to delete this shopping list?\n\nATTENTION: This action cannot be undone!")) {
      if (!page.isLoading) page.setIsLoading(true);
      setIsRequestSuccess(false);
      setIsEmailRequestSuccess(false);
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

  const handleCancelEdit = () => {
    setFormFields(formFieldsSchema);
    setIsEditingForm(false);
    setIsSidebarRequestError(false);
  }

  const handleEmailShoppingList = shoppingList => {
    if (!page.isLoading) page.setIsLoading(true);
      setIsRequestSuccess(false);
      setIsEmailRequestSuccess(false);
      setIsRequestError(false);
      axios.post(`${endpointRoots.shoppinglist}email`, { shoppingList }, authHeaders())
        .then(res => {
          setIsEmailRequestSuccess(true);
        }).catch(err => 
          setIsRequestError(true)
        ).finally(() =>
          page.setIsLoading(false)
        );
  }

  const handleSaveTxtShoppingList = shoppingList => {
    const element = document.createElement("a");
    const file = new Blob([shoppingList.items.join('\n')], {type: 'text/plain'}); 
    element.href = URL.createObjectURL(file);
    element.download = `${shoppingList.name.replace(/\W/g,'')||'shopping_list'}.txt`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element)
  }

  return (
    <section className="shopping-lists">
      <h1>Shopping Lists</h1>
      <div className="shopping-lists__wrapper main-wrapper">
        <div className="shopping-lists__main main-content">
        {! page.isLoading && <>
          { isRequestError && <AlertMessage>Something went wrong. Please try again.</AlertMessage>}
          { isRequestSuccess && <AlertMessage type="success">Your shopping lists have been successfully updated!</AlertMessage>}
          { isEmailRequestSuccess && <AlertMessage type="success">Your shopping list has been successfully emailed to you!</AlertMessage>}
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
                          classes="button--icon icon--email"
                          handleClick={() => handleEmailShoppingList(shoppingList)}
                        >
                          <span className="vh">Email list</span>
                        </Button>
                        <Button
                          classes="button--icon icon--txt"
                          handleClick={() => handleSaveTxtShoppingList(shoppingList)}

                        >
                          <span className="vh">Download as text file</span>
                        </Button>
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
          <h2>Edit shopping list</h2>
          { isSidebarRequestError && <AlertMessage>Something went wrong. Please try again.</AlertMessage>}
          { isEditingForm ? 
          <>
            <Input
              label="Shopping list name"
              name="name"
              value={formFields.name.value}
              handleChange={handleChange}
              errorMsg={formFields.name.error}
              isRequired={formValidationSchema.name.required}
            />

            { shoppingListFormItemFields.isAdded.length > 0 &&
              <ul className="shopping-lists__item-form__list">
                {shoppingListFormItemFields.isAdded.map(item =>
                  <li
                    key={item._id}
                  >
                    {item.name} 
                    <Button
                      classes="button--icon icon--edit"
                      handleClick={() => handleEditShoppingListItem(shoppingList)}
                    >
                      <span className="vh">Edit</span>
                    </Button>
                    <Button
                      classes="button--icon icon--delete"
                      handleClick={() => handleDeleteShoppingListItem(item)}
                    >
                      <span className="vh">Delete</span>
                    </Button>
                  </li>
                )}
              </ul>
            }
            <Button
              handleClick={handleSubmit}
              isDisabled={!isFormValid}
            >
              Update shopping list
            </Button>

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
          </>
          :
            <p>Select a shopping list to edit it</p>
          }
          </>
        </SidebarForm>
      </div>
    </section>
  )
}