import React, { useState, useEffect, useReducer, useContext } from 'react';
import axios from 'axios';
import { CirclePicker } from 'react-color';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { formFieldsSchema, formValidationSchema } from './Meals.validation';
import formValidation from '../../helpers/formValidation';
import { authHeaders } from '../../helpers/auth';

import './Meals.scss';
import Button from '../elements/Button';

import mealsReducer from './Meals.reducer';
import SidebarForm from '../elements/SidebarForm';
import PageContext from '../../helpers/pageContext';
import Input from '../elements/Input';

const initialColour = { hex: '#f44336' };

export default function Meals() {
  const page = useContext(PageContext);
  const [isRequestError, setIsRequestError] = useState(false);
  const [editState, setEditState] = useState(false);
  const [showReorder, setShowReorder] = useState(false);

  const [colour, setColour] = useState(initialColour);
  const handleColourChange = colour => setColour(colour);

  const [mealsState, dispatch] = useReducer(mealsReducer, []);

  useEffect(() => {
    axios.get('/api/meal/', authHeaders())
    .then(res => {
      const orderedMealList = res.data.data.length > 0 ?
        res.data.data.sort(function(a, b){
          return a.order - b.order
        }) : [];
      dispatch({
        type: 'GET_MEAL_LIST',
        payload: orderedMealList
      })
    }).catch(err => 
      console.log('Error fetching meals', err)
    ).finally(() =>
      page.setIsLoading(false)
    )
  }, []);

  useEffect(() => {
    setFormFields(prevState => ({
      ...prevState,
      colour: {
        value: colour.hex,
        error: '',
        isValid: true
      },
    }))
  }, [colour]);

  const submitCallback = (formData, isAddAsNew) => {
    const requestType = formData._id && ! isAddAsNew? 'edit': 'add';
    page.setIsLoading(true);
    setIsRequestError(false);
    axios.post(`/api/meal/${requestType}`, formData, authHeaders())
      .then(res => {
        if (requestType === 'edit') {
          dispatch({
            type: 'EDIT_MEAL',
            payload: formData
          })
        }
        else {
          dispatch({
            type: 'ADD_MEAL',
            payload: res.data.data.result
          })
        }
        setFormFields(formFieldsSchema)
        setEditState(false)
      }).catch(err => 
        setIsRequestError(true)
      ).finally(() =>
        page.setIsLoading(false)
      );
  }

  const { formFields, setFormFields, isFormValid, handleChange, handleSubmit } = formValidation(formFieldsSchema, formValidationSchema, submitCallback);

  const handleDragEnd = result => {
    if (!result.destination) {
      return // if dropped outside the list
    }

    const reorderedMealsList = Array.from(mealsState);
    const [removed] = reorderedMealsList.splice(result.source.index, 1);
    reorderedMealsList.splice(result.destination.index, 0, removed);

    dispatch({
      type: 'REORDER_MEAL_LIST',
      payload: reorderedMealsList
    })

    if (!showReorder) setShowReorder(true)
  };

  const handleEditMeal = meal => {
    setEditState(true);
    setFormFields({
      _id: { value: meal._id, error: '', isValid: true },
      name: { value: meal.name, error: '', isValid: true },
      colour: { value: meal.colour, error: '', isValid: true },
      order: { value: meal.order, error: '', isValid: true },
    });
    setColour({ hex: meal.colour });
  }

  const handleDeleteMeal = meal => {
    console.log('delete meal', meal)

    dispatch({
      type: 'DELETE_MEAL',
      payload: meal
    })
  }

  const handleCancelEdit = () => {
    setFormFields(formFieldsSchema);
    setColour(initialColour);
    setEditState(false);
    setIsRequestError(false);
  }

  const handleReorderMeals = () => {
    console.log('reorder meals')
  }

  return (
    <section className="meals">
      <h1>Meals</h1>
      {! page.isLoading && 
      <div className="meals__wrapper">
        <div className="meals__main main-content">
          { mealsState.length > 0 ? <>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="meals__list"
                >
                  {mealsState.map((meal, index) => (
                    <Draggable key={meal._id} draggableId={meal._id} index={index}>
                      {(provided, snapshot) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="meals__list__item"
                          style={{
                            ...provided.draggableProps.style,
                            backgroundColor: meal.colour
                          }}
                        >
                          <div className="meals__list__item__inner">
                            {meal.name}
                            <span className="meals__list__item__buttons">
                              <Button classes="button--icon icon--edit"
                                handleClick={() => handleEditMeal(meal)}
                              >
                                <span className="vh">Edit</span>
                              </Button>
                              <Button
                                classes="button--icon icon--delete"
                                handleClick={() => handleDeleteMeal(meal)}
                              >
                                <span className="vh">Delete</span>
                              </Button>
                            </span>
                          </div>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
          { showReorder && <Button handleClick={handleReorderMeals}>Save meal order</Button> }
          </>
          :
          <p>You haven't added any meals yet.</p>
          }
        </div>
        <SidebarForm classes={['meals__side']}>
          <>
          <h2>{ editState? "Edit" : "Add" } meal</h2>
          <div className="form--error" aria-live="assertive">
            { isRequestError && <p className="p--error">Something went wrong. Please try again.</p>}
          </div>
          <Input label="Meal name" name="name" value={formFields.name.value} handleChange={handleChange} errorMsg={formFields.name.error} />
          <p className="label">
            <span>Colour label</span>
          </p>
          <CirclePicker color={colour} onChangeComplete={handleColourChange} />

          <input type="hidden" name="colour" value={formFields.colour.value} />
          <input type="hidden" name="order" value={formFields.order.value || '0'} />

          <Button handleClick={handleSubmit} isDisabled={!isFormValid}><>{ editState? "Edit" : "Add" } meal</></Button>
          { editState && <>
            <Button handleClick={e => handleSubmit(e, 'add_as_new')} isDisabled={!isFormValid}>Add as new meal</Button>
            <Button handleClick={handleCancelEdit}>Cancel</Button>
          </>}
          </>
        </SidebarForm>
      </div>}
    </section>
  )
}