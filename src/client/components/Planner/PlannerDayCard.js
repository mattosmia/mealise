import React from 'react';
import PropTypes from 'prop-types';
import PlannerMeal from './PlannerMeal';

export default function PlannerDayCard({ plannerData, date, hideEmptyMeals, hideMealNames, plannerModalSettings, setPlannerModalSettings  }) {

  return (
    <div className="planner__wrapper__card">
      <div className="planner__wrapper__card__heading">
        {date.toDateString()}
      </div>
      { plannerData.mealList.map(entry => 
        <PlannerMeal
          key={entry.name}
          plannedMeal={entry}
          date={date}
          hideEmptyMeals={hideEmptyMeals}
          hideMealNames={hideMealNames}
          setPlannerModalSettings={setPlannerModalSettings}
          plannerModalSettings={plannerModalSettings}
        />
      )}
     </div>
  )
}

PlannerDayCard.propTypes = {
  plannerData: PropTypes.object.isRequired,
  date: PropTypes.object.isRequired,
  hideEmptyMeals: PropTypes.bool,
  hideMealNames: PropTypes.bool,
  plannerModalSettings: PropTypes.object,
  setPlannerModalSettings: PropTypes.func
};