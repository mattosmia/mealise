import React from 'react';

export default function PlannerMeal({ plannedMeal }) {
  const handleAddMeal = () => {
    console.log('add meal')
  }

  return (
    <div className="planner__wrapper__card__meal" style={{backgroundColor: plannedMeal.mealColour}}>
      {plannedMeal.recipeName?
        <div className="planner__wrapper__card__meal__details">
          {plannedMeal.recipeName}
        </div>
      :
        <button onClick={handleAddMeal} className="planner__wrapper__card__meal__add-button">
          <span className="vh">Plan meal</span>
        </button>
      }
    </div>
  )
}