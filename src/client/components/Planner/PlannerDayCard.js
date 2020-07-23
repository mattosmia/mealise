import React from 'react';
import PropTypes from 'prop-types';
import PlannerMeal from './PlannerMeal';
import Button from '../elements/Button';

export default function PlannerDayCard({ plannerData, date, hideEmptyMeals, hideMealNames, handleAddPlanner, handleDeletePlanner }) {
  return (
    <div className="planner__wrapper__card">
      <div className="planner__wrapper__card__heading">
        {date.toDateString()}
        <Button
          classes="button--icon icon--add"
          handleClick={() => handleAddPlanner(date,{})}
        >
          <span className="vh">Add</span>
        </Button>
      </div>
      { plannerData.mealList.map(meal => 
        <PlannerMeal
          key={meal._id}
          meal={meal}
          date={date}
          plannerData={plannerData}
          hideEmptyMeals={hideEmptyMeals}
          hideMealNames={hideMealNames}
          handleAddPlanner={handleAddPlanner}
          handleDeletePlanner={handleDeletePlanner}
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
  handleAddPlanner: PropTypes.func,
  handleDeletePlanner: PropTypes.func
};