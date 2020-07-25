import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import PageContext from '../../helpers/pageContext';
import { endpointRoots } from '../../helpers/endpointRoots';

import Button from '../elements/Button';
import Select from '../elements/Select';

// import formValidation from '../../helpers/formValidation';
// import { formFieldsSchema, formValidationSchema } from './Planner.validation';
// import { authHeaders } from '../../helpers/auth';

import './ShoppingLists.scss';

export default function ShoppingListModal({ shoppingListModalSettings, setShoppingListModalSettings }) {
  const page = useContext(PageContext);
  
  const handleClose = () => setShoppingListModalSettings({
    ...shoppingListModalSettings,
    isOpen: false
  })

  const handleSaveList = () => {
    console.log('save list!')
  }

  const submitCallback = formData => {
    // if (!page.isLoading) page.setIsLoading(true);
    // formData.date = new Date(new Date(formData.date).setHours(0,0,0,0));
    // axios.post(`${endpointRoots.planner}add`, formData, authHeaders())
    //   .then(res => {
    //     dispatch({
    //       type: 'ADD_SHOPPING_LIST',
    //       payload: res.data.data.result
    //     })
    //     setFormFields(formFieldsSchema)
    //   }).catch(err => 
    //     console.log('Error adding planner', err)
    //   ).finally(() =>
    //     handleClose(),page.setIsLoading(false)
    //   );
  }

  // const { formFields, setFormFields, isFormValid, handleChange, handleSubmit } = formValidation(formFieldsSchema, formValidationSchema, submitCallback);

  return (
    <>
      <Button
        classes="modal__close button--icon icon--close"
        handleClick={handleClose}
      >
        <span className="vh">Close</span>
      </Button>
      <div className="modal__content shopping-lists__modal">
        <div className="shopping-lists__modal__heading">
          <h2>Shopping list</h2>
          <Button
            classes="button--ghost"
            handleClick={handleSaveList}
          >
            Save list
          </Button>
        </div>
        <p className="shopping-lists__modal__name">Period: {shoppingListModalSettings.name}</p>
        <ul>
        {shoppingListModalSettings.shoppingList.map(item => 
          <li key={item._id}>{item.qty}{item.unit} <strong>{item.name}</strong></li>
        )}
        </ul>
      </div>
    </>
  )
}

ShoppingListModal.propTypes = {
  plannerModalSettings: PropTypes.object,
  setPlannerModalSettings: PropTypes.func,
}