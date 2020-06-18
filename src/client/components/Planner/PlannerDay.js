import React from 'react';

export default function PlannerDay({ date }) {
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
      {/* </div> */}
    </div>
  )
}