import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../elements/Button';
import planner from '../../../server/models/planner';

export default function PlannerMeal({ meal, date, plannerData, hideEmptyMeals, hideMealNames, plannerModalSettings, setPlannerModalSettings, handleDeletePlanner }) {
  const handleAddMeal = () => {
    setPlannerModalSettings({
      ...plannerModalSettings,
      meal,
      date,
      isOpen: true
    })
  }
  const dateKey = `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}`;
  const hasPlannedMeal = plannerData.plannerList && plannerData.plannerList[dateKey] && plannerData.plannerList[dateKey][meal._id];
  return (<>
    { (hasPlannedMeal || (! hasPlannedMeal && ! hideEmptyMeals)) &&
    <div className="planner__wrapper__card__meal" style={{backgroundColor: meal.colour}}>
      { !hideMealNames && <div className="planner__wrapper__card__meal__name">{meal.name}</div> }
      { hasPlannedMeal ?
        <div className="planner__wrapper__card__meal__details">
          <ul>
            { plannerData.plannerList[dateKey][meal._id].map(recipeId => 
              <li key={recipeId}>{plannerData.recipeList.find(r => r._id === recipeId).name}
              <Button
                classes="button--icon icon--delete"
                handleClick={() => handleDeletePlanner(dateKey,meal._id,recipeId)}
              >
                <span className="vh">Delete</span>
              </Button></li>
            )}
          </ul>
        </div>
      :
        <Button
          handleClick={handleAddMeal}
          classes="planner__wrapper__card__meal__add-button icon--add"
        >
          <span className="vh">Plan meal</span>
        </Button>
      }
    </div>
  }
  </>)
}


PlannerMeal.propTypes = {
  meal: PropTypes.object,
  date: PropTypes.object,
  plannerData: PropTypes.object,
  hideEmptyMeals: PropTypes.bool,
  hideMealNames: PropTypes.bool,
  plannerModalSettings: PropTypes.object,
  setPlannerModalSettings: PropTypes.func,
  handleDeletePlanner: PropTypes.func
};