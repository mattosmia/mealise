import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import { endpointRoots } from '../../helpers/endpointRoots';
import { authHeaders } from '../../helpers/auth';

import Button from '../elements/Button';

import './ShoppingLists.scss';
import AlertMessage from '../elements/AlertMessage';

export default function ShoppingListModal({ shoppingListModalSettings, setShoppingListModalSettings }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isRequestError, setIsRequestError] = useState(false);
  const [isRequestSuccess, setIsRequestSuccess] = useState(false);

  const handleClose = () => setShoppingListModalSettings({
    ...shoppingListModalSettings,
    isOpen: false
  })

  const handleSaveList = () => {
    setIsSubmitted(true);
    setIsRequestError(false);
    setIsRequestSuccess(false);
    axios.post(`${endpointRoots.shoppinglist}add`,
    {
      name: shoppingListModalSettings.name,
      items: shoppingListModalSettings.shoppingList.map(item => `${item.qty}${item.unit} ${item.name}`)
    }, authHeaders())
    .then(res => {
      setIsRequestSuccess(true)
    }).catch(err => {
      setIsSubmitted(false);
      setIsRequestError(true);
    })
  }

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
          { ! isRequestSuccess && <Button
            classes="button--ghost"
            handleClick={handleSaveList}
            isDisabled={isSubmitted}
          >
            Save list
          </Button> }
        </div>
        { isRequestSuccess ?
          <AlertMessage type="success">
            Your shopping list has been successfully saved! Click <Link to={'/shopping-lists'}>here</Link> to view it now.
          </AlertMessage>
        :
        <>
          { isRequestError && <AlertMessage>Something went wrong. Please try again.</AlertMessage>}
          <p className="shopping-lists__modal__name">Period: {shoppingListModalSettings.name}</p>
          <ul>
          {shoppingListModalSettings.shoppingList.map(item => 
            <li key={item._id}>{item.qty}{item.unit} <strong>{item.name}</strong></li>
          )}
          </ul>
        </>}
      </div>
    </>
  )
}

ShoppingListModal.propTypes = {
  plannerModalSettings: PropTypes.object,
  setPlannerModalSettings: PropTypes.func,
}