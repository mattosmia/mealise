import React from 'react';
import PlannerMeal from './PlannerMeal';

const mealsObj = [
  {
    mealName: 'Breakfast',
    recipeName: 'Porridge',
    mealColour: '#3F51B5'
  },
  {
    mealName: 'Morning Snack',
    recipeName: null,
    mealColour: '#FFEB3B'
  },
  {
    mealName: 'Lunch',
    recipeName: 'Pasta bolognese',
    mealColour: '#673AB7'
  },
  {
    mealName: 'Afternoon Snack',
    recipeName: 'Tomato and feta cheese salad',
    mealColour: '#795548'
  },
  {
    mealName: 'Dinner',
    recipeName: 'Rotisserie chicken',
    mealColour: '#FF5722'
  }
]

export default function PlannerDayCard({ date }) {

  return (
    <div className="planner__wrapper__card">
      <div className="planner__wrapper__card__heading">
        {date.toDateString()}
      </div>
      {mealsObj.map(entry => <PlannerMeal key={entry.mealName} plannedMeal={entry} />)}
     </div>
  )
}