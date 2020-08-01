import React from 'react';
import PropTypes from 'prop-types';
import Button from '../elements/Button';

export default function PlannerMeal({ meal, date, plannerData, hideEmptyMeals, hideMealNames, handleAddPlanner, handleDeletePlanner }) {
  const dateKey = `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}`;
  const hasPlannedMeal = plannerData.plannerList && plannerData.plannerList[dateKey] && plannerData.plannerList[dateKey][meal._id];
  return (<>
    { (hasPlannedMeal || (! hasPlannedMeal && ! hideEmptyMeals)) &&
    <div className="planner__wrapper__card__meal" style={{backgroundColor: meal.colour}}>
      { !hideMealNames && <div className="planner__wrapper__card__meal__name">{meal.name}</div> }
      { hasPlannedMeal ?
        <div className="planner__wrapper__card__meal__details">
          <ul>
            { plannerData.plannerList[dateKey][meal._id].map(recipe => 
              <li key={recipe._id}>
                {plannerData.recipeList.find(r => r._id === recipe._id).name} {recipe.portion !== 1 && <em title={`The original recipe has been multiplied by ${recipe.portion}`}>x{recipe.portion}</em>}
                <Button
                  classes="button--icon icon--delete"
                  handleClick={() => handleDeletePlanner(dateKey,meal._id,recipe._id)}
                >
                  <span className="vh">Delete</span>
                </Button>
              </li>
            )}
          </ul>
        </div>
      :
        <Button
          handleClick={() => handleAddPlanner(dateKey,meal)}
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
  handleAddPlanner: PropTypes.func,
  handleDeletePlanner: PropTypes.func
};