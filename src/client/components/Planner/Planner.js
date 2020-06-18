import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
 
import './Planner.scss';
import PlannerDay from './PlannerDay';
import Spinner from '../Spinner/Spinner';

export default function Planner() {
  const initialEndDate = new Date();
  initialEndDate.setDate(initialEndDate.getDate() + 6); // today + 6 days = 1 week :)

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(initialEndDate);
  const [plannerRange, setPlannerRange] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const newDateRange = [];
    for (let date = new Date(new Date(startDate).setHours(0,0,0,0)); date <= endDate; date.setDate(date.getDate() + 1)) {
      newDateRange.push(new Date(date));
    }
    setPlannerRange(newDateRange);
  }, [startDate,endDate]);

  return (
    <section className="planner">
      { isLoading && <Spinner /> }
      <h1>Planner</h1>
      <div className="planner__datepicker">
        <label><span>From:</span>
        <DatePicker
          selected={startDate}
          onChange={date => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          maxDate={endDate}
          todayButton="Today"
          dateFormat="dd/MM/yyyy"
        /></label>
        <label><span>To:</span>
        <DatePicker
          selected={endDate}
          onChange={date => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          todayButton="Today"
          dateFormat="dd/MM/yyyy"
        /></label>
      </div>
      <div className="planner__wrapper">
        { !plannerRange.length?
          <>Nothing to see here!</> :
          plannerRange.map(i => <PlannerDay key={i} date={i} />)
        }
      </div>
    </section>
  )
}