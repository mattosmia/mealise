import React from 'react';

export default function PlannerDay({ date }) {
  const handleAddMeal = () => {
    console.log('add meal')
  }

  return (
    <div className="planner__wrapper__card">
      <div className="planner__wrapper__card__heading">
        {date.toDateString()}
      </div>
      {/* <div className="planner__wrapper__card__content"> */}
        <div className="planner__wrapper__card__meal" style={{backgroundColor: 'deeppink'}}>
          Porridge
        </div>
        <div className="planner__wrapper__card__meal" style={{backgroundColor: 'aquamarine'}}>
          Pasta Bolognese
        </div>
        <div className="planner__wrapper__card__meal" style={{backgroundColor: 'orange'}}>
          Ham & cheese sandwich
        </div>
        <div className="planner__wrapper__card__meal planner__wrapper__card__meal--add" style={{backgroundColor: 'skyblue'}}>
          <button onClick={handleAddMeal}><span className="vh">Plan meal</span></button>
        </div>
      {/* </div> */}
    </div>
  )
}