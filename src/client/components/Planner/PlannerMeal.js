import React from 'react';
import Button from '../elements/Button';

export default function PlannerMeal({ plannedMeal }) {
  const handleAddMeal = () => {
    console.log('add meal')
  }

  return (
    <div className="planner__wrapper__card__meal" style={{backgroundColor: plannedMeal.colour}}>
      <div className="planner__wrapper__card__meal__name">{plannedMeal.name}</div> 
      {plannedMeal.recipeName?
        <div className="planner__wrapper__card__meal__details">
          {plannedMeal.recipeName}
        </div>
      :
        <Button handleClick={handleAddMeal} classes="planner__wrapper__card__meal__add-button">
          <span className="vh">Plan meal</span>
        </Button>
      }
    </div>
  )
}