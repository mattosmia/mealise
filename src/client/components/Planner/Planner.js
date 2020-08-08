import React, { useState, useEffect, useReducer, useContext } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import { Link } from 'react-router-dom';

import plannerReducer from './Planner.reducer';
import PageContext from '../../helpers/pageContext';

import { endpointRoots } from '../../helpers/endpointRoots';
import { authHeaders } from '../../helpers/auth';
 
import './Planner.scss';

import PlannerDayCard from './PlannerDayCard';
import PlannerModal from './PlannerModal';
import AlertMessage from '../elements/AlertMessage';
import Button from '../elements/Button';
import Modal from '../elements/Modal';
import ShoppingListModal from '../ShoppingLists/ShoppingListModal';

import { plannerSettingsKeys } from '../../helpers/localStorage';

export default function Planner() {
  const page = useContext(PageContext);

  const [plannerState, dispatch] = useReducer(plannerReducer, { mealList: [], recipeList: [], plannerList: [] });

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const formatDate = date => `${daysOfWeek[date.getDay()]} ${(`0${date.getDate()}`).slice(-2)}/${(`0${(date.getMonth() + 1)}`).slice(-2)}/${date.getFullYear()}`

  const initialEndDate = new Date();
  initialEndDate.setDate(initialEndDate.getDate() + 6); // today + 6 days = 1 week :)

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(initialEndDate);
  const [plannerRange, setPlannerRange] = useState([]);

  const [isHideEmptyMeals, setIsHideEmptyMeals] = useState(localStorage.getItem(plannerSettingsKeys.hideEmptyMeals) === 'true');
  const [isHideMealNames, setIsHideMealNames] = useState(localStorage.getItem(plannerSettingsKeys.hideMealNames) === 'true');

  const [plannerModalSettings, setPlannerModalSettings] = useState({
    isOpen: false,
    date: new Date(),
    meal: {}
  });

  const [shoppingListModalSettings, setShoppingListModalSettings] = useState({
    isOpen: false,
    name: '',
    shoppingList: []
  });

  useEffect(() => {
    if (!page.isLoading) page.setIsLoading(true);
    axios.all([
      axios.get(endpointRoots.meal, authHeaders()),
      axios.get(endpointRoots.recipe, authHeaders())
    ])
    .then(axios.spread((mealRes, recipeRes) => {
      const mealList = mealRes.data.data || [];
      const recipeList = recipeRes.data.data || [];
      dispatch({
        type: 'GET_MEAL_RECIPE_LIST',
        payload: { mealList, recipeList }
      })
    })).catch(err => {
      // console.log('Error fetching recipes and meals', err)
    }).finally(() =>
      page.setIsLoading(false)
    )
  }, []);

  useEffect(() => {
    if (plannerRange.length === 0) return
    if (!page.isLoading) page.setIsLoading(true);
    axios.get(endpointRoots.planner, {
      ...authHeaders(),
      params: {
        plannerRange: plannerRange.join('|')
      }
    })
    .then(res => {
      const plannerList = res.data.data || [];
      dispatch({
        type: 'GET_PLANNER_LIST',
        payload: plannerList
      })
    }).catch(err => {
      // console.log('Error fetching planner', err)
    }).finally(() =>
      page.setIsLoading(false)
    )
  }, [plannerRange])

  useEffect(() => {
    const newDateRange = [];
    for (let date = new Date(new Date(startDate).setHours(0,0,0,0)); date <= endDate; date.setDate(date.getDate() + 1)) {
      newDateRange.push(new Date(date));
    }
    setPlannerRange(newDateRange);
  }, [startDate, endDate]);

  const handleGenerateShoppingList = () => {
    if (!page.isLoading) page.setIsLoading(true);
    const ingredients = {};
    Object.values(plannerState.plannerList).forEach(plannedMeals => {
      Object.values(plannedMeals).forEach(mealRecipes => {
        mealRecipes.forEach(recipe => {
          plannerState.recipeList.find(r => r._id === recipe._id).ingredients.forEach(recipeIngredient => {
            if (!ingredients[recipeIngredient._id]) ingredients[recipeIngredient._id] = 0;
            ingredients[recipeIngredient._id] += (recipeIngredient.qty * recipe.portion);
          })
        })
      })
    })
    if (Object.keys(ingredients).length) {
      axios.get(endpointRoots.ingredient, {
        ...authHeaders(),
        params: {
          ingredientList: Object.keys(ingredients).join('|')
        }
      })
      .then(res => {
        const ingredientData = res.data.data;
        const shoppingList = Object.keys(ingredients).map(ingredientId => {
          const ingredientDetails = ingredientData.find(i => i._id === ingredientId);
          return {
            _id: ingredientId,
            name: ingredientDetails['name'],
            qty: ingredients[ingredientId],
            unit: ingredientDetails['unit']
          }
        })
        setShoppingListModalSettings({
          ...shoppingListModalSettings,
          name: `${formatDate(startDate)} - ${formatDate(endDate)}`,
          shoppingList,
          isOpen: true
        })
      }).catch(err => {
        // console.log('Error generating shopping list', err)
      }).finally(() =>
        page.setIsLoading(false)
      );
    } else {
      alert('Couldn\'t generate shopping list as there are no ingredients available for this date range')
      page.setIsLoading(false)
    }  
  }

  const handleAddPlanner = (date, meal) => {
    date = new Date(date);
    setPlannerModalSettings({
      ...plannerModalSettings,
      meal,
      date,
      isOpen: true
    })
  }

  const handleDeletePlanner = (date, mealId, recipeId) => {
    if (confirm("Are you sure you want to delete this planned meal?\n\nATTENTION: This action CANNOT be undone!")) {
      if (!page.isLoading) page.setIsLoading(true);
      axios.post(`${endpointRoots.planner}delete`, { date, mealId, recipeId }, authHeaders())
        .then(res => {
          dispatch({
            type: 'DELETE_PLANNER',
            payload: {
              date,
              mealId,
              recipeId
            }
          })
        }).catch(err => {
          // console.log('Error deleting planner', err)
        }).finally(() =>
          page.setIsLoading(false)
        );
    }
  }

  return (
    <section className="planner">
      <h1>Planner</h1>
      {! page.isLoading && <>
      { plannerModalSettings.isOpen &&
        <Modal onModalClose={() => setPlannerModalSettings({
          ...plannerModalSettings,
          isOpen: false
        })}>
          <PlannerModal
            date={plannerModalSettings.date}
            meal={plannerModalSettings.meal}
            plannerState={plannerState}
            dispatch={dispatch}
            plannerModalSettings={plannerModalSettings}
            setPlannerModalSettings={setPlannerModalSettings}
          />
        </Modal>
      }
      { shoppingListModalSettings.isOpen &&
        <Modal onModalClose={() => setShoppingListModalSettings({
          ...shoppingListModalSettings,
          isOpen: false
        })}>
          <ShoppingListModal
            shoppingListModalSettings={shoppingListModalSettings}
            setShoppingListModalSettings={setShoppingListModalSettings}
          />
        </Modal>
      }
      {! plannerState.mealList.length ?
        <div className="planner--unavailable">Your planner will be available after you <Link to="/meals">add your first meal</Link>.</div>
        :
        <>
        <div className="planner__controls">
          <div className="planner__datepicker">
            <label onClick={e => e.preventDefault()}><span>From:</span>
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              maxDate={endDate}
              todayButton="Today"
              dateFormat="dd/MM/yyyy"
              closeOnScroll={true}
            /></label>
            <label onClick={e => e.preventDefault()}><span>To:</span>
            <DatePicker
              selected={endDate}
              onChange={date => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              todayButton="Today"
              dateFormat="dd/MM/yyyy"
              closeOnScroll={true}
            /></label>
          </div>
          <div className="planner__actions">
            <div>
              <Button
                handleClick={() => handleAddPlanner(Date.now(), {})}
                classes="button--ghost"
              >
                Plan meal
              </Button>
              <Button
                handleClick={handleGenerateShoppingList}
              >
                Generate shopping list
              </Button>
            </div>
            <div>
              <Button
                handleClick={() => {
                  localStorage.setItem(plannerSettingsKeys.hideEmptyMeals, !isHideEmptyMeals);
                  setIsHideEmptyMeals(!isHideEmptyMeals);
                }}
                classes="button--link"
              >
                {isHideEmptyMeals ?
                  'Show empty meals'
                :
                  'Hide empty meals'
                }
              </Button>
              <Button
                handleClick={() => {
                  localStorage.setItem(plannerSettingsKeys.hideMealNames, !isHideMealNames);
                  setIsHideMealNames(!isHideMealNames);
                }}
                classes="button--link"
              >
                {isHideMealNames ?
                  'Show meal names'
                :
                  'Hide meal names'
                }
              </Button>
            </div>
            </div>
          </div>
          <div className="planner__wrapper">
            { ! plannerRange.length ?
              <AlertMessage>Something went wrong. Please try again.</AlertMessage> :
              plannerRange.map(i =>
                <PlannerDayCard 
                  key={i.getTime()}
                  date={i}
                  formattedDate={formatDate(i)}
                  plannerData={plannerState}
                  hideEmptyMeals={isHideEmptyMeals}
                  hideMealNames={isHideMealNames}
                  plannerModalSettings={plannerModalSettings}
                  setPlannerModalSettings={setPlannerModalSettings}
                  handleDeletePlanner={handleDeletePlanner}
                  handleAddPlanner={handleAddPlanner}
                />
              )
            }
          </div>
        </>}
      </>}
    </section>
  )
}