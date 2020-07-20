import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../elements/Button';

export default function PlannerMeal({ plannedMeal, date, hideEmptyMeals, hideMealNames, plannerModalSettings, setPlannerModalSettings }) {
  const handleAddMeal = () => {
    setPlannerModalSettings({
      ...plannerModalSettings,
      plannedMeal,
      date,
      isOpen: true
    })
  }

  return (<>
    {( plannedMeal.recipeName || (!plannedMeal.recipeName && !hideEmptyMeals)) &&
    <div className="planner__wrapper__card__meal" style={{backgroundColor: plannedMeal.colour}}>
      { !hideMealNames && <div className="planner__wrapper__card__meal__name">{plannedMeal.name}</div> }
      {plannedMeal.recipeName?
        <div className="planner__wrapper__card__meal__details">
          {plannedMeal.recipeName}
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
  plannedMeal: PropTypes.object,
  date: PropTypes.object,
  hideEmptyMeals: PropTypes.bool,
  hideMealNames: PropTypes.bool,
  plannerModalSettings: PropTypes.object,
  setPlannerModalSettings: PropTypes.func
};