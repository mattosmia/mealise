import React from 'react';
import PlannerMeal from './PlannerMeal';

export default function PlannerDayCard({ plannerData, date }) {

  return (
    <div className="planner__wrapper__card">
      <div className="planner__wrapper__card__heading">
        {date.toDateString()}
      </div>
      {plannerData.meals.map(entry => <PlannerMeal key={entry.name} plannedMeal={entry} />)}
     </div>
  )
}